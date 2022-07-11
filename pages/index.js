import Login from "../components/authentication/login";
import Router from "next/router";
import { useEffect } from "react";
import { faGalacticSenate } from "@fortawesome/free-brands-svg-icons";

export default function Home({redirectToHome}) {


  return (
    <div>
      <Login/>
    </div>
  );
}

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function getServerSideProps({ req, res }) {
  let jwt = req.cookies.jwt;
  let redirectToHome = jwt == null || jwt == "undefined" ? false : true;
  if(redirectToHome){
    return {
      redirect: {
        permanent: false,
        destination: '/posts'
      }
    }
  }
  return {
    props: {
      redirectToHome,
    },
  };
}
