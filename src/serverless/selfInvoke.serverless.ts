import dotenv from "dotenv";
dotenv.config();
import { Lambda } from "@aws-sdk/client-lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { fetchRedis } from "../helpers/fetchRedis";

// Initialize the Lambda client
const lambda = new Lambda({ region: "ap-south-1" });

// Interface for the event payload to strongly type the input
interface SelfInvokeEvent {
  index: number;
  maxSteps: number;
}

export const handler = async (
  event: SelfInvokeEvent
): Promise<APIGatewayProxyResult> => {
  const redisKey = "Testing-Lambda";

  console.log("Received event:", event);

  // Simulate task step completion by incrementing index
  let currentIndex = (await fetchRedis("get", redisKey)) as number;
  //   let currentIndex = 0;
  const maxSteps = event.maxSteps || 5; // Default max steps if not specified

  // Check if task is done
  if (currentIndex >= maxSteps) {
    // Task is complete
    console.log("Task completed.");
    return { statusCode: 200, body: "Task completed successfully." };
  }

  // Prepare to self-invoke for the next step
  const nextIndex = currentIndex + 1;

  await fetchRedis("set", redisKey, String(nextIndex));
  const payload: SelfInvokeEvent = {
    index: nextIndex,
    maxSteps: maxSteps,
  };

  try {
    // Self-invoke asynchronously
    await lambda.invoke({
      FunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME!, // Ensure AWS_LAMBDA_FUNCTION_NAME is defined in the environment variables
      InvocationType: "Event", // Asynchronous invocation
      Payload: JSON.stringify(payload),
    });

    console.log(`Successfully self-invoked for step ${nextIndex}`);
    return {
      statusCode: 200,
      body: `Step ${currentIndex} processed. Continuing to step ${nextIndex}.`,
    };
  } catch (error) {
    console.error("Error self-invoking Lambda", error);
    return { statusCode: 500, body: "Failed to self-invoke Lambda function." };
  }
};
