import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./layout.module.css";
import { useRouter } from "next/router";

import {
  faUserFriends,
  faUserPlus,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import ToastContainer from "react-bootstrap/ToastContainer";
import NotificationToast from "../notificationToast/notificationToast";
import Cookies from "js-cookie";

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function Layout({ children }) {

  const router = useRouter();

  // const Logout = async () => {
  //   var auth = { Authorization: `Bearer ${jwt}` };
  //   let result = await fetch("https://localhost:7213/api/Auth/logout", {
  //     method: "post",
  //     headers: auth,
  //     agent,
  //   }).then((res) => console.log(res));
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>Social Network</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Social{" "}
            <Link href={"/"}>
              <span className={styles.head}>Network</span>
            </Link>
          </h1>
          <p className={styles.description}>
            This is a simple social network built with Next.js.
          </p>

          {router.pathname != "/"  && (
            <Link href={"/myprofile"}>
              <FontAwesomeIcon 
                className={styles.profileButton}
                icon={faUser}
              />
            </Link>
          )}

          {router.pathname != "/" && (
            <Link href={"/friends"}>
              <FontAwesomeIcon
                className={styles.friendsButton}
                icon={faUserFriends}
              />
            </Link>
          )}

          {router.pathname != "/" && (
            <Link href={"/invitations"}>
              <FontAwesomeIcon
                className={styles.invitationButton}
                icon={faUserPlus}
              />
            </Link>
          )}
        </div>

        {children}

        {router.pathname != "/" && (
          <ToastContainer
            containerPosition="fixed"
            position="bottom-end"
            className="p-3"
          >
            <NotificationToast />
          </ToastContainer>
        )}
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/" target="_blank" rel="Eladraoui chouaib">
          Powered by{" "}
          <span style={{ color: "#0070f3", marginLeft: "3px" }}>
            Eladraoui Chouaib
          </span>
        </a>
      </footer>
    </div>
  );
}

export default Layout;