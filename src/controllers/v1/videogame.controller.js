import Videogame from '../../models/Videogame';
import {validateObjectIdArray} from '../../utils/helpers';

export const findAllVideogames = async (req, res) => {

    const {limit, page, ...query} = req.query;

    const total = (await Videogame.find(query)).length;

    const currentPage = page - 1;

    const lastPage = Math.ceil(total/limit);

    Videogame.find(query)
        .sort({ correlative: 1 })
        .sort({title: 1})
        .limit(limit)
        .skip(limit * currentPage)
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
                current_page: page,
                previous_page: page > 1 ? page - 1 : null,
                next_page: page < lastPage ? page + 1 : null,
                last_page: lastPage,
                per_page: limit,
                total,
                data: videogames
            });
        });
};

export const findOneVideogame = async (req, res) => {
    
    // THIS FORMAT 1,2,3,4,5 to [1,2,3,4,5,6]
    let ids = req.params.id.split(',');
    ids = validateObjectIdArray(ids);
    // IF IS JUST ONE ID
    if(ids.length == 1){
        findVideogameById(req,res);
    }else{
        // MORE THAN 1 or just 0
        findVideogamesByIds(ids,res);
    }
}

const findVideogamesByIds = async (ids, res) => {
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

const findVideogameById = async (req, res) => {
    Videogame.findById(req.params.id)
        .exec(async (err, videogame) => {
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


export const createVideogame = async (req, res) => {

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

export const updateVideogame = async (req, res) => {
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
