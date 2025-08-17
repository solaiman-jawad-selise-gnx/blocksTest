# Customers Feature

This feature provides functionality to manage customers using the Customer schema via GraphQL API.

## Schema Integration

The customer feature integrates with your Customer schema:
- **Collection Name**: "Customers"
- **Schema Name**: "Customer"
- **Fields**: 
  - Name (String)
  - NetWorth (Float)
- **Project Key**: "659C34D805F84648BE5A4C89C7EEBBAC"
- **API Type**: GraphQL

## GraphQL Configuration

### Environment Variables

Set these environment variables in your `.env` file:

```bash
# GraphQL API endpoint
REACT_APP_GRAPHQL_API_URL=https://your-api-domain.com/graphql

# API Key for authentication (if required)
REACT_APP_GRAPHQL_API_KEY=your-api-key-here
```

### API Endpoints

The feature expects these GraphQL operations to be available:

1. **Query Customers**: `querySchema` operation
2. **Create Customer**: `createSchemaItem` mutation
3. **Update Customer**: `updateSchemaItem` mutation
4. **Delete Customer**: `deleteSchemaItem` mutation

### GraphQL Schema Requirements

Your GraphQL schema should support these operations:

```graphql
type Query {
  querySchema(
    collectionName: String!
    schemaName: String!
    projectKey: String!
    limit: Int
    offset: Int
  ): SchemaQueryResult
}

type Mutation {
  createSchemaItem(
    collectionName: String!
    schemaName: String!
    projectKey: String!
    data: CustomerInput!
  ): Customer
  
  updateSchemaItem(
    collectionName: String!
    schemaName: String!
    projectKey: String!
    id: String!
    data: CustomerInput!
  ): Customer
  
  deleteSchemaItem(
    collectionName: String!
    schemaName: String!
    projectKey: String!
    id: String!
  ): DeleteResult
}

input CustomerInput {
  name: String!
  netWorth: Float!
}

type Customer {
  id: String!
  name: String!
  netWorth: Float!
  createdAt: String!
  updatedAt: String!
}

type SchemaQueryResult {
  data: [Customer!]!
  totalCount: Int!
  hasMore: Boolean!
}

type DeleteResult {
  success: Boolean!
  message: String!
}
```

## Components

### AddCustomerForm
A modal dialog component for adding new customers with the following fields:
- **Name** (String, required): Customer's name
- **Net Worth** (Float, required): Customer's net worth value

### CustomersPage
The main customer management page that displays:
- Customer list from GraphQL schema
- Add customer functionality
- Loading states
- Error handling
- Empty state with call-to-action
- Refresh button to reload data

## Features

- **GraphQL Integration**: Uses GraphQL for all CRUD operations
- **Form Validation**: Uses Zod schema validation
- **React Hook Form**: Modern form state management
- **Responsive Design**: Works on both desktop and mobile
- **Translation Support**: Uses i18n with fallbacks
- **Error Handling**: Proper error states and user feedback
- **Loading States**: Shows loading indicators during operations
- **Real-time Data**: Fetches data from your actual Customer schema

## Usage

The customer feature is accessible through the sidebar navigation:
1. Navigate to the "Customers" section in the sidebar
2. Click "Add Customer" to open the form
3. Fill in customer name and net worth
4. Submit to create a new customer using GraphQL
5. Use the refresh button to reload customer data

## Files Structure

```
src/features/customers/
├── components/
│   └── add-customer-form/
│       ├── add-customer-form.tsx
│       └── index.tsx
├── config/
│   └── api.config.ts          # GraphQL API configuration
├── graphql/
│   ├── client.ts              # GraphQL client utility
│   ├── queries.ts             # GraphQL queries
│   ├── mutations.ts           # GraphQL mutations
│   └── index.ts               # GraphQL exports
├── hooks/
│   └── use-customers.ts       # Customer operations hook
├── services/
│   └── customer.service.ts    # GraphQL service layer
├── index.tsx                  # Main exports
└── README.md                  # This file
```

## Integration Points

- **Sidebar Menu**: Added to the "Customer Relationship Management" section
- **Routing**: Accessible at `/customers`
- **Navigation**: Integrated with the main application navigation
- **Breadcrumbs**: Proper breadcrumb support
- **Translation**: Route module mapping for i18n
- **GraphQL**: Full CRUD operations via GraphQL API

## API Integration

The service layer is designed to work with your Customer schema via GraphQL:
- `createCustomer()`: Creates new customers using GraphQL mutation
- `getCustomers()`: Retrieves customer list using GraphQL query
- `updateCustomer()`: Updates existing customers using GraphQL mutation
- `deleteCustomer()`: Deletes customers using GraphQL mutation

## Customization

### Update GraphQL Operations

If your GraphQL schema uses different operation names, update the files in `src/features/customers/graphql/`:

1. **queries.ts**: Update query names and structure
2. **mutations.ts**: Update mutation names and structure
3. **client.ts**: Modify error handling or response processing

### Update API Configuration

Modify `src/features/customers/config/api.config.ts` to:
- Change the GraphQL endpoint
- Update authentication method
- Modify default query parameters

## Future Enhancements

- Customer editing functionality
- Customer deletion with confirmation
- Advanced filtering and search
- Customer analytics and reporting
- Bulk operations
- Customer categories and tags
- Real-time updates via GraphQL subscriptions 
