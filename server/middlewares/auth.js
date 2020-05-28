const jwt = require('jsonwebtoken')

//============
// Verificar TOKEN
//============


let verificaToken = (req, res, next ) =>{
    let token = req.get('token');
    jwt.verify( token, process.env.SEED, (err, decoded)=>{
        if (err){
            return res.status(401).json({
                ok: false,
                err
            });
        };
        console.log(decoded)
        req.usuario = decoded.usuario;
        next();

    });
}

//============
// Verificar ADMIN ROLE
//============

let verificaAdminRole = (req, res, next ) =>{
    // console.log(req)
    let usuario = req.usuario;
    if (usuario.role !== 'ADMIN_ROLE'){
        return res.json({
            ok: false,
            err: {
                message: "El usuario no es ADMIN"
            }
        })
    }
    next();
}


module.exports = {verificaToken, verificaAdminRole};