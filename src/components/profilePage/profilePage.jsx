import React, {useContext} from 'react';
import {UserContext} from '../providers/UserProvider';
import {auth} from '../../service/firebase';
import './index.css';

export default function ProfilePage() {
  const user = useContext(UserContext);
  const {photoURL, displayName, email} = user;
    return(
        <div className = "ProfilePageBody">
      <div className="Form">
        <div
          style={{
            background:
                `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div>
        <div>
        <h2>{displayName}</h2>
        <h3>{email}</h3>
        </div>
      </div>
      <button class="btn btnSignOut" onClick={_ => {auth.signOut()}}>Sign out</button>
    </div>
  )
}