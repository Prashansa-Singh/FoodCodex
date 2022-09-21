import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { axiosInstance } from '../axiosConfig';

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			id: 'mongodb-credentials',

			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'FoodCodex Credentials',

			// The credentials used on the sign in page
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},

			async authorize(credentials, req) {
				// Custom credential validation logic here that takes the credentials
				// submitted and returns either a object representing the user or
				// false/null if the credentials are invalid.

				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

				try {
					// Send backend request to authenticate user
					let user = await axiosInstance.post('user/validateUser', {
						username: credentials.username,
						password: credentials.password,
					});

					// console.log(user);
					console.log(user.data);
					user.data.name = user.data._id;
					console.log(user.data);

					return user.data;
				} catch (error) {
					return null;
				}
			},
		}),
	],
	// callbacks: {
	// 	async session({ session, token, user }) {
	// 		// Send properties to the client, like an access_token from a provider.

	// 		session.accessToken = token.accessToken;
	// 		return session;
	// 	},
	// },
});
