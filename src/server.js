const express = require("express");

// Make an instance of the Express server system
// so that we can configure it 
const app = express();

// Built-in middleware that allows the server to 
// receive JSON body data 
app.use(express.json());




// localhost:3000/
// domainName:port/
// serverInstance.verb(path, callback)
app.get("/", (request, response) => {
	response.json({
		message:"Hello world!"
	});
});

const UserController = require("./controllers/UserController.js");
app.use("/users", UserController);


app.use((error, request, response, next) => {
	console.log("Server threw an error with message: " + error.message);

	response.json({
		status: 500,
		error: error.message,
		errorFull: JSON.stringify(error)
	});

});


module.exports = {
	app
}

// Different export syntax: 
// module.exports = app;