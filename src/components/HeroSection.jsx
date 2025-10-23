import React from 'react'
import Image from "../maang2.webp"

const HeroSection = () => {
    return (
        <div>
            <div className='bg-blue-950 text-white rounded-2xl mb-14 p-10 flex justify-between'>
                <div className='pt-7 pl-5'>
                    <p className='pb-6  text-xl font-bold'>Don't settle for just an Average job, Start preparing for MAANG jobs today!</p>
                    <button

                        className="bg-amber-600 mr-2 text-white text-lg px-5 py-2 rounded-xl hover:bg-amber-700"
                    >
                        Start Learning for Free
                    </button>
                </div>
                <div>
                    <img className='w-xl pr-5' src={Image} alt="" />
                </div>
            </div>
            <div>
                <h1 className='text-center text-3xl font-extrabold mb-6'>CodeSprint is different!</h1>
                <p className='text-center mb-8'>We make sure that the prep is highly focused and aimed towards the best results for you. You will see the following ...</p>
            </div>
        </div>
    )
}

export default HeroSection