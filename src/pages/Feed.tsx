import PageTitle from '../components/PageTitle'
import { myFeed } from '../data/FeedData'
import FeedView from '../components/FeedView'

const Feed = () => {
  return (
    <div>
        <PageTitle title='Feed' brief='Brief progress updates, milestones, and lessons from my journey.' />
        <div className='mt-8'>
            {myFeed.map((feed, i) => (
              <FeedView
                key={feed.timestamp}
                timestamp={feed.timestamp}
                description={feed.description}
                title={feed.title}
                icon={feed.icon}
                type={feed.type}
                index={i}
                isLast={i === myFeed.length - 1}
              />
            ))}
        </div>
    </div>
  )
}

export default Feed
