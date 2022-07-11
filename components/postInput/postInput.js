import React, { useState } from "react";
import styles from "./postInput.module.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function PostInput({ user,auth }) {
  const [contentField, setContentField] = useState(false);

  const submitClick = async (e) => {
    e.preventDefault();

    var {Title, description, content} = document.forms[0]

    const post = {
      "title": Title.value,
      "description":  description.value,
      "content": contentField? content.value:null,
      "authorId": user.id,
    }

    let res = await fetch(
      "https://localhost:7213/api/Post",
      {
        method: "post",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          ...auth
        },
        credentials: "include",
        body: JSON.stringify(post),
      },
      {
        agent
      }
    ).then((res) => {
      Router.push('/')
    }).catch((err) => {
      alert(err)
    })

  }

  return (
    <div className={styles.card}>
      <div className={styles.postHeader}>
        <Link href={"/profile/" + user.id}>
          <div className={styles.author}>
            <Image
              src={user.avatar}
              alt={user.fullName}
              className={styles.avatar}
              width={50}
              height={50}
            />
            <h4>{user.fullName}</h4>
          </div>
        </Link>
      </div>
      <form onSubmit={submitClick}>
        <div className="row px-3 form-group">
          <input
            name="Title"
            type="text"
            className={styles.postTitleInputField}
            placeholder={"Title"}
          />
        </div>
        <div className="row px-3 form-group">
          <textarea
            name="description"
            className={styles.postInputField}
            placeholder={"Hi " + user.fullName + ", what's on your mind today?"}
          ></textarea>
        </div>

        {contentField && (
          <div className="row px-3 form-group">
            <input
              name="content"
              type="text"
              className={styles.postTitleInputField}
              placeholder={"https://example.com"}
            />
          </div>
        )}

        <div className={styles.footer}>
          <FontAwesomeIcon
            className={contentField ? styles.icon_active : styles.icon}
            icon={faImage}
            width={24}
            height={24}
            onClick={() => setContentField(!contentField)}
          />
          <button
            type="submit"
            className={styles.postButton}
            onClick={submitClick}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostInput;
