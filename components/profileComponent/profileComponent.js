import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./profile.module.css";

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function ProfileComponent({ user, isMyProfile,auth }) {
  const [awaitfetch, setawaitfetch] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const router = useRouter()

  const logOut = async (e) => {
    await fetch(
      "https://localhost:7213/api/Auth/logout",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...auth
        },
        credentials: "include",
      },
      { agent }
    ).then((res) => {
      setawaitfetch(false);
      router.push('/')
    });
  }

  const submitClick = async (e) => {
    e.preventDefault();
    var { name, description, birthDate, avatar, work } = document.forms[0];
    console.log(description.value == "")
    setawaitfetch(true);
    let res = await fetch(
      "https://localhost:7213/api/User",
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...auth
        },
        credentials: "include",
        body: JSON.stringify({
          id: user.id,
          fullname: name.value != "" ? name.value : user.fullName,
          avatar: avatar.value != "" ? avatar.value : user.avatar,
          work: work.value != "" ? work.value : user.work,
          description:
            description.value != "" ? description.value : user.description,
          birthDate: birthDate.value != "" ? birthDate.value : user.birthDate,
        }),
      },
      { agent }
    ).then((res) => {
      setawaitfetch(false);
      setUpdateProfile(false);
      router.reload(window.location.pathname)
    });
  };

  return (
    <div class="container wrapabout">
      <div class="red"></div>
      <div class="row d-flex justify-content-center">
        {updateProfile ? (
          <form className={styles.updateForm} onSubmit={submitClick}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              className={styles.name}
              placeholder={user.fullName}
              name="name"
            />
            <label className={styles.label}>Profile Picture</label>
            <input
              type="text"
              name="avatar"
              className={styles.avatar}
              placeholder={user.avatar}
            />
            <label className={styles.label}>Description</label>
            <textarea
              rows="3"
              name="description"
              className={styles.description}
              placeholder={
                user.description ? user.description : "write something ..."
              }
            />
            <label className={styles.label}>Work</label>
            <input
              type="text"
              className={styles.work}
              placeholder={user.work}
              name="work"
            />
            <label className={styles.label}>BirthDate</label>
            <input type="date" className={styles.birthdate} name="birthDate" />
          </form>
        ) : (
          <div class="col-lg-6 align-items-center justify-content-center d-flex mb-5 mb-lg-0">
            <div className={styles.blockabout}>
              <div
                className={styles.blockabout_inner}
                class="text-center text-sm-start"
              >
                <div class="title-big pb-1 mb-1">
                  <div class="pb-3 mb-3">
                    {user.fullName && <h3>{user.fullName}</h3>}
                    {user.work && <p>{user.work}</p>}
                  </div>
                  {user.description && <h5>ABOUT ME</h5>}
                </div>
                {user.description && (
                  <p class="description-p text-muted pe-0 pe-lg-0">
                    {user.description}
                  </p>
                )}
                <a href="#" className={styles.rey_btn} class="btn rey-btn mt-3">
                  Invite
                </a>
              </div>
            </div>
          </div>
        )}
        {!updateProfile && (
          <div class="col-lg-4 mt-5 mt-lg-0 d-flex justify-content-center">
            {user.avatar && (
              <Image
                src={user.avatar}
                alt={user.fullName}
                width={500}
                height={500}
              />
            )}
          </div>
        )}

        {isMyProfile && !updateProfile && (
          <div className="d-flex justify-content-center my-4">
            <button
              className="btn btn-primary mt-10"
              onClick={() => setUpdateProfile(true)}
            >
              Update
            </button>
            <button
              className="btn btn-danger mt-10 mx-2"
              onClick={() => logOut()}
            >
              LogOut
            </button>
          </div>
        )}
        {updateProfile && (
          <div className="d-flex justify-content-center my-4">
            <button className="btn btn-primary mx-4" onClick={submitClick}>
              {" "}
              update{" "}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setUpdateProfile(false)}
            >
              {" "}
              cancel{" "}
            </button>
          </div>
        )}

        {awaitfetch && (
          <div class="spinner-border mt-1" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileComponent;
