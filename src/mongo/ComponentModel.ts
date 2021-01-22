import mongoose from "mongoose"

const ComponentSchema = new mongoose.Schema( {
    name: {
        type:String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',

    },
    password: {
        type: String,
        required: true
    }
} )

export default mongoose.model( 'Component', ComponentSchema )
