import { useReveal } from '../hooks/useReveal';

export default function Featured() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="mt-10" ref={ref}>
      <div className="min-h-screen w-[90%] mx-auto mt-8">

        {/* Text header */}
        <div className="flex flex-col items-center">
          <p className="reveal text-primary uppercase italic tracking-widest">
            The Editor's choice
          </p>
          <h2 className="reveal headline-md mt-4 delay-100">
            Hand-Picked by Our Team
          </h2>
          <p className="reveal body-md text-center max-w-md text-3xl text-text-secondary py-4 delay-200">
            Every week, our editorial admins select five projects that demonstrate
            a story that needs to be told. A gesture towards humanity and a
            brighter future.
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