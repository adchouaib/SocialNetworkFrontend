import FriendList from "../components/friendList/FriendList";
import styles from "../styles/Home.module.css";
import { fetchUsersApi } from "./api/general";
import Router from "next/router";
import { useEffect } from "react";

export default function Home({ status, friends , auth }) {
  useEffect(() => {
    if (status == 401) {
      Router.push("/");
    }
  }, []);

  return <>{friends && <FriendList friends={friends} auth={auth} />}</>;
}

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function getServerSideProps({ req, res }) {
  let jwt = req.cookies.jwt;
  var auth = { Authorization: `Bearer ${jwt}` };

  let result = await fetch("https://localhost:7213/api/Friend/NonFriends", {
    headers: auth,
    agent,
  });

  let status = await result.status;
  let friends = null;
  if (status == 200) {
    friends = await result.json();
  }

  return {
    props: { status, friends , auth},
  };
}
