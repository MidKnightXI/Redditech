import React, { useState, useEffect, useContext, createContext } from "react";
import { authorize } from 'react-native-app-auth';


const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [token, setToken] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);

  const signin = async () => {
    const config = {
      redirectUrl: 'com.egoapp.auth://oauth2redirect/reddit',
      clientId: 'SutU9k93wGLsYz3qWnHkQg',
      clientSecret: '', // empty string - needed for iOS
      scopes: ['identity', 'edit', 'history', 'mysubreddits', 'privatemessages', 'read', 'report', 'submit', 'subscribe', 'vote'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
        tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
      },
      customHeaders: {
        token: {
          Authorization: 'Basic U3V0VTlrOTN3R0xzWXozcVduSGtRZwo=',
        },
      },
      additionalParameters: {duration: 'permanent'},
    };
    try {
      const tmp = await authorize(config);
      setToken(tmp.accessToken);
      setIsSignIn(true);
      return tmp;
    } catch(error) {
      console.error(error);
      setToken(null);
      setIsSignIn(false);
      return null;
    }
  }

  const request = async (url, method) => {
    const config = {
      method: `${method}`,
      headers: url.includes('oauth') ? {
        "Authorization": "bearer " + token
      } : undefined,
      "User-agent": "Ego",
    }
    const res = await fetch(url, config)
    const data = await res.json()
    if (data.error)
      throw data.message;
    return data;
  }

  const patch = async (url, body) => {
    const config = {
      method: 'PATCH',
      headers: url.includes('oauth') ? {
          "Authorization": "bearer " + token, Accept: 'application/json',
          "Content-Type": 'application/json',
      } : undefined,
      "User-agent": "Ego",
      body: JSON.stringify(body)
    }
    try {
      await fetch(url, config)
    } catch (error) {
      console.error(error)
    }
  }

  const voteRequest = async (postid, voteType) => {
    let form = new FormData()
    form.append('id', postid)
    if (voteType === true)
      form.append('dir', 1)
    else if (voteType === false)
      form.append('dir', -1)
    else if (voteType === null)
      form.append('dir', 0)
    else
      console.info('voteRequest: you fucked up with something dude')
    const config = {
      method: 'POST',
      headers: {"Authorization": "bearer " + token},
      "User-agent": "Ego",
      body: form
    }
    try {
      const tmp = await fetch('https://oauth.reddit.com/api/vote', config)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    token,
    isSignIn,
    signin,
    request,
    patch,
    voteRequest,
  };
}