import React, { useEffect, useState } from "react";
import styles from "./postComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function PostComponent({ post, auth }) {
  const [liked, setliked] = useState(post.isLikedByUser);

  const like = async () => {
    let url = "https://localhost:7213/api/Post/Like?postId=" + post.id;
    await fetch(
      url,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...auth,
        },
        credentials: "include",
      },
      { agent }
    ).then((res) => setliked(!liked));
  };

  return (
    <div key={post.id} className={styles.post}>
      <div className={styles.postHeader}>
        <Link href={"/profile/" + post.authorId}>
          <div className={styles.author}>
            <Image
              src={post.authorAvatar}
              alt={post.authorName}
              className={styles.avatar}
              width={50}
              height={50}
            />
            <h4>{post.authorName}</h4>
          </div>
        </Link>

        <div className={styles.postDate}>
          <h4>{post.createdDate}</h4>
        </div>
      </div>
      {post.content && (
        <Image
          src={post.content}
          alt={post.title}
          className={styles.content}
          width={600}
          height={350}
        />
      )}
      <h4>- {post.title}</h4>
      <p className={styles.description}>{post.description}</p>
      <div className={styles.actions}>
        <FontAwesomeIcon
          className={liked ? styles.icon_liked : styles.icon}
          icon={faHeart}
          onClick={() => like()}
        />
      </div>
    </div>
  );
}

export default PostComponent;
