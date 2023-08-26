const { AxiosError } = require("axios");
const Post = require("../../model/Post");

exports.deletePost = async (req, res) => {
    try {
        const { source_reel_url } = req.body;

        await Post.deleteOne({ source_reel_url });

        res.status(200).json({
            message: "Post Deleted"
        })

    } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
            return res.status(400).json(error.response?.data.message)
        }
        if (error instanceof Error) {
            return res.status(400).json(error.message)
        }
    }
}