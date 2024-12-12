import React from 'react'

const UpdateInfo = () => {
  return (
    <div className='bg-white border rounded shadow-md p-4'>
      <h3 className='text-2xl font-bold mb-5'>Account Info</h3>
    
    <form className='space-y-4'>
    <div className='flex gap-2'>
       <div>
       <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">
          First name
        </label>
        <input
          type="name"
          className="mt-1 block rounded-md border-gray-900 shadow-md focus:border-green-900 focus:ring-green-900 h-10 py-2 px-2 text-base"
        />
       </div>

       <div>
       <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="name"
          className="mt-1 block rounded-md border-gray-900 shadow-md focus:border-green-900 focus:ring-green-900 h-10 py-2 px-2 text-base"
        />
       </div>
      </div>
      <div>
       <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">
          Middle Name
        </label>
        <input
          type="name"
          className="mt-1 block rounded-md border-gray-900 shadow-md focus:border-green-900 focus:ring-green-900 h-10 py-2 px-2 text-base w-72"
          placeholder='optional'
        />
       </div>
      <div className='flex gap-2'>
       <div>
       <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="email"
          className="mt-1 block rounded-md border-gray-900 shadow-md focus:border-green-900 focus:ring-green-900 h-10 py-2 px-2 text-base"
        />
       </div>

       <div>
       <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="email"
          className="mt-1 block rounded-md border-gray-900 shadow-md focus:border-green-900 focus:ring-green-900 h-10 py-2 px-2 text-base"
        />
       </div>
      </div>
      <div className='flex gap-2'>
       <div>
       <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">
          Longitude
        </label>
        <input
          type="email"
          className="mt-1 block rounded-md border-gray-900 shadow-md focus:border-green-900 focus:ring-green-900 h-10 py-2 px-2 text-base"
        />
       </div>

       <div>
       <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">
          Latitude
        </label>
        <input
          type="email"
          className="mt-1 block rounded-md border-gray-900 shadow-md focus:border-green-900 focus:ring-green-900 h-10 py-2 px-2 text-base"
        />
       </div>
      </div>
      <div className='flex gap-2'>
       <div>
       <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">
          State
        </label>
        <input
          type="email"
          className="mt-1 block rounded-md border-gray-900 shadow-md focus:border-green-900 focus:ring-green-900 h-10 py-2 px-2 text-base"
        />
       </div>

       <div>
       <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">
          LGA
        </label>
        <input
          type="email"
          className="mt-1 block rounded-full border-gray-900 shadow-md focus:border-green-900 focus:ring-green-900 h-10 py-2 px-2 text-base"
        />
       </div>
      </div>
      <button className='bg-orange-600 text-white p-3 rounded-lg float-end'>Update Info</button>
    </form>
  </div>
  )
}

export default UpdateInfo