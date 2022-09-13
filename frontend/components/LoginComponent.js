import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginComponent() {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				<h1>Logout - Signed in</h1>
				<p>Login page for the app</p>
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	} else {
		return (
			<>
				<h1>Login - Not Signed In</h1>
				<p>Login page for the app</p>
				<button onClick={() => signIn()}>Sign in</button>
			</>
		);
	}
}
