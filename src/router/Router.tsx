import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import NotFoundPage from '@/pages/NotFoundPage';
import WordLearningRoute from '@/pages/wordLearning/WordLearningRoute';
import LearningPage from '@/pages/learning/LearningPage';
import NotesPage from '@/pages/NotesPage';
import MyPage from '@/pages/MyPage';
import AccountInfoPage from '@/pages/AccountInfoPage';
import ArticleListPage from '@/pages/article/ArticleListPage';
import ArticleDetailPage from '@/pages/article/ArticleDetailPage';
import LearningRoadmapPage from '@/pages/learning/LearningRoadmapPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route
              path="/learning/:categoryId"
              element={<LearningRoadmapPage />}
            />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/articles" element={<ArticleListPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>

          <Route path="/learning/word/:setId" element={<WordLearningRoute />} />
          <Route path="/mypage/account" element={<AccountInfoPage />} />
          <Route path="/articles/:articleId" element={<ArticleDetailPage />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/oauth/callback/:provider"
              element={<AuthCallbackPage />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
