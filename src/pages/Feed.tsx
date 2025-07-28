import PageTitle from '../components/PageTitle'
import { myFeed } from '../data/FeedData'
import FeedView from '../components/FeedView'

const Feed = () => {
  return (
    <div>
        <PageTitle title='Feed' brief='Brief progress updates, milestones, and lessons from my journey.' />
        <div className='mt-12'>
            {myFeed.map((feed) => <FeedView timestamp={feed.timestamp} description={feed.description} title={feed.title} key={feed.timestamp} />)}
        </div>
    </div>
  )
}

export default Feed