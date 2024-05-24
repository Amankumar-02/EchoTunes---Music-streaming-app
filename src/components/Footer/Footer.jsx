import React from 'react'

function Footer() {
  return (
    <>
    <div className='m-2 bg-pink-400 flex items-center justify-between px-4 py-2'>
        <div>
            <p className='font-semibold text-sm'>Preview of Spotify</p>
            <p className='text-sm'>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
        </div>
        <button className='text-black bg-white py-3 px-6 rounded-3xl'>Sign up for free</button>
    </div>
    </>
  )
}

export default Footer