import { authorize } from 'react-native-app-auth';

const config = {
    redirectUrl: 'com.egoapp.auth://oauth2redirect/reddit',
    clientId: 'SutU9k93wGLsYz3qWnHkQg',
    clientSecret: '', // empty string - needed for iOS
    duration: 'permanent',
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
  };
  
async function loginCall() {
  try {
    const token = await authorize(config);
    console.log(token);
    return token;
  } catch(error) {
    console.error(error);
  }
};

export default loginCall;