import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Featureddestination = () => {

  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-15 bg-slate-50 py-20'>

      <Title title="Featured Destination " subTitle="Discover our handpicked selection of exeptional properties around the world, offering unparalleled luxury and unforgettable experiences." />
      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
      <Button onClick={() => { navigate(`/rooms`); scrollTo(0, 0) }} btnName="View All Destinations" />

    </div>
  )
}

export default Featureddestination
