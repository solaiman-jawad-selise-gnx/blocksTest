import { getCurrentAccessToken } from '../utils/auth.utils';

// Configuration for Customer Schema GraphQL API - SeliseBlocks
// Based on Postman collection: https://api.seliseblocks.com/graphql/v1/graphql

export const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_API_URL || 'https://api.seliseblocks.com/graphql/v1/graphql';

export const AUTH = {
  TOKEN_PREFIX: 'bearer',
  TOKEN: getCurrentAccessToken(),
  BLOCKS_KEY_HEADER: 'x-blocks-key',
  BLOCKS_KEY: process.env.REACT_APP_BLOCKS_KEY || '659C34D805F84648BE5A4C89C7EEBBAC',
};

export const QUERY_DEFAULTS = {
  PAGE_NO: 1,
  PAGE_SIZE: 10,
  FILTER: '{}',
  SORT: '{}',
};

export const getAuthHeaders = () => {
  // Get fresh token each time (in case it was updated)
  const currentToken = getCurrentAccessToken();
  
  return {
    'Content-Type': 'application/json',
    [AUTH.BLOCKS_KEY_HEADER]: AUTH.BLOCKS_KEY,
    'Authorization': `${AUTH.TOKEN_PREFIX} ${currentToken}`,
  };
};
