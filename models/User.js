import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    mediaUrl: {
        type: String,
        required: false,
        default: '/df.png'
    }
})

export default mongoose.models.user || mongoose.model('user', userSchema)