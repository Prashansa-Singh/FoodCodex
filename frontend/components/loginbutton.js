import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<div>
				<p>Logout - Signed in</p>
				<button onClick={() => signOut()}>Sign out</button>
			</div>
		);
	} else {
		return (
			<div>
				<p>Login - Not Signed In</p>
				<button onClick={() => signIn()}>Sign in</button>
			</div>
		);
	}
}
