import Soundtrack from '../models/Soundtrack';
import _ from 'underscore';
import Videogame from '../models/Videogame';

export const findAllSoundtracks = (req, res) => {
    Soundtrack.find({})
        .sort('name')
        .populate('videogame', 'title')
        .exec((err, soundtrack) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Algo salio mal al listar los soundtracks',
                    err
                });
            }

            Soundtrack.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    message: 'Soundtracks encontrados',
                    count: conteo,
                    soundtrack
                });
            });
        });
};

export const findOneSoundtrack = (req, res) => {
    Soundtrack.findById(req.params.id)
        .populate('videogame', 'title')
        .exec((err, soundtrack) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Algo salio mal al buscar un soundtrack por id',
                    err
                });
            }

            if (!soundtrack) {
                return res.status(400).json({
                    ok: false,
                    message: 'Soundtrack no encontrado'
                });
            }

            res.json({
                ok: true,
                message: 'Soundtrack encontrado',
                soundtrack
            });
        });
}

export const createSoundtrack = async(req, res) => {
    let videogame;
    try {
        videogame = await Videogame.findById( req.body.idVideogame ).exec();
    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: 'Algo salio mal buscar el videogame',
            error
        });
    }
    if ( req.body.idVideogame === null || videogame === null) {
        return res.status(500).json({
            ok: false,
            message: 'Algo salio mal buscar el videogame'
        });
    }

    // creamos el objetvo
    let newST = new Soundtrack({
        name: req.body.name,
        information: req.body.information,
        url: req.body.url,
        videogame: videogame
    });
    // guardamos el objeto
    newST.save((err, soundtrackDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Algo salio mal al crear soundtrack',
                err
            });
        }

        if (!soundtrackDB) {
            return res.status(400).json({
                ok: false,
                message: 'Soundtrack no se pudo crear'
            });
        }

        res.json({
            ok: true,
            message: 'Soundtrack fue creado',
            soundtrack: soundtrackDB
        });

    });

}

export const updateSoundtrack = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'information', 'url', 'videogame']);

    Soundtrack.findByIdAndUpdate(id, body, { new: true }, (err, soundtrackDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Algo salio mal al actualizar un videogame',
                err
            });
        }

        if (!soundtrackDB) {
            return res.status(400).json({
                ok: false,
                message: 'Soundtrack no encontrado'
            });
        }

        res.json({
            ok: true,
            message: 'Soundtrack fue actualizado',
            soundtrack: soundtrackDB
        });
    });
}

export const deleteSoundtrack = async(req, res) => {
    let id = req.params.id;

    Soundtrack.findByIdAndRemove(id, (err, soundtrackDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Algo salio mal al eliminar un soundtrack',
                err
            });
        }

        if (!soundtrackDeleted) {
            return res.status(400).json({
                ok: false,
                message: 'Soundtrack no encotrado'
            });
        }

        res.json({
            ok: true,
            message: 'Soundtrack eliminado',
            soundtrack: soundtrackDeleted
        });
    });
}

export const deleteAllSoundtrack = (req, res) => {
    Soundtrack.deleteMany().then(function() {
        res.json({
            ok: true,
            message: 'Información eliminada de Soundtracks'
        });
    }).catch(function(error) {
        res.json({
            ok: false,
            message: 'No se pudo eliminar la información de Soundtracks'
        });
        console.log(error);
    });
}

// FIND ALL SOUNDTRACKS BY VIDEOGAME ID
export const findAllSoundtracksOfAVideogame = async(req, res) => {
    let id = req.params.id;
    findOSTVideogameID(id, res);
}

// FIND ALL SOUNDTRACKS OF A VIDEOGAME BY NAME
export const findAllSoundtracksOfAVideogameName = async(req, res) => {
    let name = req.params.name;
    Videogame.find({
            title: name
        })
        .sort('title')
        .exec((err, videogame) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: `Algo salio mal al buscar el videojuego ${name}`,
                    err
                });
            }
            findOSTVideogameID(videogame[0].id, res);
        });
}


const findOSTVideogameID = (id, res) => {
    Soundtrack.find({
            videogame: id
        }).populate('videogame', 'title')
        .exec((err, soundtrack) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Algo salio mal al buscar un soundtrack por videogame id',
                    err
                });
            }

            if (!soundtrack) {
                return res.status(400).json({
                    ok: false,
                    message: 'Soundtrack de videojuego no encontrado'
                });
            }

            res.json({
                ok: true,
                count: soundtrack.length,
                message: 'Soundtrack de videojuego encontrado',
                soundtrack
            });
        });
}