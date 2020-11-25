const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./controllers/authController')(app);
require('./controllers/petController')(app);
require('./controllers/eventController')(app);

app.listen(process.env.PORT || 3000);