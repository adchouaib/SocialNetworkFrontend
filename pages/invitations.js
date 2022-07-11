import React from 'react'
import InvitationList from '../components/invitation/invitationList'

function invitations({ finvitationsStatus, invitations, auth }) {
  return (
    <div>
        <InvitationList invitations={invitations} auth={auth} />
    </div>
  )
}

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});


export async function getServerSideProps({ req, res }) {
    let jwt = req.cookies.jwt;
    var auth = { Authorization: `Bearer ${jwt}` };
  
    let invitationsQuery = await fetch("https://localhost:7213/api/Friend/Invitations", {
      headers: auth,
      agent,
    });
  
    let invitationsStatus = await invitationsQuery.status;
    let invitations = null;
  
    if (invitationsStatus == 200) {
      invitations = await invitationsQuery.json();
    }
  
    if (invitationsStatus == 401) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
  
    return {
      props: { invitationsStatus, invitations, auth },
    };
  }

export default invitations