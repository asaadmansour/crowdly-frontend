export default function RegisterLeftPanel() {
  return (
    <div className="hidden md:flex flex-1 lg:flex-[1.1] bg-gradient-to-br from-[#f4f3ef] via-[#f4f3ef] to-[#ebd7ca] p-8 lg:p-12 flex-col justify-center h-full overflow-hidden">
      <div className="flex flex-col w-full max-w-[560px] mx-auto">
        <div className="flex items-center gap-3 mb-10 xl:mb-14">
          <div className="w-7 h-7 rounded-md flex justify-center items-center overflow-hidden">
            <img src="icon.jpg" alt="" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-[#111]">CROWDLY</span>
        </div>

        <div className="mb-14">
          <div className="w-10 h-10 text-[#ff5021] mb-8">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="4" r="2.5" />
              <circle cx="12" cy="20" r="2.5" />
              <circle cx="5" cy="8" r="2.5" />
              <circle cx="19" cy="8" r="2.5" />
              <circle cx="7" cy="18" r="2.5" />
              <circle cx="17" cy="18" r="2.5" />
              <path d="M12 7v3m-4.5 1.5l3-1.5m6 0l-3-1.5m3 6.5l-3-1.5m-6 0l3-1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-[56px] leading-[1.05] font-black text-[#1a1a1a] mb-10 tracking-tighter pr-4 font-[var(--font-display)]">
            Join<br/>
            thousands<br/>
            of people<br/>
            funding<br/>
            ideas that<br/>
            matter
          </h1>

          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-4">
              <div className="w-[22px] h-[22px] text-white bg-[#ff5021] rounded-full flex justify-center items-center p-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-full h-full"><path d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="text-[17px] text-[#222] font-medium tracking-tight">Free to create</span>
            </li>
             <li className="flex items-center gap-4">
              <div className="w-[22px] h-[22px] text-white bg-[#ff5021] rounded-full flex justify-center items-center p-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-full h-full"><path d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="text-[17px] text-[#222] font-medium tracking-tight">Trusted worldwide</span>
            </li>
             <li className="flex items-center gap-4">
              <div className="w-[22px] h-[22px] text-white bg-[#ff5021] rounded-full flex justify-center items-center p-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-full h-full"><path d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="text-[17px] text-[#222] font-medium tracking-tight">Secure donations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
