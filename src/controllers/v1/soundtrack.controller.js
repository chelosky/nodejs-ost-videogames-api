import Soundtrack from '../../models/Soundtrack';
import Videogame from '../../models/Videogame';
import _ from 'underscore';

export const findAllSoundtracks = (req, res) => {
    Soundtrack.find({...req.query})
        .sort({name: 1})
        .exec((err, soundtrack) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Algo salio mal al listar los soundtracks',
                    err
                });
            }

            res.json({
                ok: true,
                message: 'Soundtracks encontrados',
                count: soundtrack.length,
                soundtrack
            });
        });
};

export const findOneSoundtrack = (req, res) => {

    // THIS FORMAT 1,2,3,4,5 to [1,2,3,4,5,6]
    let ids = req.params.id.split(',');
    // IF IS JUST ONE ID
    if(ids.length == 1){
        findSoundtrackById(req,res);
    }else{
        // MORE THAN 1 or just 0
        findSoundtracksByIds(ids,res);
    }
}

const findSoundtracksByIds = (ids, res) => {
    Soundtrack.find({ '_id': { $in: ids } })
        .populate('videogame')
        .exec((err, soundtracks) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Algo salio mal al buscar esos Soundtracks por esos ids',
                    err
                });
            }

            if (!soundtracks) {
                return res.status(400).json({
                    ok: false,
                    message: 'Soundtracks no encontrados'
                });
            }

            res.json({
                ok: true,
                message: 'Soundtracks encontrados',
                count: soundtracks.length,
                soundtracks
            });
        });
}

const findSoundtrackById = (req, res) => {
    Soundtrack.findById(req.params.id)
        .populate('videogame')
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