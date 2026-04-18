import { useReveal } from '../hooks/useReveal';

export default function Latest() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="bg-surface-container/60 mt-10" ref={ref}>
      <div className="min-h-screen w-[90%] mx-auto mt-8">

        {/* Text header */}
        <div className="flex justify-between items-start">
          <h2 className="reveal headline-md">
            Just Launched
          </h2>
          <p className="reveal body-md max-w-md text-3xl text-text-secondary delay-100">
            These are the freshest projects we can offer! We like to help new
            projects by featuring them in our homepage!
          </p>
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
    </div>
  );
}