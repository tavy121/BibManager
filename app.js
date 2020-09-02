const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bibRoutes = require('./api-backend/routes/bib');
const userRoutes = require('./api-backend/routes/user');

mongoose.connect("mongodb://node-bib:"+ 
                process.env.MONGO_ATLAS_PW +
                "@node-rest-bib-shard-00-00-wa02f.mongodb.net:27017,node-rest-bib-shard-00-01-wa02f.mongodb.net:27017,node-rest-bib-shard-00-02-wa02f.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-bib-shard-0&authSource=admin&retryWrites=true",
                {
                    useNewUrlParser: true
                }
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'GET,PUT,POST,DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/bibs', bibRoutes);
app.use('/user', userRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message:error.message 
        }
    });
});
module.exports = app;
