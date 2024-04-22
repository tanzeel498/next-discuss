import PostCreateForm from '@/components/posts/post-create-form';

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl mb-2 font-bold">{slug}</h1>
      </div>

      <div className="px-2 py-3 border space-y-2">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
