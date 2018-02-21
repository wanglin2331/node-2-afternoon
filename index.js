const express = require('express');
const bodyParser = require('body-parser');
const cors =require('cors');
const massive = require('massive');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000 ;

const Products_controller= require('./products_controller');

massive(process.env.CONNECTION_STRING).then(dbInstance => {         
    app.set('db',dbInstance);
});

app.post('/api/product',Products_controller.create);
app.get('/api/products',Products_controller.getAll);
app.get('/api/product/:id',Products_controller.getOne);
app.put('/api/product/:id',Products_controller.update);                     //why we are not put endpoint as "/api/product/:id?desc=", but still put ?desc=changedescriptiontext into the URL when put?
app.delete('/api/product/:id',Products_controller.delete);


app.listen(port, ()=>{console.log('server is listening on port ', port)});