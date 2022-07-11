import React from "react";
import Image from "next/image";
import styles from "./invitationComponent.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function InvitationComponent({ invitation, auth }) {
  const router = useRouter()

  const accept = async () => {
    let url = "https://localhost:7213/api/Friend/Accept?receiverId=" + invitation.id;
    await fetch(
      url,
      {
        method: "put",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          ...auth,
        },
        credentials: "include",
      },
      { agent }
    ).then((res) => {
      router.reload(window.location.pathname)
    });
  };

  const refuse = async () => {
    let url = "https://localhost:7213/api/Friend/Reject?receiverId=" + invitation.id;
    await fetch(
      url,
      {
        method: "put",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          ...auth,
        },
        credentials: "include",
      },
      { agent }
    ).then((res) => {
      router.reload(window.location.pathname)
    });
  };

  return (
    <div key={invitation.id} className={styles.nearby_user}>
      <div className="row">
        <div className="col-md-2 col-sm-2">
          <Link href={"/profile/" + invitation.id}>
            <Image
              src={invitation.avatar}
              alt={invitation.fullName}
              className={styles.profile_photo_lg}
              width={80}
              height={80}
            />
          </Link>
        </div>
        <div className="col-md-7 col-sm-7">
          <h5>
            <Link href={"/profile/" + invitation.id}>
              <a href="#" className="profile-link">
                {invitation.fullName}
              </a>
            </Link>
          </h5>
          <p>{invitation.work}</p>
        </div>
        <div className="col-md-3 col-sm-3">
          <div className={styles.actionButtons}>
            <FontAwesomeIcon
              className={styles.acceptButton}
              icon={faCheck}
              onClick={accept}
            />
            <FontAwesomeIcon
              className={styles.refuseButton}
              icon={faTimes}
              onClick={refuse}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationComponent;
