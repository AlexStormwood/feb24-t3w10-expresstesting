const express = require("express");

const router = express.Router();

// GET localhost:3000/users
router.get("/", (request, response) => {

	response.json({
		data: [
			"xander",
			"tom",
			"hannah",
			"reece",
			"brad",
			"hayden"
		]
	});
});


// POST localhost:3000/users/signup
router.post("/signup", async (request, response) => {
	let receivedUserData = request.body;

	receivedUserData.password = "EncryptedPassword";
	
	// pretend we have written receivedUserData into a DB
	let placeholderDatabaseResult = {...receivedUserData};

	// placeholderDatabaseResult is a placeholder for actually making a new user in a database 
	response.json(placeholderDatabaseResult);
});

// GET localhost:3000/users/12345
router.get("/:userid", async (request, response) => {
	let targetUserId = request.params.userid;
	// let exampleSomeOtherProperty = request.params.someotherproperty;

	// make a database query that uses that ID 
	// eg. let result = await User.findById(targetUserId);

	response.json({
		result: {
			id: targetUserId,
			username: "Pretend this is a username from the database"
		}
	});

});

module.exports = router;