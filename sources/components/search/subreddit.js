import * as React from 'react';
import { ScrollView, View, Text, StyleSheet,ImageBackground, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';


import { useAuth } from '../../use-auth';
import PostBox from '../home/PostBox';
import { Switch } from 'react-native-paper';

export default function Subreddit({route, navigation}) {
  const clientStatus = useAuth()
  const data = route.params.data
  const [posts, setPosts] = useState([])
  const [isSubbed, setIsSubbed] = useState(data.user_is_subscriber)

  const fetchDataSub = async (sort = 'hot') => {
    const tmp = await clientStatus.request(`https://reddit.com${data.url}${sort}.json`, 'GET')
    const new_posts = tmp.data.children.filter(p => p.kind === 't3').map(p => p.data)
    setPosts(new_posts);
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused)
      fetchDataSub().then();
  }, [isFocused]);

  let key = 0

  const switchSubscription = () => {
    setIsSubbed(previousState => !previousState)
    clientStatus.subscribeRequest(data.name, isSubbed)
  }

  return (
    <View>
      <ImageBackground
        source={{uri: data.banner_background_image.replace(/&amp;/g, '&') || 'https://styles.redditmedia.com/t5_2qhxg/styles/bannerBackgroundImage_0ctqbl6s16x11.jpg'}}
        style={style.subbanner}
        resizeMode='cover'
      >
        <View style={style.buttonbar}>
          <View>
            <TouchableOpacity onPress={() => fetchDataSub('best') }>
              <Text style={style.button}>Best</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => fetchDataSub('new') }>
              <Text style={style.button}>New</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => fetchDataSub('hot') }>
              <Text style={style.button}>Hot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <SafeAreaView>
        <ScrollView>
          <View style={style.subbasics}>
            <Image
              source={{uri: data.community_icon.replace(/&amp;/g, '&') || 'https://www.nicepng.com/png/full/331-3319287_planet-with-rings-app-store-icon-logo-vector.png'}}
              style={style.subicon}
              resizeMode='contain'
            />
            <Text style={style.subname}>{'r/' + data.display_name}</Text>
            <Switch
              onValueChange={switchSubscription}
              value={isSubbed}
            />
          </View>
          <View style={style.subinfos}>
            <Text style={style.subnumbers}>{data.subscribers + 'subscriber(s)'}</Text>
            <Text style={style.subdescription}>{data.public_description}</Text>
          </View>
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
  )
}

const style = StyleSheet.create({
  buttonbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
  subbanner: {
    alignItems:'center',
    height: 50,
    paddingLeft: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  subbasics: {
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscribe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subicon: {
    height: 25,
    width: 25,
    borderRadius: 25/2
  },
  subname: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 6,
    paddingLeft: 5,
    color: 'black',
  },
  subinfos: {
    paddingLeft: 15
  },
  subnumbers: {
    fontSize: 12,
  },
  subdescription: {
    fontSize: 12,
    color: 'black'
  },
  postcontainer: {
    padding: 8
  }
})