# Customer Management Feature

This feature provides complete customer management functionality using the Customer schema via GraphQL API.

## Features

- ✅ **List Customers**: View all customers from the GraphQL API
- ✅ **Add Customer**: Create new customers with form validation
- ✅ **Update Customer**: Edit existing customer information
- ✅ **Delete Customer**: Remove customers from the system
- ✅ **Search & Filter**: Advanced customer search capabilities
- ✅ **Pagination**: Efficient data loading with pagination
- ✅ **Real-time Updates**: Immediate UI updates after operations
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Responsive Design**: Mobile-friendly interface

## Authentication

The customer feature now uses the centralized GraphQL client which handles authentication through the main application configuration.

## Environment Setup

### Required Environment Variables

1. **Blocks Key**: Set `REACT_APP_BLOCKS_KEY` in your `.env` file
2. **API Base URL**: Set `REACT_APP_API_BASE_URL` in your `.env` file

### Example .env Configuration

```bash
# API Configuration
REACT_APP_API_BASE_URL=https://api.seliseblocks.com
REACT_APP_BLOCKS_KEY=your_blocks_key_here
```

## Installation

1. Ensure the required environment variables are set
2. Import the customer components and hooks as needed
3. The feature will automatically use the centralized GraphQL client

## Usage

### Basic Component Usage

```tsx
import { useCustomers, AddCustomerForm } from 'features/customers';

function MyComponent() {
  const { customers, isLoading, addCustomer } = useCustomers();
  
  // Use the customers data and functions
}
```

### Hook Usage

```tsx
import { useCustomers } from 'features/customers';

function CustomerList() {
  const { customers, isLoading, error, refetch } = useCustomers();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {customers.map(customer => (
        <div key={customer.ItemId}>
          {customer.FirstName} {customer.LastName}
        </div>
      ))}
    </div>
  );
}
```

## API Endpoints

The feature uses the centralized GraphQL endpoint configured in the main application.

## GraphQL Operations

### Queries

- `GET_CUSTOMERS`: Fetch all customers with pagination
- `GET_CUSTOMER_BY_ID`: Get a specific customer by ID
- `SEARCH_CUSTOMERS`: Search customers with filters

### Mutations

- `CREATE_CUSTOMER`: Add a new customer
- `UPDATE_CUSTOMER`: Modify existing customer
- `DELETE_CUSTOMER`: Remove a customer

## Error Handling

All GraphQL operations include comprehensive error handling:

- Network errors
- GraphQL errors
- Validation errors
- User-friendly error messages

## Performance Features

- **React Query Integration**: Automatic caching and background updates
- **Optimistic Updates**: Immediate UI feedback
- **Debounced Search**: Efficient search with debouncing
- **Lazy Loading**: Load data only when needed

## Styling

The feature uses the application's design system with:
- Consistent color scheme
- Responsive breakpoints
- Accessible components
- Modern UI patterns

## Testing

The feature includes comprehensive testing:
- Unit tests for utilities
- Component tests
- Integration tests
- E2E test coverage

## Troubleshooting

### Common Issues

- **Authentication errors**: Ensure the main application is properly configured
- **API errors**: Verify the API base URL and blocks key are correct
- **Network issues**: Check internet connectivity and API availability

## Contributing

When contributing to this feature:

1. Follow the existing code patterns
2. Use the centralized GraphQL client
3. Maintain consistent error handling
4. Update tests for new functionality
5. Follow the project's coding standards

## Dependencies

- React Query for data management
- Centralized GraphQL client
- Application design system
- Form validation libraries 
