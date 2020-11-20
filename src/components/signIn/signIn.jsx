import React, {useCallback, useContext} from 'react';
import {withRouter, Redirect, Link} from "react-router-dom";
import {auth, signInWithGoogle} from '../../service/firebase.js';
import {AuthContext} from '../Auth.js';
import './index.css';

const SignIn = ({ history }) => {
    const handleSignIn = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try{
                await auth
                .signInWithEmailAndPassword(email.value, password.value);
                history.push('/');
            } catch(error) {
                alert(error);
            }
        }, [history]
    );

    const {currentUser} = useContext(AuthContext);
    if(currentUser) return <Redirect to="/" />

    return(
        <div>
            <h1 className="SignInText">Sign In</h1>
            <div className="SignInWindow">
                <form className="SignInForm" onSubmit={handleSignIn}>
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
                    <button type="submit" className="btn btnSignIn">
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

export default withRouter(SignIn);