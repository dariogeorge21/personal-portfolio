"use client";

import { useEffect } from 'react';
import { useLoading } from '@/components/loading-provider';

/**
 * Custom hook to control the loading state
 * @param isLoading - Whether the component is loading
 * @param delay - Optional delay before showing the loading state (in ms)
 */
export function useLoadingState(isLoading: boolean, delay: number = 0) {
  const { setIsLoading } = useLoading();
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(true);
      }, delay);
    } else {
      setIsLoading(false);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, delay, setIsLoading]);
}
