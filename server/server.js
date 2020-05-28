require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
 

///CONFIG DE RUTAS
app.use (require('./routes/index'));

// app.use (require('./routes/usuario'));
// app.use (require('./routes/login'));

// parse application/json
app.use(bodyParser.json()) //Midleweare se ejecuta siempre que el codigo pase por aca

mongoose.connect(process.env.URLDB , { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log("BD ONLINE")
});


app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto 3000")
})