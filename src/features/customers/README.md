# Customers Feature

This feature provides complete customer management functionality using the Customer schema via GraphQL API.

## Features

- ✅ **Add Customer**: Create new customers using the Customer schema
- ✅ **List Customers**: View all customers from the GraphQL API
- ✅ **Update Customer**: Modify existing customer information
- ✅ **Delete Customer**: Remove customers from the system
- ✅ **Access Token Management**: Automatic token retrieval with cookie priority

## Access Token Configuration

The system automatically retrieves access tokens with the following priority:

1. **Cookies (Priority 1)**: Looks for access token in the primary cookie:
   - **Primary**: `access_token_659C34D805F84648BE5A4C89C7EEBBAC` (project-specific)

2. **Environment Variable (Priority 2)**: Falls back to `REACT_APP_GRAPHQL_API_KEY`

3. **No Token**: If neither source is available, uses empty string

### Cookie Naming Convention

The primary access token cookie follows this pattern:
```
access_token_{PROJECT_KEY}
```

For your project, the cookie name is:
```
access_token_659C34D805F84648BE5A4C89C7EEBBAC
```

This naming convention ensures that:
- Each project has its own unique access token cookie
- No conflicts between different projects
- Clear identification of token source
- Secure token isolation

### Cross-Domain Cookie Access

**Important**: The access token cookie is set for the domain `.seliseblocks.com`. If you're running the application from a different domain (e.g., `localhost` during development), you may not be able to access this cookie due to browser security restrictions.

**Cookie Details**:
- **Name**: `access_token_659C34D805F84648BE5A4C89C7EEBBAC`
- **Domain**: `.seliseblocks.com`
- **Path**: `/`

**Solutions**:
1. **Use Environment Variable**: Set `REACT_APP_GRAPHQL_API_KEY` in your `.env` file for local development
2. **Deploy to Same Domain**: Deploy your application to a subdomain of `seliseblocks.com`
3. **Proxy Setup**: Configure a proxy to forward requests to the API while maintaining cookie context
4. **Token Transfer**: Implement a mechanism to transfer the token from the cookie domain to your application domain

**Development Workflow**:
1. Set `REACT_APP_GRAPHQL_API_KEY` in your `.env` file
2. The system will automatically fall back to the environment variable when cookies are not accessible
3. Use the AccessTokenStatus component to monitor token availability and source

### Environment Variables

```bash
# GraphQL API URL
REACT_APP_GRAPHQL_API_URL=https://api.seliseblocks.com/graphql/v1/graphql

# Fallback API Key (used if no cookie token found)
REACT_APP_GRAPHQL_API_KEY=your_api_key_here

# Blocks Key (required for all requests)
REACT_APP_BLOCKS_KEY=659C34D805F84648BE5A4C89C7EEBBAC
```

## Components

### AddCustomerForm
Modal form for adding new customers with validation.

**Props:**
- `open`: Boolean to control modal visibility
- `onOpenChange`: Callback for modal state changes
- `onSubmit`: Function called when form is submitted

### AccessTokenStatus
Debug component showing current access token status and source.

**Features:**
- Real-time token status monitoring
- Token source identification (Cookie vs Environment Variable)
- Token preview (truncated for security)
- Manual refresh capability

## Hooks

### useCustomers
Manages customer data and operations.

**Returns:**
- `customers`: Array of customer objects
- `isLoading`: Loading state
- `error`: Error message if any
- `addCustomer`: Function to add new customer
- `fetchCustomers`: Function to refresh customer list
- `refreshCustomers`: Function to refresh data
- `updateCustomer`: Function to update existing customer
- `deleteCustomer`: Function to delete customer

### useAccessToken
Monitors access token status and changes.

**Returns:**
- `token`: Current access token
- `isValid`: Whether token is valid
- `hasToken`: Whether any token is available
- `refreshToken`: Function to manually refresh token status

## Utilities

### getCurrentAccessToken()
Returns the current access token with fallback priority.

### hasValidAccessToken()
Checks if a valid access token is available.

### getAccessTokenFromCookies()
Retrieves access token from cookies only.

## GraphQL Operations

### Queries
- `GET_CUSTOMERS`: Fetch all customers with pagination
- `GET_CUSTOMER_BY_ID`: Get specific customer by ID
- `SEARCH_CUSTOMERS`: Search customers with filters

### Mutations
- `CREATE_CUSTOMER`: Add new customer
- `UPDATE_CUSTOMER`: Modify existing customer
- `DELETE_CUSTOMER`: Remove customer

## Usage Example

```tsx
import { useCustomers, useAccessToken } from 'features/customers';

function MyComponent() {
  const { customers, addCustomer, isLoading } = useCustomers();
  const { token, isValid, hasToken } = useAccessToken();

  const handleAddCustomer = async (customerData) => {
    if (!hasToken) {
      console.error('No access token available');
      return;
    }
    
    try {
      await addCustomer(customerData);
      console.log('Customer added successfully');
    } catch (error) {
      console.error('Failed to add customer:', error);
    }
  };

  return (
    <div>
      <p>Token Status: {isValid ? 'Valid' : 'Invalid'}</p>
      <p>Token Source: {token ? 'Available' : 'Not Available'}</p>
      
      {customers.map(customer => (
        <div key={customer.ItemId}>
          {customer.FirstName} {customer.LastName}
        </div>
      ))}
    </div>
  );
}
```

## API Configuration

The system automatically configures GraphQL requests with:
- Correct API endpoint
- Authentication headers (Bearer token)
- Blocks key header
- Content-Type headers

## Error Handling

All GraphQL operations include comprehensive error handling:
- Network errors
- GraphQL errors
- Validation errors
- User-friendly error messages

## Security Features

- Token preview truncation (shows only first/last 10 characters)
- Secure cookie parsing
- Environment variable fallback
- No token logging in production 
