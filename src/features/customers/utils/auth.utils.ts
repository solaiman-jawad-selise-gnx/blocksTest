// Helper function to get cookie value by name
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

// Helper function to get access token from cookies
export const getAccessTokenFromCookies = (): string | null => {
  // The access token cookie name includes the project key
  const projectKey = '659C34D805F84648BE5A4C89C7EEBBAC';
  const specificCookieName = `access_token_${projectKey}`;
  
  // Try the specific cookie name (with project key)
  const specificToken = getCookie(specificCookieName);
  if (specificToken) return specificToken;
  
  return null;
};

// Function to get the current access token with fallback priority
export const getCurrentAccessToken = (): string => {
  // Priority 1: Cookies (access token)
  const cookieToken = getAccessTokenFromCookies();
  if (cookieToken) return cookieToken;
  
  // Priority 2: Environment variable
  const envToken = process.env.REACT_APP_GRAPHQL_API_KEY;
  if (envToken) return envToken;
  
  // Priority 3: Empty string (no token)
  return '';
};

// Function to check if we have a valid access token
export const hasValidAccessToken = (): boolean => {
  const token = getCurrentAccessToken();
  return token.length > 0;
};

// Function to get cookie access information for debugging
export const getCookieAccessInfo = () => {
  const projectKey = '659C34D805F84648BE5A4C89C7EEBBAC';
  const specificCookieName = `access_token_${projectKey}`;
  const currentDomain = window.location.hostname;
  
  return {
    cookieName: specificCookieName,
    currentDomain,
    targetDomain: '.seliseblocks.com',
    isCrossDomain: currentDomain !== 'seliseblocks.com' && !currentDomain.endsWith('.seliseblocks.com'),
    availableCookies: document.cookie ? document.cookie.split(';').map(c => c.trim().split('=')[0]) : [],
    cookieFound: getCookie(specificCookieName) !== null,
    cookieValue: getCookie(specificCookieName),
  };
};
