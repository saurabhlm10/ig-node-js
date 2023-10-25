import { AxiosError } from "axios";
import Post from "../../model/Post";
import { Request, Response } from "express";

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { source_reel_url } = req.body;
        await Post.deleteOne({ source_reel_url });

        res.status(200).json({
            message: "Post Deleted"
        });
    } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
            return res.status(400).json(error.response?.data.message);
        }
        if (error instanceof Error) {
            return res.status(400).json(error.message);
        }
    }
};
