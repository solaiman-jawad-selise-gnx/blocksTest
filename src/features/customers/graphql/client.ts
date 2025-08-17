interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
}

interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

export class GraphQLClient {
  private baseURL: string;
  private getHeaders: () => Record<string, string>;

  constructor(baseURL: string, getHeaders: () => Record<string, string>) {
    this.baseURL = baseURL;
    this.getHeaders = getHeaders;
  }

  async query<T = any>(request: GraphQLRequest): Promise<GraphQLResponse<T>> {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(`GraphQL query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async mutate<T = any>(request: GraphQLRequest): Promise<GraphQLResponse<T>> {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(`GraphQL mutation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
