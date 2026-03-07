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

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          <Route path="/learning/word/:setId" element={<WordLearningRoute />} />

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
