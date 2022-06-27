import Head from "next/head";
import PostCard from "../components/PostCard";
import Categories from "../components/Categories";
import PostWidget from "../components/PostWidget";
import { fetchPosts } from "../graphQL";

export default function Home({ posts }) {
	return (
		<div className="container mx-auto px-10 mb-8">
			<Head>
				<title>CMS Blog</title>
			</Head>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1">
					{posts.map((post, i) => (
						<PostCard post={post.node} key={i} />
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

export const getStaticProps = async () => {
	const posts = (await fetchPosts()) || [];

	return {
		props: { posts },
	};
};
