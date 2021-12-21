import { useIsFocused } from '@react-navigation/native';
import * as React from 'react'
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
    medialink = data.media.reddit_video.scrubber_media_url
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
        <Text>{`${subtitle}`}</Text>
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
    return (
      <Text>{`There will be a vid here soon, link: ${props.medialink}`}</Text>
    )
  } else if (props.mediatype === 'image') {
    return (
      <Text>{`There will be an image here soon, link: ${props.medialink}`}</Text>
    )
  } else if (props.mediatype === 'text') {
    return (
      <Text>{`${props.medialink}`}</Text>
    )
  } else if (props.mediatype === undefined) {
    if (props.medialink != undefined) {
      return (
        <View>
          <Text style={style.texterror}>Can't load the post properly</Text>
          <TouchableOpacity>
            <Text>{`Check to load the full post: ${props.medialink}`}</Text>
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
    fontWeight: 'bold'
  },
  media: {
    paddingTop: 5,
    paddingBottom:  5,
  },
  texterror: {
    fontWeight: 'bold',
    color: 'red'
  }
})