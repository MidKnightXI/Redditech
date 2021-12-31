import * as React from 'react';
import {
  View, Text, ScrollView, SafeAreaView,
  StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { useAuth } from '../../use-auth';

export default function Search() {
  const clientStatus = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [autoCompleteQuery, setAutoCompleteQuery] = useState([])
  let key = 0

  const autoComplete = async (txt) => {
    setSearchQuery(txt)
    const res = await clientStatus.request(
      'https://oauth.reddit.com/api/subreddit_autocomplete_v2?include_profiles=false&limit=5&query=' +
      encodeURI(txt), 'GET')
    setAutoCompleteQuery(res.data.children)
  }

  return (
    <View>
      <SearchBar
        searchIcon={{size: 23}}
        onChangeText={(txt) => autoComplete(txt)}
        onClear={() => setSearchQuery('')}
        placeholder='Search'
        value={searchQuery}
        lightTheme={true}
        round={true}
      />
      <View>
        {autoCompleteQuery.map(element => {
          if (element.kind === 't5') {
            return (
              <View>
                <SubredditBox data={element.data} key={++key}/>
              </View>
            )
          }
        })}
      </View>
    </View>
  )
}

function SubredditBox(props) {
  return (
    <View style={style.subBox}>
      <View style={style.iconContainer}>
        <Image
          source={{uri: props.data.icon_img || 'https://www.nicepng.com/png/full/331-3319287_planet-with-rings-app-store-icon-logo-vector.png'}}
          style={style.icon}
        />
      </View>
      <View style={style.infoContainer}>
        <Text>{props.data.display_name}</Text>
        <Text>{props.data.subscribers+' subscriber(s)'}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'red'
  },
  content: {
    alignItems: 'flex-start'
  },
  subBox: {

    flexDirection: 'row',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 4
  },
  iconContainer: {
    alignItems: 'center',
    flex: 2
  },
  icon: {
    width: 25,
    height: 25,
    borderRadius: 25/2
  }
})