import React from 'react'
import DashboardLayout from '../Layout/DashboardLayout'
import UpdateInfo from './UpdateInfo'
import UpdatePassword from './UpdatePassword'

const Account = () => {
  return (
    <DashboardLayout>
        <>
        <div className="flex gap-10 mt-2 min-h-full py-7 ">
          <UpdateInfo/>
          <UpdatePassword/>
        </div>
        </>
    </DashboardLayout>

  )
}

export default Account