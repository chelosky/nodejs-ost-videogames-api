import Videogame from '../../models/Videogame';

export const findAllVideogames = (req, res) => {

    Videogame.find({...req.query})
        .sort({ correlative: 1 })
        .sort({title: 1})
        .exec((err, videogames) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Algo salio mal al listar los videojuegos',
                    err
                });
            }

            res.json({
                ok: true,
                message: 'Videojuegos encontrados',
                count: videogames.length,
                videogames
            });
        });
};

export const findOneVideogame = (req, res) => {
    
    // THIS FORMAT 1,2,3,4,5 to [1,2,3,4,5,6]
    let ids = req.params.id.split(',');
    // IF IS JUST ONE ID
    if(ids.length == 1){
        findVideogameById(req,res);
    }else{
        // MORE THAN 1 or just 0
        findVideogamesByIds(ids,res);
    }
}

const findVideogamesByIds = (ids, res) => {
    Videogame.find({ '_id': { $in: ids } })
        .exec((err, videogames) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Algo salio mal al buscar esos Videojuegos por esos ids',
                    err
                });
            }

            if (!videogames) {
                return res.status(400).json({
                    ok: false,
                    message: 'Videojuegos no encontrados'
                });
            }

            res.json({
                ok: true,
                message: 'Videojuegos encontrados',
                count: videogames.length,
                videogames
            });
        });
}

const findVideogameById = (req, res) => {
    Videogame.findById(req.params.id)
        .exec((err, videogame) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Algo salio mal al buscar un Videojuego por id',
                    err
                });
            }

            if (!videogame) {
                return res.status(400).json({
                    ok: false,
                    message: 'Videojuego no encontrado'
                });
            }

            res.json({
                ok: true,
                message: 'Videojuego encontrado',
                videogame
            });
        });
}


export const createVideogame = (req, res) => {

    // creamos el objetvo
    const newVG = new Videogame({
        title: req.body.title,
        saga: req.body.saga ? req.body.saga : '',
        description: req.body.description,
        image: req.body.image,
        correlative: req.body.correlative ? req.body.correlative : 1
    });
    // guardamos el objeto
    newVG.save((err, videogame) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Algo salio mal al crear videojuego',
                err
            });
        }

        if (!videogame) {
            return res.status(400).json({
                ok: false,
                message: 'Videojuego no se pudo crear'
            });
        }

        res.json({
            ok: true,
            message: 'Videojuego fue creado',
            videogame: videogame
        });

    });

}

export const updateVideogame = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['title', 'saga', 'description', 'image','correlative']);
    Videogame.findByIdAndUpdate(id, body, { new: true }, (err, videogame) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Algo salio mal al actualizar un videojuego',
                err
            });
        }

        if (!videogame) {
            return res.status(400).json({
                ok: false,
                message: 'Videojuego no encontrado'
            });
        }

        res.json({
            ok: true,
            message: 'Videojuego fue actualizado',
            videogame: videogame
        });
    });
}

export const deleteVideogame = async(req, res) => {
    let id = req.params.id;
    Videogame.findByIdAndRemove(id, (err, videogame) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Algo salio mal al eliminar un videojuego',
                err
            });
        }

        if (!videogame) {
            return res.status(400).json({
                ok: false,
                message: 'Videojuego no encotrado'
            });
        }

        res.json({
            ok: true,
            message: 'Videojuego eliminado',
            soundtrack: videogame
        });
    });
}

export const deleteAllVideogame = async(req, res) => {
    Videogame.deleteMany().then(function() {
        res.json({
            ok: true,
            message: 'Información eliminada de Videogames'
        });
    }).catch(function(error) {
        res.json({
            ok: false,
            message: 'No se pudo eliminar la información de Videogames'
        });
        console.log(error);
    });
}
