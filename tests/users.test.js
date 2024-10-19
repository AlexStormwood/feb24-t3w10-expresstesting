// Importing the code that we want to test 
const {app} = require("../src/server.js");

// Importing a testing helper function from supertest
const request = require("supertest");

describe("Users controller", () => {

	test("Get all users route returns array of users", async () => {
		// GET localhost:3000/users
		const response = await request(app).get("/users");

		expect(response.body.data.length).toBe(6);

		let expectedUsers = [
			"xander",
			"tom",
			"hannah",
			"reece",
			"brad",
			"hayden"
		];

		expect(response.body.data).toEqual(expect.arrayContaining(expectedUsers));

	});

	test("Get user by ID route returns a single user as object", async () => {
		// GET localhost:3000/users/12345
		let targetUserId = "12345";
		const response = await request(app).get("/users/" + targetUserId);

		expect(response.body.result.id).toBe(targetUserId);
		expect(response.body.result.username).toBe("Pretend this is a username from the database");
	});

	test("User sign-up route returns a single user as object", async () => {
		// POST localhost:3000/users/signup
		const response = await request(app)
			.post("/users/signup")
			.send({
				username: "jason", 
				password:"SuperCoolPassword1"
			});
		
		expect(response.body.username).toBe("jason");
		expect(response.body.password).toBe("EncryptedPassword");
	});

	test("User login route returns a single user as object", async () => {
		// POST localhost:3000/users/login
		const response = await request(app)
			.post("/users/login")
			.set("Authorization", "Example string for header value");
			// .send({
			// 	username: "jason", 
			// 	password:"SuperCoolPassword1"
			// });
		expect(response.body.authHeaderData).toBe("Example string for header value");
	});


	test("User login route throws an error on invalid login data", async () => {
		// POST localhost:3000/users/login
		const response = await request(app)
			.post("/users/login")
			.set("Authorization", "This should cause an error");
			// .send({
			// 	username: "jason", 
			// 	password:"SuperCoolPassword1"
			// });
		expect(response.body.authHeaderData).toBeUndefined();
		expect(response.body.status).toBe(500);
		expect(response.body.error).toBe("Not valid login data!");
	});


	test.skip("User update/edit route returns a single user as object", async () => {
		// PATCH localhost:3000/users/12345
		const response = await request(app)
			.patch("/users/12345")
			.send({
				username: "jason", 
				password:"SuperCoolPassword1"
			});
	});

	test.skip("User delete route returns return a number of users deleted", async () => {
		// DELETE localhost:3000/users/12345
		const response = await request(app)
			.delete("/users/12345")
			.send({
				username: "jason", 
				password:"SuperCoolPassword1"
			});
	});

});