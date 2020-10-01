import React from 'react';
import LoginForm from './Login/LoginForm';
import ProfilePic from './ProfilePic/ProfilePic';

export default function Home({ token, setToken, user, setUser }) {
  console.log(user);
  return (
    <div style={{ margin: '0, 0, 0, 0', padding: '0, 0, 0, 0' }}>
      <div
        style={{
          flexGrow: '1',
          paddingTop: '20vh',
          paddingLeft: '10vw',
          margin: '0, 0, 0, 0',
        }}
      >
        <h3>Welcome to E-folio!</h3>
        <div style={{ width: '36%', paddingTop: '', float: 'left' }}>
          <p>
            E-folio helps you showcase your work with the people in your life.
          </p>
          <ProfilePic
            name="E-folio User"
            targetUserID="5f5b596d77d4db3ac892fe3e"
          />
        </div>
        <div style={{ width: '36%', float: 'right', marginRight: '10%' }}>
          {!token && <LoginForm setToken={setToken} setUser={setUser} user={user} />}
        </div>
      </div>
    </div>
  );
}
