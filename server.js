var express = require('express'),
    tasks = require('./routes/tasks');

var app = express();

app.use(express.static('public'));

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/tasks/pending/', tasks.findPending);
app.get('/tasks/overdue/', tasks.findPending);
app.post('/task/', tasks.createTask);
app.post('/task/update/:id', tasks.updateTask);
app.get('/task/destroy/:id', tasks.deleteTask);

app.listen(80);
console.log('Listening on port 80...');
