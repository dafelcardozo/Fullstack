var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('tasks', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'tasks' database");
        db.collection('tasks', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'tasks' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving task: ' + id);
    db.collection('tasks', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
/*
exports.findAll = function(req, res) {
    var field = req.query.field || "name";
    var sort = {};
    sort[field] = parseInt(req.query.order||"1");

    db.collection('tasks', function(err, collection) {
        collection.find()
        .sort(sort)
        .toArray(function(err, items) {
            res.send(items);
        });
    });
};
*/


exports.findOverdue = function(req, res) {
    // var field = req.query.field || "name";
    // var sort = {};
    // sort[field] = parseInt(req.query.order||"1");

    db.collection('tasks', function(err, collection) {
        collection.find({ dueDate: { $lt: new Date() } })
        .sort({priority:1})
        .toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findPending = function(req, res) {
    var field = req.query.field || "name";
    var sort = {};
    sort[field] = parseInt(req.query.order||"1");
console.info("pending");
    db.collection('tasks', function(err, collection) {
        collection.find({ dueDate: { $gt: new Date() } })
        .sort(sort)
        .toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.createTask = function(req, res) {
    var task = req.body;
    task.dueDate = new Date(task.dueDate);
//    console.log('Adding task: ' + JSON.stringify(task));
    db.collection('tasks', function(err, collection) {
        collection.insert(task, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateTask = function(req, res) {
    var id = req.params.id;
    var task = req.body;
    console.log('Updating task: ' + id);
    console.log(JSON.stringify(task));

    db.collection('tasks', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, task, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating task: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(task);
            }
        });
    });
}

exports.deleteTask = function(req, res) {
    var id = req.params.id;
    console.log('Deleting task: ' + id);
    db.collection('tasks', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}



/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var tasks = [
    {
        name: "Implement API",
        priority: "Inmediate",
        dueDate: new Date(),
    },
    {
        name: "Unit test API",
        priority: "High",
        dueDate: new Date()
    },
    {
      name:"Deploy to AWS EC2",
      priority:"Low",
      dueDate: new Date()
    },
    {
      name:"Implement AngularJS interface",
      priority:"High",
      dueDate:new Date()
    }
  ];

    db.collection('tasks', function(err, collection) {
        collection.insert(tasks, {safe:true}, function(err, result) {});
    });

};
