import * as React from 'react'
import {View, Text} from 'react-native'
import { authorize } from 'react-native-app-auth';

const config = {
  redirectUrl: 'com.egoapp.auth://oauth2redirect/reddit',
  clientId: 'SutU9k93wGLsYz3qWnHkQg',
  clientSecret: '', // empty string - needed for iOS
  scopes: ['identity'],
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

async function callApi() {
  try {
    const tmp = await authorize(config);
    console.log(tmp)
  } catch(error) {
    console.error(error);
  }
};

function App() {
  callApi()
  return (
    <View>
      <Text>this is a test</Text>
    </View>
  );
}

export default App;