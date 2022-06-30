import React from 'react';
import moment from 'moment';
import Link from 'next/link';

const CarouselCard = ({ post }) => {
  console.log(post)
  return (
    <Link href={`/post/${post.slug}`}>

      <div className='relative aspect-square cursor-pointer'>
        <img className='absolute top-0 left-0 w-full h-full object-cover object-center rounded-lg' src={post.featuredImage.url} alt="" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black"></div>
        <div className="flex flex-col absolute top-0 left-0 justify-center items-center w-full h-full">
          <p className="text-white mb-4 text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
          <h1 className="text-white text-center font-semibold px-8">{post.title}</h1>

        </div>
        <div className="absolute bottom-3 left-[50%] -translate-x-1/2 flex justify-center items-center">
          <img className='rounded-full bg-white w-6 h-6 mr-2' src={post.author.photo.url} alt="" />
          <span className='text-white text-xs'>{post.author.name}</span>
        </div>
      </div>
    </Link>

  );
};

export default CarouselCard;