import { useEffect } from "react";
import PostsList from "../components/posts/postsList";
import Router from "next/router";

export default function Home({ status, posts, user, userStatus, auth }) {
  useEffect(() => {
    if (status == 401 || userStatus == 401) {
      Router.push("/");
    }
  }, []);

  return <>{posts && <PostsList posts={posts} user={user} auth={auth}/>}</>;
}

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function getServerSideProps({ req, res }) {
  let jwt = req.cookies.jwt;
  var auth = { Authorization: `Bearer ${jwt}` };

  let result = await fetch("https://localhost:7213/api/Friend/FriendsPosts", {
    headers: auth,
    agent,
  });

  let userQuery = await fetch("https://localhost:7213/api/Auth", {
    headers: auth,
    agent
  })

  let userStatus = await userQuery.status;
  let user = null;

  let status = await result.status;
  let posts = null;

  if (status == 200 && userStatus == 200) {
    posts = await result.json();
    user = await userQuery.json();
  }

  return {
    props: { status, posts, userStatus, user, auth },
  };
}
