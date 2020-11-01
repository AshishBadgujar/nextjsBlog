import initDB from '../../../helpers/db'
import Review from '../../../models/Review'

initDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getComments(req, res)
            break;
        case "PUT":
            await addCommet(req, res)
            break;
        case "DELETE":
            await deleteComment(req, res)
            break;
        default:
            break;
    }
}

const getComments = async (req, res) => {
    const { cid } = req.query
    try {
        var thisComment = await Review.findOne({ thisBlog: cid })
            .populate("comments.commentedBy")
        if (!thisComment) {
            return res.json(null)
        } else {
            res.json(thisComment.comments)
        }
    } catch (error) {
        console.log(error)
        return res.json({ err: 'error !' })
    }
}

const addCommet = async (req, res) => {
    const { cid } = req.query
    const { userId, comment } = req.body
    if (!userId || !comment) {
        return res.json({ err: "Please enter Comment !" })
    }
    try {
        var thisComment = await Review.findOne({ thisBlog: cid })
        const newComment = {
            commentedBy: userId,
            text: comment,
        }
        if (!thisComment) {
            await new Review({
                thisBlog: cid,
                comments: newComment
            }).save()
            return res.json({ message: "your first comment posted !" })
        }
        else {
            await Review.findOneAndUpdate(
                { _id: thisComment._id },
                { $push: { comments: newComment } }
            )
            res.json({ message: 'your comment posted !' })
        }
    } catch (error) {
        console.log(error)
        res.json({ err: 'comment is not posted,try again !' })
    }
}

const deleteComment = async (req, res) => {
    const { cid } = req.query
    const { commentId } = req.body
    try {
        const thisComment = await Review.findOneAndUpdate(
            { thisBlog: cid },
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        ).populate('comments.commentedBy')
        res.json(thisComment.comments)
    } catch (error) {
        console.log(error)
        return res.json({ err: 'error in deleting comment !' })
    }
}
