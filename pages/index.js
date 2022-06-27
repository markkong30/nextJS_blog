import Head from "next/head";
import PostCard from "../components/PostCard";
import Categories from "../components/Categories";
import PostWidget from "../components/PostWidget";

export default function Home() {
  const posts = [
    { title: 'React Test', excerpt: 'Learn JEST' },
    { title: 'React with NextJS', excerpt: 'Learn NextJS' }
  ]

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, i) => (
            <PostCard post={post} key={i} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
