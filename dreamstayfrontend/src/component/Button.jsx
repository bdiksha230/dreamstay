import React from 'react'

const Button = ({ btnName, onClick, img }) => {
    return (
        <>
            <button onClick={onClick} className='flex items-center gap-2 my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-gray hover:bg-gray-80 transition-all cursor-pointer'>
                {btnName}
                {img && <img src={img} className='' />}
            </button>
        </>
    )
}

export default Button
