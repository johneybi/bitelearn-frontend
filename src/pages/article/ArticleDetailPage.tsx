import { CheckCircle2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { mockArticles } from '@/mock/article';
import { formatDate } from '@/utils/formatDate';
import { renderContentBlock } from '@/components/features/article/renderContentBlock';
import ArticleDetailHeader from '@/components/features/article/ArticleDetailHeader';
import ArticleDetailCTA from '@/components/features/article/ArticleDetailCTA';

export default function ArticleDetailPage() {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const currentId = articleId ?? mockArticles[0]?.articleId;
  const article = mockArticles.find((item) => item.articleId === currentId);

  const handleBack = () => {
    navigate(-1);
  };

  if (!article) {
    return (
      <main className="flex h-full flex-1 items-center justify-center bg-slate-50 px-6 text-slate-500">
        아티클을 찾을 수 없습니다.
      </main>
    );
  }

  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white text-slate-900">
      <ArticleDetailHeader
        onBack={handleBack}
        title={article.title}
        articleId={article.articleId}
      />

      <section className="hide-scrollbar min-h-0 flex-1 overflow-y-auto">
        <div className="relative aspect-[4/3] w-full bg-slate-100">
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>

        <section className="px-5 pb-5 pt-6">
          <div className="mb-3 inline-block rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">
            {article.category}
          </div>

          <h1 className="word-break-keep text-[26px] font-bold leading-snug tracking-tight text-slate-900">
            {article.title}
          </h1>

          <div className="mt-6 flex items-center justify-between border-y border-slate-100 py-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.profileImageUrl}
                alt={article.author.name}
                className="h-10 w-10 rounded-full border border-slate-100 bg-slate-50 object-cover"
              />

              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">
                  {article.author.name}
                </span>
                <span className="text-xs text-slate-500">
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-0.5">
              <span className="text-xs text-slate-400">
                {formatDate(article.publishedAt)}
              </span>
              <span className="text-xs text-slate-400">
                조회 {article.viewCount.toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {article.summary && (
          <section className="px-5 py-4">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
              <h4 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-indigo-900">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[11px] text-white">
                  ✓
                </span>
                {article.summary.title}
              </h4>

              <ul className="flex flex-col gap-2.5">
                {article.summary.points.map((point, index) => (
                  <li
                    key={index}
                    className="word-break-keep flex items-start gap-2 text-[14px] leading-relaxed text-indigo-950/80"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="px-5 py-6">
          {article.contentBlocks.map((block, index) =>
            renderContentBlock(block, index)
          )}
        </section>

        <section className="px-5 pb-8 pt-2">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="cursor-pointer rounded-full bg-slate-100 px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      </section>

      {article.callToAction && (
        <ArticleDetailCTA callToAction={article.callToAction} />
      )}
    </main>
  );
}
