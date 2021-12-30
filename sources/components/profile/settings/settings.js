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
    await clientStatus.patch('https://oauth.reddit.com/api/v1/me/prefs', settingsData);
    setActivityRelevantAds(previousState => !previousState)
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
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  switch: {
    flexDirection: 'row'
  }
})
