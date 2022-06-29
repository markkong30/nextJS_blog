import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { fetchRecentPosts, fetchSimilarPosts } from '../graphQL';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      fetchSimilarPosts(categories, slug)
        .then(data => setRelatedPosts(data))
    } else {
      fetchRecentPosts()
        .then(data => setRelatedPosts(data))
    }
  }, [slug])

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-gray-800'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map(post => (
        <div key={post.id} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage.url}
              alt=""
              height={60}
              width={60}
              className='align-middle rounded-full' />
          </div>
          <div className="flex-grow ml-4">
            <p className='text-gray-500 font-xs'>
              {moment(post.createdAt).format('MMM DD YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} className='text-md'>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;