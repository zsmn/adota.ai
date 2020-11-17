const Express = require("express");
const BodyParser = require("body-parser");
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
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
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
