import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import LoginComponent from "../components/LoginComponent";
import LinkComponent from "../components/LinkComponents";

export default function Signup() {
	return (
		<div className={styles.container}>
			<h1>Sign Up</h1>

			<LinkComponent />
		</div>
	);
}
