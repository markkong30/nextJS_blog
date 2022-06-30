import { comment } from 'postcss';
import React, { useEffect, useState, useRef } from 'react';
import { submitComment, publishComment } from '../graphQL';


const fields = [
  { name: 'comment', type: 'textarea', class: 'p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 col-span-2', placeholder: 'Comment' },
  { name: 'name', type: 'input', class: 'mt-2 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 lg:col-span-1 col-span-2 name', placeholder: 'Name' },
  { name: 'email', type: 'input', class: 'mt-2 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 lg:col-span-1 col-span-2 email', placeholder: 'Email' }
]

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [formData, setFormData] = useState({});
  const form = useRef(null)

  useEffect(() => {
    const name = window.localStorage.getItem('name');
    const email = window.localStorage.getItem('email');

    setFormData({ ...formData, name, email })

  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setError(false);
    console.log(formData)

    if (Object.values(formData).length !== fields.length || Object.values(formData).includes('')) {
      return setError(true);
    }

    const { name, email, comment } = formData

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    submitComment({ ...formData, slug })
      .then(res => {
        publishComment({ id: res.createComment.id })
        setShowSuccessMsg(true);
        setTimeout(() => {
          setShowSuccessMsg(false);
          window.location.reload();
        }, 2000)
      })
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Comments</h3>
      <form className="grid grid-cols-2 gap-4 mb-4" onSubmit={handleSubmit} ref={form}>
        {fields.map((field, i) => {
          switch (field.type) {
            case 'textarea':
              return (
                <textarea key={i} className={field.class} name={field.name} placeholder={field.placeholder} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} />
              )
            case 'input':
              return (
                <input key={i} className={field.class} name={field.name} value={formData[field.name] || ''} placeholder={field.placeholder} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} />
              )
          }
        })}
        <div className="col-span-2 mt-4">
          <input type="checkbox" id="storeData" name="storeData" value="true" defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />
          <label htmlFor="storeData" className='ml-2 text-gray-500 cursor-pointer'>Save my name and email for next time</label>
        </div>
        {error && <p className='text-xs text-red-500'>All fields are required!</p>}
        <div className="mt-8">
          <button type="submit" className="transition duration-500 ease hover:bg-indigo-600 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Post Comment</button>
        </div>
        {showSuccessMsg && <span className="float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
      </form>
    </div>
  );
};

export default CommentsForm;