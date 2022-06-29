import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCategories } from '../graphQL';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then(data => setCategories(data))
  }, [])

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-gray-800'>
        Categories
      </h3>
      {categories.map(category => (
        <Link key={category.name} href={`/category/${category.slug}`}>
          <span className="cursor-pointer block mb-3 pb-3 text-gray-500">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;