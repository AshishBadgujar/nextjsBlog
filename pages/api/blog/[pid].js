import Blog from '../../../models/Blog'
import initDB from '../../../helpers/db'

initDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getBlog(req, res)
            break;
        case "DELETE":
            await deleteBlog(req, res)
            break;
        case "POST":
            await updateBlog(req, res)
            break;
        default:
            break;
    }
}

const getBlog = async (req, res) => {
    const { pid } = req.query
    const blog = await Blog.findOne({ _id: pid }).populate('author')
    res.json(blog)
}
const deleteBlog = async (req, res) => {
    const { pid } = req.query
    await Blog.findOneAndDelete({ _id: pid })
    res.json({ message: 'Blog deleted successfully!' })
}

const updateBlog = async (req, res) => {
    const { id, title, content } = req.body
    const blog = await Blog.findOneAndUpdate({ _id: id }, {
        $set: {
            title,
            content
        }
    })
    res.json(blog)
}

