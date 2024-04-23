import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicsList from '@/components/topics/topics-list';
import PostList from '@/components/posts/post-list';
import { Divider } from '@nextui-org/divider';
import { fetchTopPosts } from '@/db/queries/posts';

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>

      <div className="border px-2 py-3 space-y-2">
        <TopicCreateForm />
        <Divider />
        <h3 className="text-lg">Topics</h3>
        <TopicsList />
      </div>
    </div>
  );
}
