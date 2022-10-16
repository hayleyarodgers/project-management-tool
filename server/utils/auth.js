const jwt = require("jsonwebtoken");

// Set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
	// Function for our authenticated routes
	authMiddleware: function ({ req }) {
		// Allows token to be sent via req.body, req.query or headers
		let token = req.body.token || req.query.token || req.headers.authorization;

		// Split the token string into an array and return the actual token
		// ["Bearer", "<tokenvalue>"]
		if (req.headers.authorization) {
			token = token.split(" ").pop().trim();
		}

		if (!token) {
			return res.status(400).json({ message: "You have no token!" });
		}

		// If the token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
		try {
			const { data } = jwt.verify(token, secret, { maxAge: expiration });
			req.user = data;
		} catch {
			console.log("Invalid token.");
			return res.status(400).json({ message: "Invalid token." });
		}

		// Send to next endpoint.
		next();
	},
	signToken: function ({ username, email, _id }) {
		const payload = { username, email, _id };

		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
	},
};
