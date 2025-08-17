# GraphQL API Configuration Guide - SeliseBlocks

## Environment Variables Setup

To configure the Customer feature to work with your SeliseBlocks GraphQL API, you need to set up environment variables in your project root.

### 1. Create Environment File

In your project root directory, create a `.env` file (or `.env.local` for local development):

```bash
# Customer Feature GraphQL API Configuration - SeliseBlocks

# GraphQL API endpoint URL (defaults to SeliseBlocks API)
REACT_APP_GRAPHQL_API_URL=https://api.seliseblocks.com/graphql/v1/graphql

# API Key for authentication (Bearer token from your Postman collection)
REACT_APP_GRAPHQL_API_KEY=your-bearer-token-here
```

### 2. Environment Variable Details

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `REACT_APP_GRAPHQL_API_URL` | Full URL to your GraphQL endpoint | No* | `https://api.seliseblocks.com/graphql/v1/graphql` |
| `REACT_APP_GRAPHQL_API_KEY` | Bearer token for authentication | Yes | `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...` |

*Defaults to SeliseBlocks API if not provided

### 3. Important Notes

- **REACT_APP_ prefix**: All environment variables must start with `REACT_APP_` for Create React App to recognize them
- **No quotes**: Don't wrap values in quotes unless they're part of the actual value
- **Restart required**: After adding environment variables, restart your development server
- **Build time**: Environment variables are embedded at build time, not runtime
- **Authentication**: Uses both `x-blocks-key` header and `Authorization` Bearer token

### 4. Development vs Production

#### Development (.env.local)
```bash
REACT_APP_GRAPHQL_API_URL=https://api.seliseblocks.com/graphql/v1/graphql
REACT_APP_GRAPHQL_API_KEY=your-dev-bearer-token
```

#### Production (.env.production)
```bash
REACT_APP_GRAPHQL_API_URL=https://api.seliseblocks.com/graphql/v1/graphql
REACT_APP_GRAPHQL_API_KEY=your-prod-bearer-token
```

### 5. API Endpoint Details

The feature is configured to work with the SeliseBlocks GraphQL API:
- **Base URL**: `https://api.seliseblocks.com/graphql/v1/graphql`
- **Headers**: 
  - `x-blocks-key`: `659C34D805F84648BE5A4C89C7EEBBAC`
  - `Authorization`: `bearer {your-token}`
- **Format**: Matches your Postman collection exactly

### 6. GraphQL Operations

The feature expects these GraphQL operations (matching your Postman collection):

#### Queries:
- **Get Customers**: `Customers(input: CustomerInput!)`
- **Get Customer by ID**: `Customer(input: CustomerByIdInput!)`

#### Mutations:
- **Create Customer**: `insertCustomer(input: CustomerCreateInput!)`
- **Update Customer**: `updateCustomer(input: CustomerUpdateInput!)`
- **Delete Customer**: `deleteCustomer(input: CustomerDeleteInput!)`

### 7. Input Types

Based on your Postman collection, the expected input types are:

```graphql
input CustomerInput {
  filter: String!    # MongoDB filter in text format
  sort: String!      # MongoDB sort in text format
  pageNo: Int!       # Page number
  pageSize: Int!     # Page size
}

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
```

### 8. Response Format

The API returns responses in this format:

```graphql
type CustomerQueryResult {
  Customers: {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    totalCount: Int!
    totalPages: Int!
    items: [Customer!]!
  }
}

type Customer {
  ItemId: String!
  FirstName: String!
  LastName: String!
  NetWorth: Float!
}

type CustomerMutationResult {
  insertCustomer: {
    acknowledged: Boolean!
    itemId: String!
  }
}
```

### 9. Testing Configuration

To test if your configuration is working:

1. Check the browser console for GraphQL requests
2. Look for network requests to `https://api.seliseblocks.com/graphql/v1/graphql`
3. Verify both headers are being sent:
   - `x-blocks-key: 659C34D805F84648BE5A4C89C7EEBBAC`
   - `Authorization: bearer {your-token}`

### 10. Troubleshooting

#### Common Issues:

1. **"GraphQL request failed"**: Check your API URL and ensure the endpoint is accessible
2. **"GraphQL errors"**: Your GraphQL schema might not match the expected operations
3. **"Failed to create customer"**: Verify your mutation names and input types
4. **Authentication errors**: Check your Bearer token and ensure it's valid

#### Debug Steps:

1. Verify environment variables are loaded:
   ```javascript
   console.log('API URL:', process.env.REACT_APP_GRAPHQL_API_URL);
   console.log('API Key:', process.env.REACT_APP_GRAPHQL_API_KEY);
   ```

2. Check network tab in browser dev tools for failed requests

3. Verify your GraphQL schema supports the required operations:
   - `Customers` query with pagination
   - `insertCustomer` mutation
   - `updateCustomer` mutation
   - `deleteCustomer` mutation

### 11. Security Considerations

- Never commit `.env` files to version control
- Use different Bearer tokens for development and production
- Consider using environment-specific configuration files
- The `x-blocks-key` is automatically included in all requests
- Implement proper CORS policies on your GraphQL server

### 12. Postman Collection Reference

This configuration is based on your Postman collection:
- **Collection Name**: `data-gateway`
- **Base URL**: `https://api.seliseblocks.com/graphql/v1/graphql`
- **Headers**: `x-blocks-key` and `Authorization: bearer`
- **Operations**: `insertCustomer` and `Customers` query
