import Blog from '../../models/Blog'
import initDB from '../../helpers/db'
import User from '../../models/User'

initDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getAllBlogs(req, res)
            break;
        case "POST":
            await saveBlog(req, res)
            break;
        default:
            break;
    }
}

const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find().populate('author').sort({ updatedAt: -1 })
    res.json(blogs)

}

const saveBlog = async (req, res) => {
    const { userId, title, content, mediaUrl, category } = req.body
    try {
        if (!title || !content || !category) {
            return res.json({ err: 'please Add all the fields!' })
        }
        const blog = await new Blog({
            title,
            content,
            author: userId,
            mediaUrl,
            category
        }).save()
        res.json(blog)
    } catch (error) {
        console.log(error)
        return res.json({ err: 'Something went wrong ,Try again!' })
    }

}