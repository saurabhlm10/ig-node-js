const { AxiosError } = require("axios")
const Post = require("../../model/Post")

exports.createPost = async (req, res) => {
    try {

        const { post } = req.body

        console.log(req.body)

        if (!post) {
            return res.status(400).json({
                message: "Post Data is required",
            })
        }

        const createdPost = await Post.create(post)

        return res.status(200).json({
            message: "Post Created",
            post: createdPost
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