import React from 'react'
import {observer} from 'mobx-react'
import NewsStore, { NewsItem } from '../stores/NewsStore'

export const TopStories: React.FC<{store: NewsStore}> = observer((props) => {
    console.log('props,', props)
    if(!props.store) return <div>fuuu</div>
    const {isLoading, news} = props.store
    if(isLoading) return <div>Loading...</div>
    return <div>{news.map((newsItem:NewsItem) => <div key={newsItem.id}>{newsItem.title}</div>)}</div>
})
