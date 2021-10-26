// base config
import { authorize } from 'react-native-app-auth';

const login = {
    redirectUrl: 'com.egoapp:/oauth2',
    clientId: 'SutU9k93wGLsYz3qWnHkQg',
    clientSecret: '', // empty string - needed for iOS
    scopes: ['identity'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
      tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    },
    customHeaders: {
      token: {
        Authorization: 'Basic YjU2SmluM0I4MmRwclpwSDdFMWozQToK',
      },
    },
  };

async function callRedApi() {
  try {
      const tmp = await authorize(login);
  } catch(error) {
    console.error(error);
  }
  console.log(tmp);
  return tmp;
}

export default callRedApi();