const express = require("express");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3000; 
const api = express();

api.use(express.json());
api.use(cors());
api.use(require('./routes/app.routes.js'));
api.use(require('./routes/user.routes.js'));
// go to: http://localhost:3000/api-docs/ for api documentation
require("./swagger/swagger.config.js")(api);
require("./swagger/swagger.routes.js")


// home page as html in server app
api.use(express.static(path.join(__dirname, '../../frontend')));
api.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/mainpage.html'));
});
api.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/sign.html'))
})


api.listen(port, () => {
  console.log(`Server Running. Listening to: ${port}`); 
});