import type { ContentBlock } from '@/mock/article';

export function renderContentBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          key={index}
          className="word-break-keep mb-6 whitespace-pre-wrap text-base leading-[1.7] tracking-[-0.01em] text-slate-800"
        >
          {block.content}
        </p>
      );

    case 'heading':
      if (block.level === 3) {
        return (
          <h3
            key={index}
            className="word-break-keep mb-4 mt-10 text-xl font-bold leading-tight tracking-[-0.02em] text-slate-900"
          >
            {block.content}
          </h3>
        );
      }

      return (
        <h2
          key={index}
          className="word-break-keep mb-5 mt-12 text-[22px] font-bold leading-tight tracking-[-0.02em] text-slate-900"
        >
          {block.content}
        </h2>
      );

    case 'image':
      return (
        <figure key={index} className="my-8">
          <div className="overflow-hidden rounded-xl bg-slate-100">
            <img
              src={block.url}
              alt={block.altText}
              className="h-auto w-full object-cover"
            />
          </div>

          {block.caption && (
            <figcaption className="word-break-keep mx-auto mt-2 max-w-[90%] text-center text-[13px] text-slate-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'list':
      return (
        <ul key={index} className="my-6 space-y-3 pl-1">
          {block.items.map((item, itemIndex) => {
            const parts = item.split(/\*\*(.*?)\*\*/g);

            return (
              <li
                key={itemIndex}
                className="word-break-keep flex items-start text-base leading-[1.6] tracking-[-0.01em] text-slate-800"
              >
                <span className="mr-2 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                <span className="flex-1">
                  {parts.map((part, partIndex) =>
                    partIndex % 2 === 1 ? (
                      <strong key={partIndex} className="font-bold">
                        {part}
                      </strong>
                    ) : (
                      <span key={partIndex}>{part}</span>
                    )
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      );

    case 'quote':
      return (
        <blockquote
          key={index}
          className="word-break-keep my-8 rounded-r-xl border-l-4 border-indigo-500 bg-indigo-50/50 p-5"
        >
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-700">
            {block.content}
          </p>
        </blockquote>
      );

    default:
      return null;
  }
}
