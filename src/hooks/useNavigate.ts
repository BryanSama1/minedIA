import { useCallback } from 'react';

export const useNavigate = () => {
  const navigateTo = useCallback((path: string) => {
    if (path === '/' || path === '/dashboard') {
      window.location.href = '/';
      return;
    }
    console.log(`Navigation to ${path}`);
  }, []);

  return {
    navigateTo,
  };
};