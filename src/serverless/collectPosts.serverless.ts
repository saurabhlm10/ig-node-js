import dotenv from "dotenv";
dotenv.config();
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { collectPosts } from "./handlers/collectPosts.handler";
import connectToDb from "../config/db";

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  await connectToDb();

  // Extract the path parameter
  const page = event.pathParameters?.page as string;

  // Pass the path parameter to your function
  const result = await collectPosts({ page, mediaType: "reels" });

  console.log("result in lambda", result);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
