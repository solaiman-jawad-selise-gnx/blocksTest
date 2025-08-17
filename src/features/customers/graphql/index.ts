import { GraphQLClient } from './client';
import { GRAPHQL_URL, getAuthHeaders } from '../config/api.config';

export { GraphQLClient } from './client';
export { CUSTOMER_QUERIES } from './queries';
export { CUSTOMER_MUTATIONS } from './mutations';
export { GRAPHQL_URL, getAuthHeaders } from '../config/api.config';

// Create a configured GraphQL client instance that gets fresh headers for each request
export const graphqlClient = new GraphQLClient(GRAPHQL_URL, getAuthHeaders);
