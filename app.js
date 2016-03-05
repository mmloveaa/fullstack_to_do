'use strict';

const PORT = 8888;
const todosFilename = './todos.json';
// const FILENAME = './names.json';

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));  /*filepath*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// x-www-form-urlencoded (how we are gonna accept our body here)
// every single request will pass through, this middleware will be called first , the response 
// is untouch now


app.post('/todos', function (req, res, next) {
	// console.log("req.body: ", req)
	fs.readFile(todosFilename, function (err, data) {
		var toDoItem = JSON.parse(data);
		toDoItem.push(req.body);
		// console.log('toDoItem: ', toDoItem)

		fs.writeFile(todosFilename, JSON.stringify(toDoItem), function (err) {
			// console.log('done!');
			res.send(req.body);
			// console.log("req.body: ", req.body)

		});
	});
});

app.get('/todos', function (req, res) {
	fs.readFile(todosFilename, function (err, data) {
		var todos = JSON.parse(data);
		res.send(todos);
	});
});


app.get('/', function (req, res, next) {
	res.sendFile( path.join(__dirname, './index.html'));
});


app.get('/style.css', function (req, res, next) {
	res.sendFile( path.join(__dirname, './style.css'));
});

app.get('/main.js', function (req, res, next) {
	res.sendFile( path.join(__dirname, './main.js'));
});


app.get('/test' , function (req , res){
	// console.log('req.query:', req.query);
	// console.log('req.query.index:', req.query.index);
	res.send('GET to /test \n');
});

// ':'' is defined url parameter
app.delete('/todos/:index', function (req, res) {
	// console.log('req.params:', req.params);
	// cnsole.log(req.params.index)

	res.send('DELETE to /todos/:index');
});

var server = http.createServer(app);


server.listen(PORT, function() {
	console.log(`Server listening on port ${PORT}`);
});

// app.post('/todos/add', function(req, res){
//     fs.readFile('./todos.json', function(err, data){
//       if (err) return res.status(400).send(err);

//       var taskList = JSON.parse(data)
//       var newTask = req.body;
//       taskList.push(newTask);

//       fs.writeFile('./todos.json', JSON.stringify(taskList), function(err){
//         if (err) return res.status(400).send(err);
//         res.send("task added\n");
//       });
//     });
// });

// app.post('/todos/delete', function (req, res){
//     fs.readFile('./todos.json', function(err, data){
//       if (err) return res.status(400).send(err);

//       var taskList = JSON.parse(data)
//       var index = req.body.index;
//       taskList.splice(index, 1);

//       fs.writeFile('./todos.json', JSON.stringify(taskList), function(err){
//         if (err) throw err;
//         res.send("task deleted\n");
//       });
//     });
// });