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
    urlDB = 'mongodb+srv://alesandro:Qw2g4PU7J52dzgkc@cluster0-musni.mongodb.net/cafe'
}


// mongodb+srv://alesandro:<password>@cluster0-musni.mongodb.net/test?retryWrites=true&w=majority


// mongodb+srv://alesandro:<password>@cluster0-musni.mongodb.net/test

process.env.URLDB = urlDB