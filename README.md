# WARNING
react-native-video may output an error when building the app.

To fix this go to:
>node_modules/react-native-video/android-exoplayer/build.gradle

Change in the `build.gradle` every `2.13.2` by `2.13.3`

This bug has already been reported to the devs of react-native-video but and we fixed it by ourselves.

## Setup

First you need to [configure your Android emulator](https://reactnative.dev/docs/environment-setup#development-os)

- Fix the bug called above
- Install dependencies with `yarn install` or `npm install`.
- Open a shell and run `yarn react-native start` or `npm react-native start`.
- Open a new shell and execute `yarn react-native run-android` or `npm react-native run-android`
- Enjoy 🥰

### Info

You won't be able to connect with your Reddit because I deleted the app on Reddit, if you want to test it put your own infos in `sources/use-auth.js`

```js
. . .

function useProvideAuth() {

. . .

  const config = {
    . . .
    
    clientId: '<clientID>',
    
    . . .
    
  customHeaders: {
    token: {
      Authorization: 'Basic <base64encoded clientID:>',
    },
  },
}
```
