import { SquareArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

export default function Favorites() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen w-[90%] mx-auto mt-10" ref={ref}>

      <p className="reveal label-md text-primary tracking-wider uppercase">
        Crowd Favorites
      </p>

      <div className="flex justify-between items-end">
        <h2 className="reveal headline-md mt-8 delay-100">
          Campaigns People Love
        </h2>

        <div className="reveal text-primary group hover:text-primary-hover duration-300 cursor-pointer delay-200">
          <Link to="/campaigns" className="flex space-x-1">
            <p>View All</p>
            <SquareArrowUpRight className="group-hover:translate-x-1 duration-300" />
          </Link>
        </div>
      </div>

      {/* Cards container */}
      <div className="mt-12 grid grid-cols-3 gap-6">
        <div className="reveal delay-100">
          <p>PLACEHOLDER</p>
        </div>
        <div className="reveal delay-200">
          <p>PLACEHOLDER</p>
        </div>
        <div className="reveal delay-300">
          <p>PLACEHOLDER</p>
        </div>
      </div>

    </div>
  );
}