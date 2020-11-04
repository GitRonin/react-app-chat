import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {auth, signInWithGoogle} from '../../service/firebase';
import './index.css';
export default function SignIn() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState(null);
        const signInWithEmailAndPasswordHandler = (event, email, password) => {
            event.preventDefault();
            auth.signInWithEmailAndPassword(email, password).catch(error => {
                setError("Error singning in with password and email!");
                console.error("Error singning in with password and email!", error);
            });
        };
        const onChangeHandler = event => {
            const {name, value} = event.currentTarget;
            if(name === "userEmail") setEmail(value);
            if(name === "userPassword") setPassword(value);
        };
    return(
        <div>
            <h1 className="SignInText">Sign In</h1>
            <div className="SignInWindow">
                {error !== null && <div className="">{error}</div>}
                <form className="SignInForm">
                    <label htmlFor="userEmail" className="labelText">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="userEmail"
                        className="inputData"
                        value={email}
                        placeholder="E.g: faruq123@gmail.com"
                        id="userEmail"
                        onChange={event => onChangeHandler(event)}
                    />
                    <label htmlFor="userPassword" className="labelText">
                        Password:    
                    </label>
                    <input
                        type="password"
                        name="inputData"
                        className="inputData"
                        value={password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange = {event => onChangeHandler(event)}
                    />
                    <button className="btn btnSignIn" onClick={event => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                        Sign in
                    </button>
                </form>
                <p className="SignTextOr">or</p>
                <button
                    className="btn btnSignInWithGoogle"
                    onClick={_ => {signInWithGoogle()}}>
                    Sign in with Google
                </button>
                <div className="NewAccount">
                    Don't have an account?{" "}
                    <Link to="signUp">
                        Sign up here
                    </Link>{" "}
                        <br/>{" "}
                    <Link to="passwordReset">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
};
