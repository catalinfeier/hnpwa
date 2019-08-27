import * as React from 'react'
import {Comment} from './Comment'
import {storiesOf} from '@storybook/react'
import { CommentType } from '../stores/NewsStore';

const comment: CommentType = {
  id: 1234,
  user: 'someUser',
  level: 0,
  time: 1234,
  time_ago: 'long time ago',
  content: 'Basic content with <b>html</b> tag',
  comments: [
    {
      id: 1235,
      user: 'otherUser',
      level: 1,
      time: 1234,
      time_ago: 'some time ago',
      content: 'SOme wonderful content Here. Do not forget about <b>html</b>',
      comments: []
    },
  ]
}

storiesOf("Comment", module)
  .add('Default', () => (
    <Comment comment={comment}/>
  ))
