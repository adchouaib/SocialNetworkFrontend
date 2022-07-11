import { redirect } from "next/dist/server/api-utils";
import React from "react";
import ProfileComponent from "../components/profileComponent/profileComponent";

function myprofile({ user ,auth }) {
  return <ProfileComponent user={user} isMyProfile={true} auth={auth}/>;
}

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function getServerSideProps({ req, res }) {
  let jwt = req.cookies.jwt;
  var auth = { Authorization: `Bearer ${jwt}` };

  let userQuery = await fetch("https://localhost:7213/api/Auth", {
    headers: auth,
    agent,
  });

  let userStatus = await userQuery.status;
  let user = null;

  if (userStatus == 200) {
    user = await userQuery.json();
  }

  if (userStatus == 400) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: { userStatus, user, auth },
  };
}

export default myprofile;
