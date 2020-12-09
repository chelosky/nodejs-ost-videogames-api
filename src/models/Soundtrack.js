import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

let soundtrackSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Debe ingresar el nombre del soundtrack'],
        trim: true
    },
    information: {
        type: String,
        default: '(00:00)',
        trim: true
    },
    url: {
        type: String,
        required: [true, 'Debe ingresar un URL del soundtrack'],
        trim: true
    },
    videogame: {
        type: Schema.Types.ObjectId,
        ref: 'Videogame',
        required: [true, 'Necesita vincular un juego'],
        trim: true
    }
}, {
    versionKey: false,
    timestamps: true
});

soundtrackSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

export default model('Soundtrack', soundtrackSchema);