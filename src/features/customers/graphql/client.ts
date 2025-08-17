import { CUSTOMER_API_CONFIG, getAuthHeaders } from '../config/api.config';

// GraphQL client utility for making API calls
export class GraphQLClient {
  private url: string;
  private headers: Record<string, string>;

  constructor() {
    this.url = CUSTOMER_API_CONFIG.GRAPHQL_URL;
    this.headers = getAuthHeaders();
  }

  /**
   * Execute a GraphQL query or mutation
   * @param query - The GraphQL query/mutation string
   * @param variables - Variables for the query/mutation
   * @returns Promise with the response data
   */
  async execute<T = any>(query: string, variables: Record<string, any> = {}): Promise<T> {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.errors && result.errors.length > 0) {
        const errorMessage = result.errors.map((error: any) => error.message).join(', ');
        throw new Error(`GraphQL errors: ${errorMessage}`);
      }

      return result.data;
    } catch (error) {
      console.error('GraphQL execution error:', error);
      throw error;
    }
  }

  /**
   * Execute a query
   * @param query - The GraphQL query string
   * @param variables - Variables for the query
   * @returns Promise with the response data
   */
  async query<T = any>(query: string, variables: Record<string, any> = {}): Promise<T> {
    return this.execute<T>(query, variables);
  }

  /**
   * Execute a mutation
   * @param mutation - The GraphQL mutation string
   * @param variables - Variables for the mutation
   * @returns Promise with the response data
   */
  async mutate<T = any>(mutation: string, variables: Record<string, any> = {}): Promise<T> {
    return this.execute<T>(mutation, variables);
  }
}

// Create a singleton instance
export const graphqlClient = new GraphQLClient();
