import { useIsFocused } from '@react-navigation/native';
import * as React from 'react'
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAuth } from '../../use-auth';

export default function PostBox(props) {
  const data = props.data
  let [isUpvoted, SetIsUpvoted] = useState(false)
  let [isDownvoted, SetIsDownvoted] = useState(false)
  const subname = data.subreddit_name_prefixed
  const subtitle = data.title
  const postid = data.id
  const postauth = data.author

  let mediatype = undefined
  let mediaval = undefined

  if (data.post_hint === 'hosted:video') {
    mediatype = 'video'
    mediaval = data.media.reddit_video.scrubber_media_url
    console.log(`MediaValue: ${mediaval}`)
  } else if (data.post_hint === 'image') {

  } else if (data.post_hint === 'self') {

  } else {
    console.log(`So wtf is ${data.post_hint} then huh ??!!`)
  }


  const isFocused = useIsFocused()

  return (
    <View>
      <Text>test</Text>
    </View>
  )
}

const style = StyleSheet.create({
})