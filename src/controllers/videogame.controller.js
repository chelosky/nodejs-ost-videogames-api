import Videogame from '../models/Videogame';

export const findAllVideogames = async (req, res) => {
    try {
        const videogames = await Videogame.find();
        res.json(videogames);
    } catch (error) {
        res.status(500).json(
            {
                message: error.message || 'Algo salio mal al listar videogames'
            }
        );
    }
};

export const createVideogame = async (req, res) => {

    if(!req.body.title){
        return res.status(400).send({
            message: 'El contenido no puede ser vacio'
        })
    }

    try {
        // creamos el objetvo
        const newVG = new Videogame(
            {
                title: req.body.title,
                saga: req.body.saga ? req.body.saga : '',
                description: req.body.description,
                image: req.body.image
            }
        );
        // guardamos el objeto
        const vgSaved = await newVG.save();
        res.json(vgSaved);
    } catch (error) {
        res.status(500).json(
            {
                message: error.message || 'Algo salio mal al crear videogame'
            }
        );
    }
    
};

export const findOneVideogame = async (req, res) => {
    try {
        // SI NO EXISTE EL ID SE MUERE XD
        const videogame = await Videogame.findById(req.params.id);
        if(!videogame){
            return res.status(400).json({
                message: `Videogame con el id ${req.params.id} no existe`
            })
        }
        res.json(videogame);
    } catch (error) {
        res.status(500).json(
            {
                message: error.message || 'Algo salio mal al buscar un videogame por id'
            }
        );
    }
}

export const deleteVideogame = async (req, res) => {
    try {
        const data = await Videogame.findByIdAndDelete(req.params.id);
        res.json({
            message: `${data._id} fue eliminado`
        });
    } catch (error) {
        res.status(500).json(
            {
                message: error.message || 'Algo salio mal al eliminar un videogame'
            }
        );
    }
}

export const findAllSagaVideogames = async (req, res) => {
    try {
        const videogames = await Videogame.find(
            {
                saga: req.params.saga
            }
        );
        res.json(videogames);
    } catch (error) {
        res.status(500).json(
            {
                message: error.message || 'Algo salio mal al listar los videogames de una saga'
            }
        );
    }
};

export const updateVideogame = async (req, res) => {
    try {
        const updateVG = await Videogame.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Videogame fue actualizado' });
    } catch (error) {
        res.status(500).json(
            {
                message: error.message || 'Algo salio mal al actualizar un videogame'
            }
        );
    }
}