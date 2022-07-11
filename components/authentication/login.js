import React, { useEffect, useState } from "react";
import styles from "./authentication.module.css";
import Link from "next/link";
import Router from "next/router";

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function Login() {
  const [awaitfetch, setawaitfetch] = useState(false);

  const submitClick = async (e) => {
    e.preventDefault();
    var { email, password } = document.forms[0];
    setawaitfetch(!awaitfetch);
    let res = await fetch(
      "https://localhost:7213/api/Auth/login",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      },
      { agent }
    ).then((res) => {
      setawaitfetch(!awaitfetch);
      Router.push("/posts");
    });
  };

  return (
    <div className="d-flex  flex-column justify-content-center align-items-center ">
      <h1>Login</h1>
      <form className={styles.login} onSubmit={submitClick}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          className={styles.email}
          placeholder="example@email.com"
        />
        <label className={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          className={styles.password}
          placeholder="at least 8 characters"
        />
        <input
          type="submit"
          className={styles.loginButton}
          onClick={submitClick}
          value="Login"
        />
        <div className={styles.separator} />
        <p className={styles.registerText}>
          Don't have an account?{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </p>
      </form>
      {awaitfetch && (
        <div class="spinner-border mt-1" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default Login;
