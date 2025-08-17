// GraphQL queries for Customer schema based on SeliseBlocks API format

export const CUSTOMER_QUERIES = {
  // Query to get all customers - matches Postman collection format exactly
  GET_CUSTOMERS: `
    query {
      Customers(input: {
        filter: "{}"
        sort: "{}"
        pageNo: 1
        pageSize: 10
      }) {
        hasNextPage
        hasPreviousPage
        totalCount
        totalPages
        items {
          ItemId
          FirstName
          LastName
          NetWorth
        }
      }
    }
  `,

  // Query to get a single customer by ID
  GET_CUSTOMER_BY_ID: `
    query GetCustomerById($itemId: String!) {
      Customer(input: { ItemId: $itemId }) {
        ItemId
        FirstName
        LastName
        NetWorth
      }
    }
  `,

  // Query to search customers with filters
  SEARCH_CUSTOMERS: `
    query SearchCustomers($filter: String!, $sort: String!, $pageNo: Int!, $pageSize: Int!) {
      Customers(input: {
        filter: $filter
        sort: $sort
        pageNo: $pageNo
        pageSize: $pageSize
      }) {
        hasNextPage
        hasPreviousPage
        totalCount
        totalPages
        items {
          ItemId
          FirstName
          LastName
          NetWorth
        }
      }
    }
  `,
};

// Input types for the queries
export const CUSTOMER_INPUT_TYPES = `
  input CustomerInput {
    filter: String!
    sort: String!
    pageNo: Int!
    pageSize: Int!
  }

  input CustomerByIdInput {
    ItemId: String!
  }

  input CustomerSearchInput {
    filter: String!
    sort: String!
    pageNo: Int!
    pageSize: Int!
  }
`;
