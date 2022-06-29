import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCategories } from '../graphQL';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then(data => setCategories(data))
  }, [])



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