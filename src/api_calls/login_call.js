/**
*    Source:
*    
*    https://github.com/FormidableLabs/react-native-app-auth/blob/main/docs/config-examples/reddit.md
*
*/

import { authorize } from 'react-native-app-auth';

// base config
const config = {
    redirectUrl: 'com.EgoApp://oauth2redirect/reddit',
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

// use the client to make the auth request and receive the authState
const result = await authorize(config);

export default result;