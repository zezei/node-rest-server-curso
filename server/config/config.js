///==================
//---puero
//============


process.env.PORT = process.env.PORT || 3000;

///==================
//---Entorno
//============


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

///==================
//---BASE DE DATOS
//============

let urlDB;

if (process.env.NODE_ENV == 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}
else{
    urlDB = process.env.MONGO_URI;
}


// mongodb+srv://alesandro:<password>@cluster0-musni.mongodb.net/test?retryWrites=true&w=majority


// mongodb+srv://alesandro:<password>@cluster0-musni.mongodb.net/test

process.env.URLDB = urlDB