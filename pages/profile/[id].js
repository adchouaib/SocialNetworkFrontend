import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import Router from "next/router";
import ProfileComponent from '../../components/profileComponent/profileComponent'

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function Profile({auth}) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const { id } = router.query;

    const fetchUser = async () => {
      const url = "https://localhost:7213/api/User/"+id
      let result = await fetch(url, {
        headers: auth,
        agent
      });

      const status = await result.status;

      if(status == 200){
        const user = await result.json();
        setUser(user);
      }if(status == 401){
        Router.push('/')
      }
    
      console.log(user);
    } 

    fetchUser();
    
  }, [])

  return (
    <>
        {user!=null && <ProfileComponent user={user}/>}
        {error!=null && <div>{error}</div>}
    </>
  )
}

export async function getServerSideProps({req,res}){
  let jwt = req.cookies.jwt;
  var auth = { Authorization: `Bearer ${jwt}` };
  return {
    props: {
      auth
    }
  }
}

export default Profile