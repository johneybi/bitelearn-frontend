import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import ArticleCard from '@/components/features/article/ArticleCard';
import ArticleHeroCard from '@/components/features/article/ArticleHeroCard';
import {
  ARTICLE_CATEGORIES,
  getMockArticleListItems,
  type ArticleCategory,
} from '@/mock/article';
import { cn } from '@/lib/utils';

export default function ArticleListPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<ArticleCategory>('전체');

  const articles = getMockArticleListItems(selectedCategory);

  const [heroArticle, ...otherArticles] = articles;

  const handleSelectArticle = (articleId: string) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white pt-[60px] text-slate-900">
      <header className="shrink-0 border-b border-slate-50 bg-white px-6 pb-6 pt-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              지식 아티클
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500">
              부담 없이 가볍게 읽는 성장 지식
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-xl shadow-inner">
            ✨
          </div>
        </div>

        <div className="hide-scrollbar -mx-2 flex gap-2 overflow-x-auto px-2">
          {ARTICLE_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <Button
                key={category}
                type="button"
                variant={isActive ? 'default' : 'secondary'}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'h-9 whitespace-nowrap rounded-full px-5 text-xs font-bold transition-all',
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'border-none bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                )}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </header>

      <section className="hide-scrollbar flex-1 overflow-y-auto bg-[radial-gradient(#f8fafc_2px,transparent_2px)] px-6 py-10 pb-32 [background-size:24px_24px]">
        <div className="flex flex-col gap-12">
          {articles.length > 0 ? (
            <>
              {heroArticle && (
                <ArticleHeroCard
                  article={heroArticle}
                  onSelect={() => handleSelectArticle(heroArticle.articleId)}
                />
              )}

              {otherArticles.length > 0 && (
                <div className="flex flex-col gap-6">
                  {otherArticles.map((article) => (
                    <ArticleCard
                      key={article.articleId}
                      article={article}
                      variant="relaxed"
                    />
                  ))}
                </div>
              )}

              <div className="pt-2 text-center">
                <p className="text-xs font-bold text-slate-300">
                  준비된 아티클을 모두 확인했어요
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-[32px] border-2 border-dashed border-slate-100 bg-slate-50/50 py-20 text-center">
              <p className="text-sm font-bold text-slate-400">
                아직 준비 중인 아티클이에요
              </p>
            </div>
          )}
        </div>

        <div className="mt-20 px-10 pb-10 text-center">
          <p className="text-xs font-bold leading-relaxed text-slate-300">
            새로운 지식이 매주 업데이트되고 있어요
          </p>
        </div>
      </section>
    </div>
  );
}
