import { SquareArrowUpRight } from 'lucide-react';

import { Link } from 'react-router-dom';

export default function Favorites () {
  return (
    <div className ="min-h-screen w-[90%] mx-auto mt-10">
      <p className="label-md text-primary tracking-wider uppercase">
        Crowd Favorites
      </p>


      <div className="flex justify-between items-end">
        <h2 className="headline-md mt-8">
          Campaigns People Love
        </h2>

        <div className="text-primary group hover:text-primary-hover duration-300 cursor-pointer">
          <Link to="/campaigns" className='flex space-x-1'>
          <p>
            View All
          </p>

          <SquareArrowUpRight className='group-hover:translate-x-1 duration-300' />
          </Link>
        </div>

      </div>
      
      {/* Cards Container - KHALIL CARDS */}
      <div className='mt-12 grid grid-cols-3'>
        <div>
          <p>
            PLACEHOLDER
          </p>
        </div>
        <div>
          <p>
            PLACEHOLDER
          </p>
        </div>
        <div>
          <p>
            PLACEHOLDER
          </p>
        </div>
      </div>
    </div>
  )
}