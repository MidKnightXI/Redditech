import { authorize } from 'react-native-app-auth';

// base config
const login = {
    redirectUrl: 'com.redditech://auth',
    clientId: '<b56Jin3B82dprZpH7E1j3A>',
    clientSecret: '', // empty string - needed for iOS
    scopes: ['identity'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
      tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    },
    customHeaders: {
      token: {
        Authorization: 'Basic <base64encoded clientID:YjU2SmluM0I4MmRwclpwSDdFMWozQQo=>',
      },
    },
  };

export default login;