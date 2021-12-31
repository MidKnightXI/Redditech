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

  const switchARA = async () => {
    settingsData.activity_relevant_ads = !activityRelevantAds
    setActivityRelevantAds(previousState => !previousState)
    await clientStatus.patch('https://oauth.reddit.com/api/v1/me/prefs', settingsData);
  }
  const switchClicktracking = async () => {
    settingsData.allow_clicktracking = !clicktacking
    setClicktracking(previousState => !previousState)
    await clientStatus.patch('https://oauth.reddit.com/api/v1/me/prefs', settingsData);
  }
  const switchBeta = async () => {
    settingsData.beta = !beta
    setBeta(previousState => !previousState)
    await clientStatus.patch('https://oauth.reddit.com/api/v1/me/prefs', settingsData);
  }
  const switchDPA = async () => {
    settingsData.third_party_data_personalized_ads = !dataPersonalizedAds
    setDataPersonalizedAds(previousState => !previousState)
    await clientStatus.patch('https://oauth.reddit.com/api/v1/me/prefs', settingsData);
  }
  const switchPersonalizedAds = async () => {
    settingsData.third_party_personalized_ads = !personalizedAds
    setPersonalizedAds(previousState => !previousState)
    await clientStatus.patch('https://oauth.reddit.com/api/v1/me/prefs', settingsData);
  }
  const switchSDPA = async () => {
    settingsData.third_party_site_data_personalized_ads = !siteDataPersonalizedAds
    setSiteDataPersonalizedAds(previousState => !previousState)
    await clientStatus.patch('https://oauth.reddit.com/api/v1/me/prefs', settingsData);
  }
  const switchSDPC = async () => {
    settingsData.third_party_site_data_personalized_content = !siteDataPersonalizedContent
    setSiteDataPersonalizedContent(previousState => !previousState)
    await clientStatus.patch('https://oauth.reddit.com/api/v1/me/prefs', settingsData);
  }

  return (
    <View style={style.container}>
      <View>
        <View style={style.switch}>
          <Text>Activity relevant ads</Text>
          <Switch
            onValueChange={switchARA}
            value={activityRelevantAds}
          />
        </View>
        <View style={style.switch}>
          <Text>Clicktracking</Text>
          <Switch
            onValueChange={switchClicktracking}
            value={clicktacking}
          />
        </View>
        <View style={style.switch}>
          <Text>Reddit beta</Text>
          <Switch
            onValueChange={switchBeta}
            value={beta}
          />
        </View>
        <View style={style.switch}>
          <Text>Data personalized ads</Text>
          <Switch
            onValueChange={switchDPA}
            value={dataPersonalizedAds}
          />
        </View>
        <View style={style.switch}>
          <Text>Personalized ads</Text>
          <Switch
            onValueChange={switchPersonalizedAds}
            value={personalizedAds}
          />
        </View>
        <View style={style.switch}>
          <Text>Site data personalized ads</Text>
          <Switch
            onValueChange={switchSDPA}
            value={siteDataPersonalizedAds}
          />
        </View>
        <View style={style.switch}>
          <Text>Site data personalized content</Text>
          <Switch
            onValueChange={switchSDPC}
            value={siteDataPersonalizedContent}
          />
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  switch: {
    flexDirection: 'row'
  }
})
