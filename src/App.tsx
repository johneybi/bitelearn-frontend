import Router from '@/router/Router';
import AuthInitializer from './components/features/auth/AuthInitializer';

export default function App() {
  return (
    <AuthInitializer>
      <Router />
    </AuthInitializer>
  );
}
