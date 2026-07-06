import PageTitle from '../components/PageTitle'
import { myFeed } from '../data/FeedData'
import FeedView from '../components/FeedView'

const groupByMonth = () => {
  const groups: { label: string; items: typeof myFeed }[] = [];
  for (const item of myFeed) {
    const label = new Date(item.timestamp).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const group = groups.find((g) => g.label === label);
    if (group) group.items.push(item);
    else groups.push({ label, items: [item] });
  }
  return groups;
};

const Feed = () => {
  const groups = groupByMonth();
  let index = 0;

  return (
    <div>
        <PageTitle title='Feed' brief='Brief progress updates, milestones, and lessons from my journey.' />
        <div className='mt-10 space-y-10'>
            {groups.map((group) => (
              <div key={group.label}>
                <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                  {group.label}
                </h2>
                <div>
                  {group.items.map((feed) => (
                    <FeedView
                      key={feed.timestamp}
                      timestamp={feed.timestamp}
                      description={feed.description}
                      title={feed.title}
                      type={feed.type}
                      index={index++}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default Feed
