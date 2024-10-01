require('rootpath')();

const dotenv = require('dotenv');
      dotenv.config();
const  app      = require('./service/express');

app.listen(process.env.PORT, () => {
    console.log("Node server running on http://localhost:"+process.env.PORT);
});

console.log('Executing Server: index.js ...');

