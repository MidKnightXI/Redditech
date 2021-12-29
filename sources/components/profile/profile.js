import { View, Text, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native'
import * as React from 'react'
import {useIsFocused} from '@react-navigation/native';
import { useState, useEffect} from 'react';
import { useAuth } from '../../use-auth';

export default function Profile() {
  const clientStatus = useAuth()
  const [profileData, setProfileData] = useState({})
  const isFocused = useIsFocused()

  // banner === "banner_img"
  // profile pic === "icon_img"
  // description === "subreddit.public_description"
  useEffect(() => {
    if (isFocused)
      clientStatus.request('https://oauth.reddit.com/api/v1/me', 'GET').then(data => {
        setProfileData(data)
      })
  }, [isFocused])

  return (
    <View style={style.container}>

    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})