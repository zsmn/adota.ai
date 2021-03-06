const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json({limit: '3mb'}));
app.use(bodyParser.urlencoded({limit: '3mb', extended: true}));
app.use(cors());

require('./controllers/authController')(app);
require('./controllers/petController')(app);
require('./controllers/eventController')(app);

app.listen(process.env.PORT || 3000);
