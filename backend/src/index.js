const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());


require('./controllers/authController')(app);
require('./controllers/petController')(app);
require('./controllers/eventController')(app);

app.listen(process.env.PORT || 3000);