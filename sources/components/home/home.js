import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useState, useEffect } from 'react';

import { useAuth } from '../../use-auth';
import PostBox from './PostBox';

export default function HomeScreen() {
  const clientStatus = useAuth();
  const [posts, setPosts] = useState([])
  let key = 0

  async function fetchData(sort = 'hot') {
    const data = await clientStatus.request(clientStatus.isSignIn ? `https://oauth.reddit.com/${sort}.json`: `https://reddit.com/${sort}.json`, 'GET')
    const new_posts = data.data.children.filter(p => p.kind === 't3').map(p => p.data)
    setPosts(new_posts);
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused)
      fetchData().then();
  }, [isFocused]);


  return (
    <View style={style.container}>
      <View style={style.buttonbar}>
        <View>
          <TouchableOpacity onPress={() => fetchData('best') }>
            <Text style={style.button}>Best</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => fetchData('new') }>
            <Text style={style.button}>New</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => fetchData('hot') }>
            <Text style={style.button}>Hot</Text>
          </TouchableOpacity>
        </View>
      </View>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {posts.map(element => {
              return (
                <View style={style.postcontainer} key={++key}>
                  <PostBox data={element}/>
                </View>
              )
            })}
          </ScrollView>
        </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    alignItems: 'center',
    flexDirection: 'column'
  },
  buttonbar: {
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 12,
    paddingBottom: 3,
    paddingTop: 6,
    borderWidth: 2,
    borderColor: 'darkorange',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#ffff',
    fontFamily: 'tahoma',
    fontWeight: 'bold',
    color: 'black'
  },
  postcontainer: {
    padding: 8
  }
})