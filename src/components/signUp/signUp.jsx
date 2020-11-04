import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {auth, signInWithGoogle, generateUserDocument} from "../../service/firebase";
import './index.css';
import firebase from "firebase";

export default function SignUp() {
    // console.log(firebase.auth().createUserWithEmailAndPassword("sveten_s@mail.ru", "123456"));
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [displayName, setDisplayName] = useState('');
        const [error, setError] = useState(null);
        const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
            event.preventDefault();
            try{
                const {user} = await auth.createUserWithEmailAndPassword("sveten_s@mail.ru", "123456").then(_ => console.log('true')).catch(_ => console.log("ERRRRROOOOR"));
                console.log("generateUserDocument");
                generateUserDocument(user, "GitRonin");
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
            if(name === "userEmail") setEmail(value);
            if(name === "userPassword") setPassword(value);
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
                        id="displayName"
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
