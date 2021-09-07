import { api } from './general.helpers';
import Videogame from '../../models/Videogame';

const initialVideogames = [
    {
        title: 'VG 1',
        saga: 'VGS',
        description: 'VGS VG 1',
        image: '',
        correlative: 1
    },
    {
        title: 'VG 2',
        saga: 'VGS',
        description: 'VGS VG 2',
        image: '',
        correlative: 2
    }
];

const populateInitialVideogames = async() => {
    await Videogame.deleteMany({});

    //parallel
    // const notesObjects = initialVideogames.map(vg => new Videogame(vg));
    // const promises = notesObjects.map(vg => vg.save());
    // await Promise.all(promises);

    // sequential
    for (const videogame of initialVideogames) {
        const vg = new Videogame(videogame);
        await vg.save();
    }
}

const getAllContentFromVideogames = async () => {
    const response = await api.get('/api/v1/videogame');
    const {data} = response.body;
    return {
        data:  data.map((vg) => vg.title),
        response
    };
}

module.exports = {
    initialVideogames,
    getAllContentFromVideogames,
    populateInitialVideogames
}