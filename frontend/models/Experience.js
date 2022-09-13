const mongoose = require("mongoose");

/* Experience Schema */
const experienceSchema = new mongoose.Schema({
	experienceTime: { type: Date, required: true },
	experience: { type: String },

	// entered and edited time
	entryTimestamp: { type: Date, required: true },
});

module.exports =
	mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
