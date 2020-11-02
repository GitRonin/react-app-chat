import React, {useState, useContext} from 'react';
import {auth} from '../../service/firebase';
import {UserContext} from '../providers/UserProvider';
import {Link} from "react-router-dom";
import './index.css';

export default function PasswordReset() {
    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") setEmail(value);
    };
  const sendResetEmail = event => {
    event.preventDefault();
    auth
    .sendPasswordResetEmail(email)
    .then(_ => {
      setEmailHasBeenSent(true);
      setTimeout(_ => {setEmailHasBeenSent(false)},3000);
    })
    .catch(_ => {
      setError("Error resetting password");
    });
  };
    return(
        <div>
      <h1 className="Generalltext">
        Reset your Password
      </h1>
      <div className="PasswordResetBody">
        <form action="">
          {emailHasBeenSent && (
            <div className="">
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div className="">
              {error}
            </div>
          )}
          <label htmlFor="userEmail" className="">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Input your email"
            onChange={onChangeHandler}
            className=""
          />
          <button
            className="btn btnsSendLink"
            onClick={event => {
              sendResetEmail(event);
            }}
          >
            Send me a reset link
          </button>
        </form>
        <Link
         to ="/"
          className=""
        >
          &larr; back to sign in page
        </Link>
      </div>
    </div>
    )
}