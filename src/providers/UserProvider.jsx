import React, { createContext, useEffect, useState } from "react";
import { auth } from "../service/firebase";

export const UserContext = createContext({ user: null });
export default function UserProvider(props) {
  const [state, setState] = useState({user: null}); 
  useEffect(_ => {
      auth.onAuthStateChanged(userAuth => {
        setState({ user: userAuth});
        });
    }, []);
    const { user } = state;
    return (
      <UserContext.Provider value={user}>
        {props.children}
      </UserContext.Provider>
    );
}