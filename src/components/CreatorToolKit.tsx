function CreatorToolKit() {
  return (
    <div className="card p-4 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <span>🛠️</span>
        <span className="label-md text-[var(--color-on-background)]">Creator Toolkit</span>
      </div>

      <button
        disabled
        className="w-full py-2 rounded-lg bg-[var(--color-surface-highest)] text-[var(--color-text-secondary)] label-md cursor-not-allowed"
      >
        CAMPAIGN ENDED
      </button>

      <button className="w-full py-2 rounded-lg border border-red-500 text-red-500 label-md mt-3 hover:bg-red-50 transition-colors">
        CANCEL CAMPAIGN
      </button>

      <p className="label-md text-[var(--color-text-secondary)] text-center mt-3">
        Cancellation available till campaign is 10% funded. This action is irreversible.
      </p>
    </div>
  );
}

export default CreatorToolKit;
