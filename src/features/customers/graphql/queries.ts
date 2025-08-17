// GraphQL queries for Customer schema

export const CUSTOMER_QUERIES = {
  // Query to get all customers
  GET_CUSTOMERS: `
    query GetCustomers($collectionName: String!, $schemaName: String!, $projectKey: String!, $limit: Int, $offset: Int) {
      querySchema(
        collectionName: $collectionName
        schemaName: $schemaName
        projectKey: $projectKey
        limit: $limit
        offset: $offset
      ) {
        data {
          id
          name
          netWorth
          createdAt
          updatedAt
        }
        totalCount
        hasMore
      }
    }
  `,

  // Query to get a single customer by ID
  GET_CUSTOMER_BY_ID: `
    query GetCustomerById($collectionName: String!, $schemaName: String!, $projectKey: String!, $id: String!) {
      getSchemaItem(
        collectionName: $collectionName
        schemaName: $schemaName
        projectKey: $projectKey
        id: $id
      ) {
        id
        name
        netWorth
        createdAt
        updatedAt
      }
    }
  `,

  // Query to search customers
  SEARCH_CUSTOMERS: `
    query SearchCustomers($collectionName: String!, $schemaName: String!, $projectKey: String!, $query: String!, $limit: Int, $offset: Int) {
      searchSchema(
        collectionName: $collectionName
        schemaName: $schemaName
        projectKey: $projectKey
        query: $query
        limit: $limit
        offset: $offset
      ) {
        data {
          id
          name
          netWorth
          createdAt
          updatedAt
        }
        totalCount
        hasMore
      }
    }
  `,
};
