import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import * as React from 'react'
import {useIsFocused} from '@react-navigation/native';
import { useState, useEffect} from 'react';
import { useAuth } from '../../use-auth';

export default function Profile() {
  const clientStatus = useAuth()
  const [profileData, setProfileData] = useState({
    "icon_img": "https://upload.wikimedia.org/wikipedia/fr/5/58/Reddit_logo_new.svg",
    "banner_img": "https://upload.wikimedia.org/wikipedia/fr/5/58/Reddit_logo_new.svg",
    "public_description": "Description can't be loaded",
    "display_name_prefixed": "u/user",
    "subscribers": 0,
  })
  const [karma, setKarma] = useState(0)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused)
      clientStatus.request('https://oauth.reddit.com/api/v1/me', 'GET').then(data => {
        setProfileData(data.subreddit)
        setKarma(data.total_karma)
      })
    }, [isFocused])

  return (
    <View style={style.container}>
      <View style={style.banner_container}>
        <ImageBackground
        source={{uri: profileData.banner_img.replace(/&amp;/g, "&")}}
        resizeMode='cover'
        style={{flex:1}}
        imageStyle={style.banner_image}
        >
          <View style={style.banner_content}>
            <Image
              source={{uri: profileData.icon_img.replace(/&amp;/g, "&")}}
              resizeMode='contain'
              style={style.profile_pic}
            />
            <Text style={style.username}>{profileData.display_name_prefixed.replace('u/','')}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={style.user_infos}>
        <Text style={style.text_infos}>{profileData.subscribers + ' subscriber(s)'}</Text>
        <Text style={style.text_infos}>{profileData.display_name_prefixed + ' | ' + karma + ' karma'}</Text>
        <Text style={style.text_infos}>{profileData.public_description}</Text>
      </View>
      <View style={{flex: 4}}></View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner_container: {
    flex: 4,
  },
  banner_image: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  banner_content: {
    paddingTop: 75,
    paddingLeft: 20,
    flexDirection: 'column'
  },
  profile_pic: {
    height: 100,
    width: 100,
    borderRadius: 100/2
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 6,
    color: 'black',
  },
  user_infos: {
    flex: 3,
    paddingTop: 10,
    paddingLeft: 15,
  },
  text_infos: {
    fontSize: 11,
    color: 'black',
  }
})