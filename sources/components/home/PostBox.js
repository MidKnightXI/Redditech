import { useIsFocused } from '@react-navigation/native';
import * as React from 'react'
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Video from 'react-native-video'

import { useAuth } from '../../use-auth';

export default function PostBox(props) {

  const data = props.data

  const subname = data.subreddit_name_prefixed
  const subtitle = data.title
  const postid = data.id
  const postauth = data.author
  const upvotes = data.ups
  const downvotes = data.downs

  const [upvoteState, SetUpvoteState] = useState(null)
  let likes = data.likes

  let mediatype = undefined
  let medialink = undefined

  if (data.post_hint === 'hosted:video') {
    mediatype = 'video'
    medialink = data.media.reddit_video.fallback_url
  } else if (data.post_hint === 'image') {
    mediatype = 'image'
    medialink = data.url
  } else if (data.post_hint === 'self') {
    mediatype = 'text'
    medialink = data.selftext
  } else if (data.post_hint === undefined)
    medialink = data.url
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) SetUpvoteState(likes)
  }, [isFocused]);

  const toggleVote = (voteType) => {
    // voteType:
    // True === upvote
    // False === downvote
    // null === neither up or down
    if (voteType) {
      console.log('upvoted')
      SetUpvoteState(true)
    } else if (!voteType) {
      console.log('downvoted')
      SetUpvoteState(false)
    } else if (voteType === null) {
      console.log('nullvoted')
      SetUpvoteState(null)
    } else {
      console.info('UpVoteSystem: you fucked up dude')
    }
  }

  return (
    <View style={style.postbox}>
      <View>
        <Text style={style.title}>{`Posted by ${postauth} on ${subname}`}</Text>
      </View>
      <View>
        <Text style={{color: 'black'}}>{`${subtitle}`}</Text>
      </View>
      <View style={style.media}>
        <DisplayMedia mediatype={mediatype} medialink={medialink}/>
      </View>
      <View></View>
    </View>
  )
}

function DisplayMedia(props) {
  if (props.mediatype === 'video') {
    const videoRef = React.useRef(null)

    return (
      <Video
        source={{ uri: props.medialink }}
        style={style.video}
        controls={true}
        ref={videoRef} />
    )
  } else if (props.mediatype === 'image') {
    return (
      <Image
        source={{
          uri: props.medialink
        }}
        style={style.image}
      />
    )
  } else if (props.mediatype === 'text') {
    return (
      <Text style={{color: 'black'}}>{`${props.medialink}`}</Text>
    )
  } else if (props.mediatype === undefined) {
    if (props.medialink != undefined) {
      return (
        <View>
          <Text style={style.texterror}>Can't load the post properly</Text>
          <TouchableOpacity>
            <Text style={{color:'black'}}>{`Check to load the full post: ${props.medialink}`}</Text>
          </TouchableOpacity>
        </View>
      )
    } return <Text></Text>
  }
}

const style = StyleSheet.create({
  postbox: {
    padding: 5,
    justifyContent: 'center',
    flex: 1,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#c9c9c9',
  },
  title: {
    fontSize:9,
    fontWeight: 'bold',
    color: 'black'
  },
  media: {
    paddingTop: 5,
    paddingBottom:  5,
  },
  texterror: {
    fontWeight: 'bold',
    color: 'red'
  },
  image: {
    height: 300,
    resizeMode: 'contain',
    borderRadius: 5,
    padding: 5
  },
  video: {
    height: 300,
    borderRadius: 5,
    padding : 5
  }
})