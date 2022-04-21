import React from 'react'
import Timer from "../components/Timer"

const index = () => {
  return (
    <div className='flex justify-center items-center flex-col h-full w-full'>
      <h1 className='text-7xl font-bold'>TomatoJS</h1>

      <Timer />
    </div>
  )
}

export default index