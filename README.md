# WARNING
react-native-video may output an error when building the app.

To fix this go to:
>node_modules/react-native-video/android-exoplayer/build.gradle

Change in the `build.gradle` every `2.13.2` by `2.13.3`

This bug has already been reported to the devs of react-native-video but isn't fixed on the version we are using.