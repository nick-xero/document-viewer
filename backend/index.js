const express = require('express')

const routes = require('./libs/routes')

const PORT = 3011;
const app = express();

app.use(express.json()) 
app.use(express.static(`${__dirname}/public`))

app.use(routes);

app.listen(PORT,()=>{
    console.log('express server listenning on port: ',PORT)
})

