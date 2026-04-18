import doodle from '../assets/hero-doodle.png';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="bg-surface-container/60">
      <div className="min-h-screen w-[90%] mx-auto flex justify-between items-center">

        {/* Text — staggered fade-in-up on page load */}
        <div className="max-w-[50%]">
          <p className="label-md text-primary tracking-wider uppercase animate-fade-in-up delay-100">
            Become the positivity you hope
          </p>
          <h1 className="font-black text-5xl mt-4 animate-fade-in-up delay-200">
            Back the Ideas That <br /> Deserve to Exist
          </h1>
          <h2 className="mt-4 body-md max-w-md text-3xl text-text-secondary animate-fade-in-up delay-300">
            Discover campaigns from creators, change makers, and communities around
            the world. We create the bold unique, and the essential.
          </h2>

          {/* Buttons */}
          <div className="flex space-x-5 mt-8 animate-fade-in-up delay-400">
            <Link to="/campaigns">
              <button type="button" className="btn-primary">
                Start A Campaign
              </button>
            </Link>
            <Link to="/explore">
              <button type="button" className="btn-secondary">
                Explore Projects
              </button>
            </Link>
          </div>
        </div>

        {/* Doodle — continuous float */}
        <div className="animate-float">
          <img src={doodle} alt="doodle art" />
        </div>
      </div>
    </div>
  );
}