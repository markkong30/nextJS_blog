import React, { useContext } from 'react';
import Link from 'next/link';

const categories = [{ name: 'react', slug: 'react' }, { name: 'web dev', slug: 'web-dev' }]


const Header = () => {

  return (
    <div className='container flex justify-between items-center mx-auto  mb-8 w-full border-b border-blue-400 py-8'>
      <div className="">
        <Link href='/'>
          <span className="cursor-pointer font-bold text-4xl text-white">
            Everyday BLOG
          </span>
        </Link>
      </div>

      <div className="hidden md:block">
        {categories.map(category => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className="mt-2 align-middle text-white ml-4 font-semibolld cursor-pointer">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;