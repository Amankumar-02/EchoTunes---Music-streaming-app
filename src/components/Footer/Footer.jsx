import React from 'react'

function Footer() {
  return (
    <>
    <div className='m-2 bg-[#1FDD63] rounded-lg px-10 py-2'>
        <div className='text-center text-black text-lg font-semibold'>
            songInfo
        </div>
        <div className='flex justify-center items-center gap-4'>
        <i className="ri-skip-back-line text-3xl text-black cursor-pointer hover:scale-[1.2]"></i>
        <i className="ri-play-circle-line text-3xl text-black cursor-pointer hover:scale-[1.2]"></i>
        <i className="ri-skip-forward-line text-3xl text-black cursor-pointer hover:scale-[1.2]"></i>
        </div>
        <div className='flex justify-between items-center gap-4'>
            <div className='text-black font-semibold'>start</div>
            <input type="range" className='w-full'/>
            <div className='text-black font-semibold'>end</div>
        </div>
    </div>
    </>
  )
}

export default Footer