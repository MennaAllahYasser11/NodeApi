// Load Environment Variables
require('dotenv').config();

const http = require('http') ,
      app  = require('./app'),
      port = process.env.port || 5000;


// Create App Server
http.createServer(app);


app.listen(port , () => {
    console.log(`Server Running on localhost:${port}`);
});


