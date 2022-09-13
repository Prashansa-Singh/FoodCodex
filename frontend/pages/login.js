import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import LoginComponent from "../components/LoginComponent";
import LinkComponent from "../components/LinkComponents";
// import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
	return (
		<div className={styles.container}>
			<h1>Login</h1>

			<LoginComponent />
			<LinkComponent />
		</div>
	);
}
