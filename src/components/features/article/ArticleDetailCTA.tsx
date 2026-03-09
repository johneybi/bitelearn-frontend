type ArticleDetailCTAProps = {
  callToAction: {
    text: string;
    style: 'primary' | 'secondary';
  };
};

export default function ArticleDetailCTA({
  callToAction,
}: ArticleDetailCTAProps) {
  return (
    <div className="shrink-0 border-t border-slate-100 bg-white/95 px-5 py-4 backdrop-blur-md">
      <button
        type="button"
        className={`flex w-full items-center justify-center rounded-2xl py-4 text-base font-bold shadow-md transition-all ${
          callToAction.style === 'primary'
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        {callToAction.text}
      </button>
    </div>
  );
}
