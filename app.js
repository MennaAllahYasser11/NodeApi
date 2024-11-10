require('dotenv').config();
const express = require('express'),
app = express(),
mongoose =require('mongoose');

mongoose.connect(process.env.DB_URL)
const conn = mongoose.connection
conn.once('open' , () => console.log('Connection Success'))
conn.on('error' , () => console.error('connection failed'))


app.use(express.json()); // cause eny ht3aml m3 json data

// app.use(express.urlencoded({extended:false}))
 // da lw hakhod data mn el body , form and so on 


app.use('/users', require('./routes/users'))
app.use('/products', require('./routes/products'))
app.use('/orders', require('./routes/orders'))



module.exports = app;