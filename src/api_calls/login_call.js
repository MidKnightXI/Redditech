/**
*    Source:
*    
*    https://github.com/FormidableLabs/react-native-app-auth/blob/main/docs/config-examples/reddit.md
*
*/

const config = {
    redirectUrl: 'com.myapp://oauth2redirect/reddit', /** ajouter la route sur laquelle reddit va rediriger */
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
  
  // Log in to get an authentication token
  const authState = await authorize(config);  