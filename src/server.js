const express = require("express");

// Make an instance of the Express server system
// so that we can configure it 
const app = express();

// localhost:3000/
// domainName:port/
// serverInstance.verb(path, callback)
app.get("/", (request, response) => {
	response.json({
		message:"Hello world!"
	});
});

module.exports = {
	app
}