const express = require('express')

const app = express();

const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const bcrypt = require('bcrypt');





app.post('/login', ( req, res)=>{

    let body = req.body;
    console.log(body)

    Usuario.findOne( {email: body.email}, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(Usuario) o passowrd incorrectos"
                }
            })
        }

        if (!bcrypt.compareSync( body.password,usuarioDB.password ) ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o (password) incorrectos"
                }
            })  
        }

        let token = jwt.sign( {
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: 60 * 60 *25 *30})
        
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    })

})










module.exports = app;