import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../service/firebase";

export const UserContext = createContext({ user: null });
export default function UserProvider(props) {
  const [state, setState] = useState({user: null}); 
  useEffect(_ => {
      auth.onAuthStateChanged(userAuth => {
        setState({ user: userAuth});
        });
    }, []);

    return (
      <UserContext.Provider value={state.user}>
        {props.children}
      </UserContext.Provider>
    );
}