import React from "react";
import Image from "next/image";
import styles from "./UserCard.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});


function UserCard({id, name, avatar, work, description, auth }) {
  const router = useRouter()

  const invite = async () => {
    let url = "https://localhost:7213/api/Friend/Invite?receiverId="+id;
    await fetch(url , {
      method: "post",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
        ...auth
      },
      credentials: "include",
    }, 
    {agent})
    .then((res) => {
      router.reload(window.location.pathname)
    })
  }

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Image
          src={avatar}
          alt={name}
          width={100}
          height={100}
          className={styles.avatarImage}
        />
      </div>
      <Link href={'/profile/'+id}>
        <h2>{name}</h2>
      </Link>
      <h4>{work}</h4>
      <p className={styles.description}>{description.slice(0,80) + " ..."}</p>
      <button className={styles.inviteButton} onClick={invite}>invite</button>
    </div>
  );
}

export default UserCard;
