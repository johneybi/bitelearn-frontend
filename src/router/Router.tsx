import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import AppLayout from '@/layouts/AppLayout';

import ProtectedRoute from '@/components/features/auth/ProtectedRoute';
import PublicRoute from '@/components/features/auth/PublicRoute';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import TermsAgreementPage from '@/pages/TermsAgreementPage';
import OAuthCallbackPage from '@/pages/OAuthCallbackPage';
import NotFoundPage from '@/pages/NotFoundPage';
import LearningPage from '@/pages/learning/LearningPage';
import NotesPage from '@/pages/note/NotesPage';
import IncorrectNoteDetailPage from '@/pages/note/IncorrectNoteDetailPage';
import MyPage from '@/pages/MyPage';
import AccountInfoPage from '@/pages/AccountInfoPage';
import ArticleListPage from '@/pages/article/ArticleListPage';
import ArticleDetailPage from '@/pages/article/ArticleDetailPage';
import LearningRoadmapPage from '@/pages/learning/LearningRoadmapPage';
import LearningChapterPage from '@/pages/learning/LearningChapterPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/articles" element={<ArticleListPage />} />
          </Route>

          <Route
            path="/learning/:categoryId/topics/:topicId"
            element={<LearningRoadmapPage />}
          />
          <Route
            path="/learning/:categoryId/:chapterId"
            element={<LearningChapterPage />}
          />
          <Route
            path="/notes/incorrect/:noteId"
            element={<IncorrectNoteDetailPage />}
          />
          <Route path="/articles/:articleId" element={<ArticleDetailPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/mypage" element={<MyPage />} />
            </Route>
            <Route path="/mypage/account" element={<AccountInfoPage />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup/terms" element={<TermsAgreementPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          <Route path="/oauth/callback" element={<OAuthCallbackPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
