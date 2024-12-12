import React from 'react'

const UpdatePassword = () => {
  return (
    <div className='mt-32 bg-white border rounded shadow-md h-fit p-4'>
      <h3 className='text-2xl font-bold'>CHANGE PASSWORD</h3>

      <form className='space-y-4'>
        <div>
          <label htmlFor="email" className=" mt-4 block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="email"
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 h-10 py-2 px-2 text-base w-[450px]"
          />

          <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="email"
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 h-10 py-2 px-2 text-base w-[450px]"
          />

          <label htmlFor="email" className="mt-4block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="email"
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 h-10 py-2 px-2 text-base w-[450px]"
          />
        </div>
        <button className='bg-[#1e293b] text-white p-3 rounded-lg float-end'>Change password</button>
      </form>
    </div>
  )
}

export default UpdatePassword