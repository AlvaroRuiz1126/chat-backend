const { request, response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;
        const existEmail = await User.findOne({ email });

        if(existEmail){
            return res.status(400).json({
                ok: false,
                msg: "El correo ya existe",
            });
        }

        const user = new User( req.body );

        //encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        //se la pasa la contraseña y el salt
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //generate JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const login = async (req = request, res = response) => {
    //extraer datos de la request
    const {email, password} = req.body;

    try {
        const userDB = await User.findOne({email});

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: "Email no encontrado"
            });
        }

        //para validar la password. El 1 arguemtno es la constraseña sin hash, la segunda es la encriptada
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "Password Incorrecto"
            });
        }

        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }

};

const renewToken = async (req = request, res = response) => {
    const uid = req.uid;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
        ok: true,
        token,
        user
    });
};

module.exports = {
    createUser,
    login,
    renewToken
}