import initDB from '../../../helpers/db'
import User from '../../../models/User'

initDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getUser(req, res)
            break;
        case "DELETE":
            await deleteUser(req, res)
            break;
        case "POST":
            await updateUser(req, res)
        default:
            break;
    }
}

const getUser = async (req, res) => {
    const { pid } = req.query
    const user = await User.findOne({ _id: pid })
    res.json(user)
}
const deleteUser = async (req, res) => {
    const { pid } = req.query
    await User.findOneAndDelete({ _id: pid })
    res.json({ message: 'User deleted successfully!' })
}

const updateUser = async (req, res) => {
    const { id, name, bio, mediaUrl } = req.body
    try {
        const user = await User.findOneAndUpdate({ _id: id }, {
            $set: {
                name,
                bio,
                mediaUrl
            }
        })
        res.json(user)
    } catch (error) {
        console.log(error)
        return res.json({ err: 'Something went wrong ,Try again!' })
    }
}