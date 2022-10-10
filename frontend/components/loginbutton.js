import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function LoginButton() {
	const router = useRouter();
	const { data: session } = useSession();

	if (session) {
		console.log(session);

		return (
			<div>
				<p>Logout - Signed in</p>
				<button onClick={() => router.push("/logout")}>Sign out</button>
			</div>
		);
	} else {
		return (
			<div>
				<p>Login - Not Signed In</p>
				<button onClick={() => router.push("/login")}>Sign in</button>
			</div>
		);
	}
}
