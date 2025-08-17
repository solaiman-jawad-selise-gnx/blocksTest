// Configuration for Customer Schema GraphQL API
// Update these URLs to match your actual GraphQL API endpoint

export const CUSTOMER_API_CONFIG = {
  // Base URL for your GraphQL API
  GRAPHQL_URL: process.env.REACT_APP_GRAPHQL_API_URL || '/graphql',
  
  // Your project key from the Customer schema
  PROJECT_KEY: '659C34D805F84648BE5A4C89C7EEBBAC',
  
  // Collection and schema names
  COLLECTION_NAME: 'Customers',
  SCHEMA_NAME: 'Customer',
  
  // Authentication
  AUTH: {
    HEADER_NAME: 'Authorization',
    TOKEN_PREFIX: 'Bearer',
    API_KEY: process.env.REACT_APP_GRAPHQL_API_KEY || '',
  },
  
  // Query defaults
  QUERY_DEFAULTS: {
    LIMIT: 100,
    OFFSET: 0,
  },
};

// Helper function to get auth headers
export const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (CUSTOMER_API_CONFIG.AUTH.API_KEY) {
    headers[CUSTOMER_API_CONFIG.AUTH.HEADER_NAME] = 
      `${CUSTOMER_API_CONFIG.AUTH.TOKEN_PREFIX} ${CUSTOMER_API_CONFIG.AUTH.API_KEY}`;
  }

  return headers;
};
