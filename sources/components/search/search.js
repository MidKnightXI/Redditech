import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { useAuth } from '../../use-auth';

export default function Search() {
  const clientStatus = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [autoCompleteQuery, setAutoCompleteQuery] = useState([])

  const autoComplete = async (txt) => {
    setSearchQuery(txt)
    const res = await clientStatus.request(
      'https://oauth.reddit.com/api/subreddit_autocomplete_v2?include_profiles=false&limit=10&query=' +
      encodeURI(txt), 'GET')
    setAutoCompleteQuery(res.data.children)
  }

  return (
    <View style={style.containter}>
      <SearchBar
        searchIcon={{ size: 24 }}
        onChangeText={(txt) => autoComplete(txt)}
        onClear={() => setSearchQuery('')}
        placeholder='Search'
        value={searchQuery}
        lightTheme={true}
        round={true}
      />
      <View style={style.content}/>
    </View>
  )
}

const style = StyleSheet.create({
  containter: {
    flex: 1
  },
  content: {
    flex: 10,
  }
})