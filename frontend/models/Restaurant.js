const mongoose = require("mongoose");

/* Restaurant Record Schema */
const restaurantSchema = new mongoose.Schema({
	name: { type: String, required: true },
	rating: { type: Number, enum: [0, 1, 2, 3, 4, 5] },
	priceRating: { type: Number, enum: [0, 1, 2, 3] },
	address: { type: String },
	experiences: { type: [mongoose.Types.ObjectId], ref: "Experience", default: [] },

	cuisine: { type: String },

	lastVisited: { type: Date },
	allVisits: { type: [Date] },

	// Options, false means undefined
	personalOption: { type: Boolean, default: false },
	halalOption: { type: Boolean, default: false },
	veganOption: { type: Boolean, default: false },
	vegetarianOption: { type: Boolean, default: false },
	pescatarianOption: { type: Boolean, default: false },
	nutsFreeOption: { type: Boolean, default: false },
	dairyFreeOption: { type: Boolean, default: false },
	glutenFreeOption: { type: Boolean, default: false },
	allergyFriendlyOption: { type: Boolean, default: false },
	diabetesFriendlyOption: { type: Boolean, default: false },
});

module.exports =
	mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
