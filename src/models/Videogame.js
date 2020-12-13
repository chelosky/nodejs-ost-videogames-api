import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const videogameSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
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

soundtrackSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

export default model('Videogame', videogameSchema);