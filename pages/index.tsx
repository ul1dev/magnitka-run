import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    window.location.href = '/pages/index.html';
  }, []);
  return null;
}
