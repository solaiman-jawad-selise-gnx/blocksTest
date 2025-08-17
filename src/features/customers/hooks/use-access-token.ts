import { useState, useEffect } from 'react';
import { getCurrentAccessToken, hasValidAccessToken } from '../utils/auth.utils';

export const useAccessToken = () => {
  const [token, setToken] = useState<string>(getCurrentAccessToken());
  const [isValid, setIsValid] = useState<boolean>(hasValidAccessToken());

  useEffect(() => {
    // Check for token changes periodically
    const checkToken = () => {
      const currentToken = getCurrentAccessToken();
      const currentValidity = hasValidAccessToken();
      
      if (currentToken !== token) {
        setToken(currentToken);
      }
      
      if (currentValidity !== isValid) {
        setIsValid(currentValidity);
      }
    };

    // Check immediately
    checkToken();

    // Set up interval to check for changes
    const interval = setInterval(checkToken, 1000); // Check every second

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [token, isValid]);

  const refreshToken = () => {
    const currentToken = getCurrentAccessToken();
    const currentValidity = hasValidAccessToken();
    setToken(currentToken);
    setIsValid(currentValidity);
  };

  return {
    token,
    isValid,
    refreshToken,
    hasToken: token.length > 0,
  };
};
