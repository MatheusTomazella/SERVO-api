import mongoose from "mongoose"

const UserSchema = new mongoose.Schema( {
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: 'users'
} )

export default mongoose.model( 'User', UserSchema )