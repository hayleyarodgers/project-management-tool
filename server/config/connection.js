const mongoose = require("mongoose");

// If application is running on Heroku, connect to MongoDB database via config variable
// If application is running on localHose, connect to MongoDB database via link
mongoose.connect(
	process.env.MONGODB_URI ||
		"mongodb://localhost:27017/projectManagementToolDB",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}
);

module.exports = mongoose.connection;
