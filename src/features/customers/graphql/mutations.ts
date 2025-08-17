// GraphQL mutations for Customer schema based on SeliseBlocks API format

export const CUSTOMER_MUTATIONS = {
  // Mutation to create a new customer - matches Postman collection format exactly
  CREATE_CUSTOMER: `
    mutation {
      insertCustomer(input: {
        FirstName: $firstName
        LastName: $lastName
        NetWorth: $netWorth
      }) {
        acknowledged
        itemId
      }
    }
  `,

  // Mutation to update an existing customer
  UPDATE_CUSTOMER: `
    mutation UpdateCustomer($itemId: String!, $firstName: String, $lastName: String, $netWorth: Float) {
      updateCustomer(input: {
        ItemId: $itemId
        FirstName: $firstName
        LastName: $lastName
        NetWorth: $netWorth
      }) {
        acknowledged
        itemId
      }
    }
  `,

  // Mutation to delete a customer
  DELETE_CUSTOMER: `
    mutation DeleteCustomer($itemId: String!) {
      deleteCustomer(input: {
        ItemId: $itemId
      }) {
        acknowledged
        itemId
      }
    }
  `,
};

// Input types for the mutations
export const CUSTOMER_MUTATION_INPUT_TYPES = `
  input CustomerCreateInput {
    FirstName: String!
    LastName: String!
    NetWorth: Float!
  }

  input CustomerUpdateInput {
    ItemId: String!
    FirstName: String
    LastName: String
    NetWorth: Float
  }

  input CustomerDeleteInput {
    ItemId: String!
  }
`;
