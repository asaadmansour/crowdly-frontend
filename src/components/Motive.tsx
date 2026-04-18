import { useReveal } from '../hooks/useReveal';

export default function Motive() {
  const quoteRef = useReveal<HTMLDivElement>();
  const bubbleRef = useReveal<HTMLDivElement>();

  return (
    <div className="bg-surface-container/60 mt-10">
      <div className="min-h-screen w-[90%] mx-auto mt-8">

        {/* Category Bubbles */}
        <div ref={bubbleRef} className="mt-40 flex flex-col items-center">
          <h2 className="reveal font-black text-3xl">Find What Moves You</h2>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {['Technology', 'Social', 'Education', 'Environment', 'Health'].map((category, i) => (
              <div
                key={category}
                className="reveal px-6 py-3 rounded-full border-2 border-primary/30
                              hover:border-primary hover:bg-primary/10 hover:scale-110
                                active:scale-95 cursor-pointer"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-on-background font-medium">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
