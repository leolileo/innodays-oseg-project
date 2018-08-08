const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const MODULES_COLLECTION = "contacts";

const app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGOLAB_URI || "mongodb://leolileo:berliner4ever@ds161411.mlab.com:61411/mean-test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});

// MODULES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/main"
 *    GET: finds all main
 *    POST: creates a new contact
 */

app.get("/api/main", function (req, res) {
  res.status(200).json(modules);


  /*
    db.collection(MODULES_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get main.");
      } else {
        res.status(200).json(docs);
      }
    });
    */
});

app.post("/api/main", function (req, res) {
  const newModule = req.body;
  newModule.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(MODULES_COLLECTION).insertOne(newModule, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new module.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/main/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/main/:id", function (req, res) {
  db.collection(MODULES_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get module");
    } else {
      res.status(200).json(doc);
    }
  });
});

//TODO FRITZ
let object =
  {
    "employees": [
      {"firstName": "John", "lastName": "Doe"},
      {"firstName": "Anna", "lastName": "Smith"},
      {"firstName": "Peter", "lastName": "Jones"}
    ]
  };

app.get("/api/getModules", function (req, res) {

  let object =
    {
      "employees": [
        {"firstName": "John", "lastName": "Doe"},
        {"firstName": "Anna", "lastName": "Smith"},
        {"firstName": "Peter", "lastName": "Jones"}
      ]
    };
  res.status(200).json(object);
});


app.put("/api/main/:id", function (req, res) {
  const updateDoc = req.body;
  delete updateDoc._id;

  db.collection(MODULES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update module");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/main/:id", function (req, res) {
  db.collection(MODULES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete module");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
