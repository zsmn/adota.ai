const Express = require("express");
const BodyParser = require("body-parser");
const { request, response } = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = process.env.MONGO_USR;
const PORT = process.env.PORT || 3000;
const DATABASE_NAME = "adota-ai";



var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        petsCollection = database.collection("pets");
		eventsCollection = database.collection("events");
		usersCollection = database.collection("users");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "POST, GET");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	next();
});

/// PETS 
// POST
app.post("/pets", (request, response) => {
	petsCollection.insertOne(request.body, (error, result) => {
		if(error){
			return response.status(500).send(error);
		}
		response.send(result.result);
	});
});

// GET
app.get("/pets", (request, response) => {
	petsCollection.find({}).toArray((error, result) => {
		if(error){
			return response.status(500).send(error);
		}
		response.send(result);
	});
});

/// EVENTS 
// POST
app.post("/events", (request, response) => {
	eventsCollection.insertOne(request.body, (error, result) => {
		if(error){
			return response.status(500).send(error);
		}
		response.send(result.result);
	});
});

// GET
app.get("/events", (request, response) => {
	eventsCollection.find({}).toArray((error, result) => {
		if(error){
			return response.status(500).send(error);
		}
		response.send(result);
	});
});

///USERS
//POST
app.post("/users", (request, response) =>{
	console.log(1234)
	usersCollection.insertOne(request.body, (error, result) =>{	
		if(error){
			return response.status(500).send(error);
		}
		response.send(result.result);
	});
});

//GET
app.get("/users", (request, response) => {
	usersCollection.find({}).toArray((error, result) =>{
		if(error){
			return response.status(500).send(error);
		}
		response.send(result);
	});
});

///LOGIN
//POST
app.post("/login", (request, response) =>{
	//request.body.password = bcrypt.hash(request.body.password, 10)
	const {login, password} = request.body;
	user = usersCollection.findOne({login})
	if(!user){
		return response.status(400).send({error: 'Usuario nao encontrado'})
	}
	if(user.password != password){
		return response.status(400).send({error: 'Senha invalida'})
	}
	response.redirect('/')
});

//GET
app.get("/login", (request, response) => {
	usersCollection.find({}).toArray((error, result) =>{
		if(error){
			return response.status(500).send(error);
		}
		response.send(result);
	});
});