import config from '../config';

const verifyAdminToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        if(bearerToken == config.adminTOKEN){
            next();
        }else{
            return res.status(403).json({
                ok: false,
                message: `Token de administración no valido`
            });
        }
    }else{
        return res.status(403).json({
            ok: false,
            message: `Token de administración no encontrado`
        });
    }
}

module.exports = {
    verifyAdminToken
}