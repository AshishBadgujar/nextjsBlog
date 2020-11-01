import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const reviewSchema = new mongoose.Schema({
    thisBlog: {
        type: ObjectId,
        ref: 'blog'
    },
    comments: [
        {
            commentedBy: { type: ObjectId, ref: 'user' },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
})

export default mongoose.models.Review || mongoose.model('Review', reviewSchema)