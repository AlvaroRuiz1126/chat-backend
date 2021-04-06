const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    try {
        const token = req.header('x-token');

        if(!token){
            return res.status(401).json({
                ok: false,
                msg: "no hay token en la peticion"
            });
        }

        //para verificar que el token es valido
        const payload = jwt.verify(token, process.env.JWT_KEY);
        //para usar el uid que viene del token en las demas pantallas cuando se necesario
        req.uid = payload.uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
};

module.exports = {
    validateJWT
}