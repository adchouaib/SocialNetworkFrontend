import React, { useEffect, useState } from "react";
import styles from "./authentication.module.css";
import Link from "next/link";
import Router from "next/router";

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function Register() {
  const [awaitfetch, setawaitfetch] = useState(false);

  const submitClick = async (e) => {
    e.preventDefault();
    var { name, email, description, password, birthDate, avatar, work } = document.forms[0];
    setawaitfetch(!awaitfetch);
    let res = await fetch(
      "https://localhost:7213/api/Auth/register",
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
          fullname: name.value,
          avatar: avatar.value,
          work: work.value,
          description: description.value,
          birthDate: birthDate.value,
        }),
      },
      { agent }
    ).then((res) => {
      setawaitfetch(!awaitfetch);
      Router.push('/');
    });
  };

  return (
    <div>
      <h1>Register</h1>
      <form className={styles.login} onSubmit={submitClick}>
        <label className={styles.label}>Name</label>
        <input
          type="text"
          className={styles.name}
          placeholder="Jhon Doe"
          name="name"
        />
        <label className={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          className={styles.email}
          placeholder="example@email.com"
        />
        <label className={styles.label}>Profile Picture</label>
        <input
          type="text"
          name="avatar"
          className={styles.avatar}
          placeholder="https://imageUrlExample.com"
        />
        <label className={styles.label}>Description</label>
        <textarea
          rows = "3"
          name="description"
          className={styles.description}
          placeholder="example ..."
        />
        <label className={styles.label}>Work</label>
        <input
          type="text"
          className={styles.work}
          placeholder="software engineer ..."
          name="work"
        />
        <label className={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          className={styles.password}
          placeholder="at least 8 characters"
        />
        <label className={styles.label}>BirthDate</label>
        <input type="date" className={styles.birthdate} name="birthDate" />
        <button
          type="submit"
          className={styles.loginButton}
          onClick={submitClick}
        >
          Register
        </button>
        <div className={styles.separator} />
        <p className={styles.registerText}>
          Already have an account?{" "}
          <Link href="/">
            <a>Log in</a>
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

export default Register;
