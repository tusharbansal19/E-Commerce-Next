import { useAuth } from '../Providers';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/auth/login');
    }
  }, [user, router]);

  if (!user) return null;
  return <>{children}</>;
} 