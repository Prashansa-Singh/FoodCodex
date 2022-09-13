import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
// import clientPromise from "../../../lib/mongodb";

import dbConnect from "../../../lib/mongoose";
import User from "../../../models/User";

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: { url: "https://discord.com/oauth2/authorize" },
			token: { url: "https://discord.com/api/oauth2/token" },
		}),
		CredentialsProvider({
			id: "mongodb-credentials",

			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: "FoodCodex Credentials",

			// The credentials used on the sign in page
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials, req) {
				// Custom credential validation logic here that takes the credentials
				// submitted and returns either a object representing the user or
				// false/null if the credentials are invalid.

				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

				// create/ check db connection
				await dbConnect();

				// Naiive Implementation - If username and unhashed passwords are the same, return user details
				// otherwise return null
				try {
					console.log(credentials);

					const user = await User.findOne({
						userName: credentials.username,
						password: credentials.password,
					});

					return user;
				} catch (error) {
					return null;
				}
			},
		}),
	],
	// adapter: MongoDBAdapter(clientPromise),
});
