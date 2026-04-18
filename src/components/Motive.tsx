import { useReveal } from '../hooks/useReveal';

export default function Motive() {
  const quoteRef  = useReveal<HTMLDivElement>();
  const bubbleRef = useReveal<HTMLDivElement>();

  return (
    <div className="bg-surface-container/60 mt-10">
      <div className="min-h-screen w-[90%] mx-auto mt-8">

        {/* Quote section */}
        <div ref={quoteRef} className="flex flex-col items-center">
          <p className="reveal-scale text-primary text-7xl uppercase italic tracking-widest font-black">
            "
          </p>
          <h2 className="reveal headline-md mt-4 text-center max-w-[50%] text-2xl font-bold leading-relaxed delay-100">
            Crowdy is the democratization of opportunity, where the value of an
            idea is decided by the people, not the gatekeepers.
          </h2>
          <p className="reveal body-md text-center max-w-md text-text-secondary py-4 uppercase tracking-wide text-sm delay-200">
            -The Crowdy Team
          </p>
        </div>

        {/* Category Bubbles */}
        <div ref={bubbleRef} className="mt-40 flex flex-col items-center">
          <h2 className="reveal font-black text-3xl">
            Find What Moves You
          </h2>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {['Technology', 'Social', 'Education', 'Environment', 'Health'].map(
              (category, i) => (
                <div
                  key={category}
                  className="reveal px-6 py-3 rounded-full border-2 border-primary/30
                              hover:border-primary hover:bg-primary/10 hover:scale-110
                                active:scale-95 cursor-pointer transition-all duration-1000"
                  style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                >
                  <span className="text-on-background font-medium">{category}</span>
                </div>
              ),
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
