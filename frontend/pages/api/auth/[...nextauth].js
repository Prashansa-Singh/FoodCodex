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
					let user = await axiosInstance.post('user/validate-user', {
						username: credentials.username,
						password: credentials.password,
					});

					// console.log(user);
					console.log(user.data);

					return user.data;
				} catch (error) {
					return null;
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 60 * 15, // 15 minutes
	},
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			// Add custom fields to JWT Token
			// console.log(`Account JWT: ${account}`);
			// console.log(`Token JWT: ${JSON.stringify(token)}`);
			// console.log(`User: ${JSON.stringify(user)}`);

			if (user) {
				token._id = user._id
				token.username = user.userName
				token.displayName = user.displayName
			}

			// console.log(`Token: ${JSON.stringify(token)}`);

			return token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			// console.log(`Session: ${JSON.stringify(session)}`);
			// console.log(`Token: ${JSON.stringify(token)}`);
			// console.log(`User: ${JSON.stringify(user)}`);

			session.user._id = token._id
			session.user.username = token.username
			session.user.displayName = token.displayName

			// console.log(`Final Session: ${JSON.stringify(session)}`);

			return session;
		},
	},
	pages: {
		signIn: '/login',
		signOut: '/signout',
	}
});
