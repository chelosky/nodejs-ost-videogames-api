import { Schema, model } from 'mongoose';

const videogameSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    saga: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('Videogame', videogameSchema);