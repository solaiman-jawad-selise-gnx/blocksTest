// GraphQL mutations for Customer schema

export const CUSTOMER_MUTATIONS = {
  // Mutation to create a new customer
  CREATE_CUSTOMER: `
    mutation CreateCustomer($collectionName: String!, $schemaName: String!, $projectKey: String!, $data: CustomerInput!) {
      createSchemaItem(
        collectionName: $collectionName
        schemaName: $schemaName
        projectKey: $projectKey
        data: $data
      ) {
        id
        name
        netWorth
        createdAt
        updatedAt
      }
    }
  `,

  // Mutation to update an existing customer
  UPDATE_CUSTOMER: `
    mutation UpdateCustomer($collectionName: String!, $schemaName: String!, $projectKey: String!, $id: String!, $data: CustomerInput!) {
      updateSchemaItem(
        collectionName: $collectionName
        schemaName: $schemaName
        projectKey: $projectKey
        id: $id
        data: $data
      ) {
        id
        name
        netWorth
        createdAt
        updatedAt
      }
    }
  `,

  // Mutation to delete a customer
  DELETE_CUSTOMER: `
    mutation DeleteCustomer($collectionName: String!, $schemaName: String!, $projectKey: String!, $id: String!) {
      deleteSchemaItem(
        collectionName: $collectionName
        schemaName: $schemaName
        projectKey: $projectKey
        id: $id
      ) {
        success
        message
      }
    }
  `,
};

// Input type for customer data
export const CUSTOMER_INPUT_TYPE = `
  input CustomerInput {
    name: String!
    netWorth: Float!
  }
`;
