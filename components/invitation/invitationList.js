import React, { useEffect } from "react";
import InvitationComponent from "./invitationComponent/invitationComponent";
import styles from "./invitationList.module.css";

function InvitationList({ invitations, auth }) {
  const invitationList = invitations.map((invitation) => {
    return <InvitationComponent invitation={invitation} auth={auth} />;
  });

  return <div className={styles.people_nearby}>{invitationList}</div>;
}

export default InvitationList;
