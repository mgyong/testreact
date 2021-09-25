import * as React from 'react';
import {useState} from 'react';
import {ProfileContainer} from "./Profile";


const Profile= (props) => {
    const [username, setUsername] = useState('Schiller97702');
return(
    <ProfileContainer username={username}/>
);
}

export default Profile;