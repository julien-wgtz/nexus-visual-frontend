import { useEffect } from 'react';
import { fetchData } from './fetch';
import { useAppStore } from '@/store/appStore';
import { useRouter } from 'next/navigation';

function useAuth() {
  const setAccount = useAppStore(state => state.setAccount);
  const router = useRouter();

  
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetchData(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/check`,
          {
            method: 'GET',
          }
        );

        if (response.ok) {
          const account = await response.json();
          console.log(account);
        } else {
          router.push('/login');
        }
      } catch (error) {
        // Handle network or other errors
        console.error('An error occurred', error);
      }
    };


    try {
      fetchDataAsync();
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred', error);
    }
  }, []);
}

export default useAuth;