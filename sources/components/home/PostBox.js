import { useIsFocused } from '@react-navigation/native';
import * as React from 'react'
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    console.log('Self content: ' + medialink)
  }


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
    <View>
      <View>
        <Text>{`Posted by ${postauth} on ${subname}`}</Text>
      </View>
      <View>
        <Text>{`${subtitle}`}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
})