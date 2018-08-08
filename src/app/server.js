import {Module} from "./module";
import {Plan} from "./plan";
import {Step} from "./step";
import {Comment} from "./comment/comment";

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

app.get("/api/main", function(req, res) {

  let modules = new Array();
  let steps = new Array();
  let moduleComments = new Array();
  let stepComments = new Array();

  // GearBox
  let step = new Step();
  step._id = '1';
  step.text = 'Weld the left casing.';
  steps.add(step);

  step = new Step();
  step._id = '2';
  step.text = 'Insert the axle.';
  steps.add(step);

  step = new Step();
  step._id = '3';
  step.text = 'Add the forward gears to the axle.';
  steps.add(step);

  step = new Step();
  step._id = '4';
  step.text = 'Add the backward gears to the axle.';
  stepComments.add("Using the plural of 'gears' suggests there is more than one.");
  steps.add(stepComments);
  step.comments = stepComments;
  steps.add(step);

  step = new Step();
  step._id = '5';
  step.text = 'Attach the second piece of the casing onto the first.';
  stepComments = new Array();
  stepComments.add('Maybe mention that the second piece has to be welded before it can be attached.');
  step.comments = stepComments;
  steps.add(step);

  let plan = new Plan();
  plan._id = '1';
  plan.steps = steps;

  let moduleComment = new Comment();
  moduleComment._id = '1';
  moduleComment.author = 'CarEnthusiast';
  moduleComment.finishedOn = '2018-05-16';
  moduleComment.typeOfProject = 'Car';
  moduleComment.text = 'Great work! Maybe a version with adjustable gear rations would be of interest. My car runs fine, but I\'d like a little more acceleration.';
  moduleComments.add(moduleComment);

  moduleComment = new Comment();
  moduleComment._id = '2';
  moduleComment.author = 'John Doe';
  moduleComment.finishedOn = '2017-08-02';
  moduleComment.typeOfProject = 'Coffee grinder';
  moduleComment.text = 'Way too large for household appliances.';
  moduleComments.add(moduleComment);

  let module = new Module();
  module._id = '1';
  module.name = 'Gear Box';
  module.description = 'A modular gearbox with three for forward motion and one for backward motion.';
  module.author = 'Michael Schuhmacher';
  module.category  = 'Component';
  module.version = 1;
  module.rating = 4;
  module.plan = plan;
  module.dependsOn = [3, 4, 5];
  module.comments = moduleComments;
  modules.add(module);


  // Wheels
  steps = new Array();
  moduleComments = new Array();
  stepComments = new Array();

  step = new Step();
  step._id = '6';
  step.text = 'Forge the rim.';
  steps.add(step);

  step = new Step();
  step._id = '7';
  step.text = 'Pump up inner tube to 3 psi.';
  stepComments.add('Step 3 is lot easier if this is left to the end.');
  step.comments = stepComments;
  steps.add(step);

  step = new Step();
  step._id = '8';
  step.text = 'Put tire with tube on rim.';
  steps.add(step);

  plan = new Plan();
  plan._id = '2';
  plan.steps = steps;

  moduleComment = new Comment();
  moduleComment._id = '3';
  moduleComment.author = 'BikeFanatic';
  moduleComment.finishedOn = '2018-07-21';
  moduleComment.typeOfProject = 'Bicycle';
  moduleComment.text = 'This module is directed at motored vehicles, the rim tends to get quite heavy.';
  moduleComments.add(moduleComment);

  module = new Module();
  module._id = '2';
  module.name = 'Wheel';
  module.description = 'Wheel with rim and tire.';
  module.category  = 'Component';
  module.version = 2;
  module.rating = 3;
  module.plan = plan;
  module.dependsOn = [4, 5];
  module.comments = moduleComments;
  modules.add(module);

  // Hammer
  plan = new Plan();
  plan._id = '3';
  plan.steps = [];

  module = new Module();
  module._id = '3';
  module.name = 'Hammer';
  module.description = 'A regular hammer.';
  module.author = 'Tim Allen';
  module.category  = 'Tool';
  module.version = 1;
  module.rating = 5;
  module.plan = plan;
  module.dependsOn = [];
  module.comments = [];
  modules.add(module);

  // Screwdriver
  plan = new Plan();
  plan._id = '4';
  plan.steps = [];

  module = new Module();
  module._id = '4';
  module.name = 'Screwdriver';
  module.description = 'A screwdriver for Phillips head screws.';
  module.author = 'Tim Allen';
  module.category  = 'Tool';
  module.version = 1;
  module.rating = 5;
  module.plan = plan;
  module.dependsOn = [];
  module.comments = [];
  modules.add(module);

  // Screw
  moduleComments = new Array();

  plan = new Plan();
  plan._id = '5';
  plan.steps = [];

  moduleComment = new Comment();
  moduleComment._id = '3';
  moduleComment.author = 'CarEnthusiast';
  moduleComment.finishedOn = '2018-07-21';
  moduleComment.typeOfProject = 'Bicycle';
  moduleComment.text = 'The material the screw is made of seems quite soft. Be careful when using in critical parts.';
  moduleComments.add(moduleComment);

  module = new Module();
  module._id = '5';
  module.name = 'Screw with a Phillips head';
  module.description = 'Size 5';
  module.author = 'Tim Allen';
  module.category  = 'Material';
  module.version = 1;
  module.rating = 4;
  module.plan = plan;
  module.dependsOn = [];
  module.comments = moduleComments;
  modules.add(module);



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

app.post("/api/main", function(req, res) {
  const newModule = req.body;
  newModule.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(MODULES_COLLECTION).insertOne(newModule, function(err, doc) {
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

app.get("/api/main/:id", function(req, res) {
  db.collection(MODULES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get module");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/main/:id", function(req, res) {
  const updateDoc = req.body;
  delete updateDoc._id;

  db.collection(MODULES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update module");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/main/:id", function(req, res) {
  db.collection(MODULES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete module");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
