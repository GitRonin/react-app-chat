import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {auth, signInWithGoogle, generateUserDocument} from "../../service/firebase";
import './index.css';

export default function SignUp() {
        const [email, setEmail] = useState(String);
        const [password, setPassword] = useState(String);
        const [displayName, setDisplayName] = useState(String);
        const [error, setError] = useState(null);
        const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
            event.preventDefault();
            try{
                const {user} = await auth.createUserWithEmailAndPassword(email, password).catch(_ => console.log("ERRRRROOOOR"));
                generateUserDocument(user, {displayName});
                console.log("generateUserDocument");
            }
            catch(error){
                setError('Error Singning up with email and password');
            }
            setEmail("");
            setPassword("");
            setDisplayName("");
        };
        const onChangeHandler = event => {
            const {name, value} = event.currentTarget;
            if(name === "useEmail") setEmail(value);
            if(name === "usePassword") setPassword(value);
            if(name === "displayName") setDisplayName(value);
        };
    return(
        <div>
            <h1 className="SignInText">Sign Up</h1>
            <div className="SignInWindow">
                {error !== null && <div className="">{error}</div>}
                <form className="SignInForm">
                <label htmlFor="displayName" className="labelText">
                        Display Name:
                    </label>
                    <input
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="E.g: Farug"
                        id="userEmail"
                        onChange={event => onChangeHandler(event)}
                    />
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
                        name="userPassword"
                        className="inputData"
                        value={password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange = {event => onChangeHandler(event)}
                    />
                    <button className="btn btnSignUp" onClick={event => {createUserWithEmailAndPasswordHandler(event, email, password)}}>
                        Sign up
                    </button>
                </form>
                <p className="SignTextOr">or</p>
                <button
                    className="btn btnSignUpWithGoogle"
                    onClick={_ => {
                        try{
                            signInWithGoogle();
                        }
                        catch(error){
                            console.error("Error singning in with Google", error);
                        }
                    }}>
                    Sign in with Google
                </button>
                <div className="NewAccount">
                Already have an account?{" "}
                    <Link to="/">
                        Sign up here
                    </Link>
                </div>
            </div>
        </div>
    );
};
