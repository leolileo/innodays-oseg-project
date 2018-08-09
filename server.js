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

app.get("/api/modules", function (req, res) {
  res.status(200).json(getAllModules());


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

  if (req.params.id === "0") {
    res.status(200).json(getTractor());
  } else if (req.params.id === "1") {
    res.status(200).json(getGearBox());
  } else if (req.params.id === "2") {
    res.status(200).json(getWheel());
  } else if (req.params.id === "3") {
    res.status(200).json(getHammer());
  } else if (req.params.id === "4") {
    res.status(200).json(getScrewdriver());
  } else if (req.params.id === "5") {
    res.status(200).json(getScrew);
  }

  /*
  db.collection(MODULES_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get module");
    } else {
      res.status(200).json(doc);
    }
  });
  */
});


app.get("/api/modules", function (req, res) {
  res.status(200).json(getAllModules());
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

function getAllModules() {
  return [
    getTractor(), getGearBox(), getWheel(), getHammer(), getScrewdriver(), getScrew()
  ];
}

function getTractor() {
  return {
    "id": "0",
    "name": "Tractor",
    "description": "A tractor for use in small and medium fields.",
    "author": "John Deere",
    "category": "Component",
    "version": 3,
    "rating": 4,
    "dependsOn": [1, 2, 3, 4, 5],
    "image": '../../../assets/tractor.png',
    "comments": [
      {
        "id": "5",
        "author": "CarEnthusiast",
        "finishedOn": "2018-03-16",
        "typeOfProject": "Tractor",
        "text": "Very neat! Lacks a little power, but fine for basic tasks and really robust."
      },
      {
        "id": "6",
        "author": "George",
        "finishedOn": "2018-06-13",
        "typeOfProject": "Tractor",
        "text": "A lot less maintenance required compared to the horse I used before."
      }
    ],
    "plan": {
      "id": "0",
      "steps": [
        {
          "id": "9",
          "index": 0,
          "text": "Get your parts ready.",
          "comments": ["And a lot of time, took me two weeks to build."]
        },
        {
          "id": "10",
          "index": 1,
          "text": "Attach the four wheels to the gear box.",
          "comments": ["How about adding a step how to build a proper frame lol.", "Exactly this, are we supposed to attach the wheels directly to the gear box?"]
        },
        {
          "id": "11",
          "index": 2,
          "text": "Done!",
          "comments": []
        }
      ]
    }
  };
}

function getGearBox() {
  return {
    "id": "1",
    "name": "Gear Box",
    "description": "A 3+1 gearbox with a close gear ratio.",
    "author": "Michael Schuhmacher",
    "category": "Component",
    "version": 1,
    "rating": 4,
    "dependsOn": [3, 4, 5],
    "image": '../../../assets/gearbox.png',
    "comments": [
      {
        "id": "1",
        "author": "CarEnthusiast",
        "finishedOn": "2017-05-16",
        "typeOfProject": "Car",
        "text": "Great work! Maybe a version with adjustable gear rations would be of interest. My car runs fine, but I\\'d like a little more acceleration."
      },
      {
        "id": "2",
        "author": "John Doe",
        "finishedOn": "2018-08-02",
        "typeOfProject": "Coffee grinder",
        "text": "Way too large for household appliances."
      }
    ],
    "plan": {
      "id": "1",
      "steps": [
        {
          "id": "1",
          "index": 0,
          "text": "Weld the left casing.",
          "comments": []
        },
        {
          "id": "2",
          "index": 1,
          "text": "Insert the axle.",
          "comments": []
        },
        {
          "id": "3",
          "index": 2,
          "text": "Add the forward gears to the axle.",
          "comments": []
        },
        {
          "id": "4",
          "index": 3,
          "text": "Add the backward gears to the axle.",
          "comments": ["Using the plural of 'gears' suggests there is more than one."]
        },
        {
          "id": "5",
          "index": 4,
          "text": "Attach the second piece of the casing onto the first.",
          "comments": ["Maybe mention that the second piece has to be welded before it can be attached."]
        }
      ]
    }
  };
}

function getWheel() {
  return {
    "id": "2",
    "name": "Wheel",
    "description": "A wheel with steel rim, includes tire.",
    "author": "Michael Schuhmacher",
    "category": "Component",
    "version": 2,
    "rating": 3,
    "dependsOn": [4, 5],
    "image": '../../../assets/wheel.png',
    "comments": [
      {
        "id": "3",
        "author": "BikeFanatic",
        "finishedOn": "2018-08-21",
        "typeOfProject": "Bicycle",
        "text": "This module is directed at motored vehicles, the rim tends to get quite heavy."
      }
    ],
    "plan": {
      "id": "2",
      "steps": [
        {
          "id": "6",
          "index": 0,
          "text": "Weld the left casing.",
          "comments": []
        },
        {
          "id": "7",
          "index": 1,
          "text": "Pump up inner tube to 3 psi.",
          "comments": ["Step 3 is lot easier if this is left to the end."]
        },
        {
          "id": "8",
          "index": 2,
          "text": "Put tire with tube on rim.",
          "comments": []
        }
      ]
    }
  };
}

function getHammer() {
  return {
    "id": "3",
    "name": "Hammer",
    "description": "A regular hammer. The front can be used to pull nails.",
    "author": "Tim Allen",
    "category": "Tool",
    "version": 1,
    "rating": 5,
    "dependsOn": [],
    "image": '../../../assets/hammer.png',
    "comments": [],
    "plan": {
      "id": "3",
      "steps": [
        {
          "id": "12",
          "index": 0,
          "text": "Buy it.",
          "comments": []
        }
      ]
    }
  };
}

function getScrewdriver() {
  return {
    "id": "4",
    "name": "Screwdriver",
    "description": "A screwdriver for Phillips head screws.",
    "author": "Tim Allen",
    "category": "Tool",
    "version": 1,
    "rating": 5,
    "dependsOn": [],
    "image": '../../../assets/screwdriver.png',
    "comments": [],
    "plan": {
    "id": "4",
      "steps": [
      {
        "id": "12",
        "index": 0,
        "text": "Buy it.",
        "comments": []
      }
    ]
  }
  };
}

function getScrew() {
  return {
    "id": "5",
    "name": "Screw",
    "description": "A 10 cm screw with a Phillips head.",
    "author": "Tim Allen",
    "category": "Tool",
    "version": 1,
    "rating": 4,
    "dependsOn": [],
    "image": '../../../assets/screw.png',
    "comments": [
      {
        "id": "4",
        "author": "BikeFanatic",
        "finishedOn": "2018-05-16",
        "typeOfProject": "Car",
        "text": "The material the screw is made of seems quite soft. Be careful when using in critical parts."
      }
    ],
    "plan": {
      "id": "5",
      "steps": [
        {
          "id": "12",
          "index": 0,
          "text": "Buy it.",
          "comments": []
        }
      ]
    }
  };
}
