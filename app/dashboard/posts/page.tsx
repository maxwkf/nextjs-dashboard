import { Metadata } from 'next';

import { lusitana } from '@/app/ui/fonts';
import { getData } from '@/app/lib/getdata';

export const metadata: Metadata = {
  title: 'Posts',
};

export default async function Page({
}: {
}) {

  const posts = await getData();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Posts</h1>

        {posts.map((post) => {
          return (
            <div key={post.id}>
            <p>{post.title}</p>
            {/* {JSON.stringify(post)} */}
            </div>
          )
        })}
      </div>

    </div>
  );
}