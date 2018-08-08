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

app.get("/api/module", function (req, res) {
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

app.post("/api/module", function (req, res) {
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

app.get("/api/module/:id", function (req, res) {
  db.collection(MODULES_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get module");
    } else {
      res.status(200).json(doc);
    }
  });
});


app.get("/api/modules", function (req, res) {
  res.status(200).json(getDummyData());
});


app.put("/api/module/:id", function (req, res) {
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

app.delete("/api/module/:id", function (req, res) {
  db.collection(MODULES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete module");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

function getDummyData() {
  let json = [
    {
      "id" : "1",
      "name" : "Gear Box",
      "description" : "A modular gearbox with three for forward motion and one for backward motion.",
      "author" : "Michael Schuhmacher",
      "category" : "Component",
      "version" : 1,
      "rating" : 4,
      "dependsOn" : [3, 4, 5],
      "comments" : [
        {
          "id" : "1",
          "author" : "CarEnthusiast",
          "finishedOn" : "2018-05-16",
          "typeOfProject" : "Car",
          "text" : "Great work! Maybe a version with adjustable gear rations would be of interest. My car runs fine, but I\\'d like a little more acceleration."
        },
        {
          "id" : "2",
          "author" : "John Doe",
          "finishedOn" : "2018-08-02",
          "typeOfProject" : "Coffee grinder",
          "text" : "Way too large for household appliances."
        }
      ],
      "plan" : {
          "id" : "1",
          "steps" : [
            {
              "id" : "1",
              "index" : 0,
              "text" : "Weld the left casing.",
              "comments" : []
            },
            {
              "id" : "2",
              "index" : 1,
              "text" : "Insert the axle.",
              "comments" : []
            },
            {
              "id" : "3",
              "index" : 2,
              "text" : "Add the forward gears to the axle.",
              "comments" : []
            },
            {
              "id" : "4",
              "index" : 3,
              "text" : "Add the backward gears to the axle.",
              "comments" : ["Using the plural of 'gears' suggests there is more than one."]
            },
            {
              "id" : "5",
              "index" : 4,
              "text" : "Attach the second piece of the casing onto the first.",
              "comments" : ["Maybe mention that the second piece has to be welded before it can be attached."]
            },
          ]
      }
    },
    {
      "id" : "2",
      "name" : "Wheel",
      "description" : "Wheel with rim and tire.",
      "author" : "Michael Schuhmacher",
      "category" : "Component",
      "version" : 2,
      "rating" : 3,
      "dependsOn" : [4, 5],
      "comments" : [
        {
          "id" : "3",
          "author" : "BikeFanatic",
          "finishedOn" : "2018-08-21",
          "typeOfProject" : "Bicycle",
          "text" : "This module is directed at motored vehicles, the rim tends to get quite heavy."
        }
      ],
      "plan" : {
          "id" : "2",
          "steps" : [
            {
              "id" : "6",
              "index" : 0,
              "text" : "Weld the left casing.",
              "comments" : []
            },
             {
              "id" : "7",
              "index" : 1,
              "text" : "Pump up inner tube to 3 psi.",
              "comments" : ["Step 3 is lot easier if this is left to the end."]
            },
            {
              "id" : "8",
              "index" : 2,
              "text" : "Put tire with tube on rim.",
              "comments" : []
            },
          ]
      }
    },
    {
      "id" : "3",
      "name" : "Hammer",
      "description" : "A regular hammer.",
      "author" : "Tim Allen",
      "category" : "Tool",
      "version" : 1,
      "rating" : 5,
      "dependsOn" : [],
      "comments" : [],
      "plan" : null
    },
    {
      "id" : "4",
      "name" : "Screwdriver",
      "description" : "A screwdriver for Phillips head screws.",
      "author" : "Tim Allen",
      "category" : "Tool",
      "version" : 1,
      "rating" : 5,
      "dependsOn" : [],
      "comments" : [],
      "plan" : null
    },
    {
      "id" : "5",
      "name" : "Screw with a Phillips head",
      "description" : "Screw with a Phillips head",
      "author" : "Tim Allen",
      "category" : "Tool",
      "version" : 1,
      "rating" : 4,
      "dependsOn" : [],
      "comments" : [
        {
          "id" : "4",
          "author" : "BikeFanatic",
          "finishedOn" : "2018-05-16",
          "typeOfProject" : "Car",
          "text" : "The material the screw is made of seems quite soft. Be careful when using in critical parts."
        }
      ],
      "plan" : null
    }
  ];

  return json;
}
