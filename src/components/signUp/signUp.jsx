import React, { useCallback } from 'react';
import { withRouter } from "react-router-dom";
import {auth, signInWithGoogle, generateUserDocument} from '../../service/firebase.js';
import {Link} from 'react-router-dom';
import './index.css';

 const SignUp = ({history}) => {
        const handleSignUp = useCallback(async event => {
            event.preventDefault();
            const {displayName, email, password} = event.target.elements;
            try {
                const {user} = await auth.createUserWithEmailAndPassword(email.value, password.value);
                history.push("/");
                generateUserDocument(displayName.value, user);
            } catch (error) {
                alert(error);
            }
        }, [history]);
    return(
        <div>
            <h1 className="SignInText">Sign Up</h1>
            <div className="SignInWindow">
                <form className="SignInForm" onSubmit={handleSignUp}>
                    <label className="labelText">
                        Display Name: 
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="E.g: Farug"
                        id="displayName"
                    />
                    <label className="labelText">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="inputData"
                        placeholder="E.g: faruq123@gmail.com"
                    />
                    <label className="labelText">
                        Password:    
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="inputData"
                        placeholder="Your Password"
                    />
                    <button type="submit" className="btn btnSignUp">
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
                    Sign up with Google
                </button>
                <div className="NewAccount">
                Already have an account?{" "}
                    <Link to="/signIn">
                        Sign in here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SignUp);
