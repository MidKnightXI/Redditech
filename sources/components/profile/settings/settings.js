import * as React from 'react'
import { View, Text, Switch, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { useAuth } from '../../../use-auth';

export default function Settings() {
  const clientStatus = useAuth();
  const [settingsData, setSettingsData] = useState({
    "activity_relevant_ads": false,
    "allow_clicktracking": false,
    "beta": false,
    "third_party_data_personalized_ads": false,
    "third_party_personalized_ads": false,
    "third_party_site_data_personalized_ads": false,
    "third_party_site_data_personalized_content": false,
  })

  const [activityRelevantAds, setActivityRelevantAds] = useState(false)
  const [clicktacking, setClicktracking] = useState(false)
  const [beta, setBeta] = useState(false)
  const [dataPersonalizedAds, setDataPersonalizedAds] = useState(false)
  const [personalizedAds, setPersonalizedAds] = useState(false)
  const [siteDataPersonalizedAds, setSiteDataPersonalizedAds] = useState(false)
  const [siteDataPersonalizedContent, setSiteDataPersonalizedContent] = useState(false)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      clientStatus.request('https://oauth.reddit.com/api/v1/me/prefs', 'GET').then(data => {
        setSettingsData(data)
        setActivityRelevantAds(data.activity_relevant_ads)
        setClicktracking(data.allow_clicktracking)
        setBeta(data.beta)
        setDataPersonalizedAds(data.third_party_data_personalized_ads)
        setPersonalizedAds(data.third_party_personalized_ads)
        setSiteDataPersonalizedAds(data.third_party_site_data_personalized_ads)
        setSiteDataPersonalizedContent(data.third_party_site_data_personalized_content)
      })
    }
  }, [isFocused])

  const toggleSwitchState = async (obj) => {
    settingsData[obj] = !settingsData[obj]
    await clientStatus.patch('https://oauth.reddit.com/api/v1/me/prefs', settingsData)
    console.log('change value for ' + obj)
    changeState(obj)
  }

  const changeState = (obj) => {
    switch (obj) {
      case 'activity_relevant_ads':
        setActivityRelevantAds(prevState => !prevState)
        break;
      case 'allow_clicktracking':
        setClicktracking(prevState => !prevState)
        break;
      case 'beta':
        setBeta(prevState => !prevState)
        break;
      case 'third_party_data_personalized_ads':
        setDataPersonalizedAds(prevState => !prevState)
        break;
      case 'third_party_personalized_ads':
        setPersonalizedAds(prevState => !prevState)
        break;
      case 'third_party_site_data_personalized_ads':
        setSiteDataPersonalizedAds(prevState => !prevState)
        break;
      case 'third_party_site_data_personalized_content':
        setSiteDataPersonalizedContent(prevState => !prevState)
        break;
      default:
        break;
    }
  }

  return (
    <View style={style.container}>
      <SafeAreaView>
        <FlatList>
          <View></View>
        </FlatList>
      </SafeAreaView>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
