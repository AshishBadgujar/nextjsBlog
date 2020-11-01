import initDB from '../../helpers/db'
import User from '../../models/User'

initDB()

export default async (req, res) => {
    User.find().sort({ createdAt: -1 }).then(users => {
        res.json(users)
    })
}