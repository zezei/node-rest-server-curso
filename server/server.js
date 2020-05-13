require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json()) //Midleweare se ejecuta siempre que el codigo pase por aca


app.get('/usuario', function (req, res) {
    res.json('get Usuario')
});


app.post('/usuario', function (req, res) {
    let body = req.body;
    if (body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: "Debes subministrar un nombre"
        })
    } else{
        res.json({
            persona: body
        })
    }
});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id
    })
});

app.delete('/usuario', function (req, res) {
    res.json('Delete Usuario')
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto 3000")
})