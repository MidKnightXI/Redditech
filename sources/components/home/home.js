import { View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useState, useEffect } from 'react';

import { useAuth } from '../../use-auth';
import PostBox from './PostBox';

export default function HomeScreen() {
  const clientStatus = useAuth();
  let [posts, setPosts] = useState([])
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
        <View style={style.button}>
          <TouchableOpacity onPress={() => fetchData('best') }>
            <Text>Best</Text>
          </TouchableOpacity>
        </View>
        <View style={style.button}>
          <TouchableOpacity onPress={() => fetchData('new') }>
            <Text>New</Text>
          </TouchableOpacity>
        </View>
        <View style={style.button}>
          <TouchableOpacity onPress={() => fetchData('hot') }>
            <Text>Hot</Text>
          </TouchableOpacity>
        </View>
      </View>
        <View style={style.posts}>
          <ScrollView>
            {posts.map(element => {
              return (
                <TouchableOpacity key={key++}>
                  <PostBox data={element}/>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    flexDirection: "column"
  },
  buttonbar: {
    flexDirection: "row",
    flex: 1,
  },
  button: {
    padding: 10
  },
  posts: {
    flex: 8,
    flexDirection: "column",
    padding: 30
  },
})