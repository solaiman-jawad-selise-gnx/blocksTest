# Environment Setup Guide - Customer Feature

## Overview

This guide explains how to set up the environment variables needed for the Customer feature to work with the centralized GraphQL client.

## Required Environment Variables

### 1. API Base URL
```bash
REACT_APP_API_BASE_URL=https://api.seliseblocks.com
```
This is the base URL for your API. The GraphQL endpoint will be automatically constructed as `${baseUrl}/graphql/v1/graphql`.

### 2. Blocks Key
```bash
REACT_APP_BLOCKS_KEY=659C34D805F84648BE5A4C89C7EEBBAC
```
This is the authentication key required for all API requests.

## Environment File Setup

### Step 1: Create Environment File
In your project root directory, create a `.env` file:

```bash
# .env
REACT_APP_API_BASE_URL=https://api.seliseblocks.com
REACT_APP_BLOCKS_KEY=your_blocks_key_here
```

### Step 2: Restart Development Server
After creating or modifying the `.env` file, restart your development server:

```bash
npm start
# or
yarn start
```

## Environment-Specific Configuration

### Development (.env.development)
```bash
REACT_APP_API_BASE_URL=https://api.seliseblocks.com
REACT_APP_BLOCKS_KEY=your_dev_blocks_key
```

### Production (.env.production)
```bash
REACT_APP_API_BASE_URL=https://api.seliseblocks.com
REACT_APP_BLOCKS_KEY=your_prod_blocks_key
```

### Local Development (.env.local)
```bash
REACT_APP_API_BASE_URL=https://api.seliseblocks.com
REACT_APP_BLOCKS_KEY=your_local_blocks_key
```

## How It Works

The Customer feature now uses the centralized GraphQL client which:

1. **Automatically constructs** the GraphQL endpoint from the base URL
2. **Handles authentication** using the blocks key
3. **Manages requests** through the main application's HTTP infrastructure
4. **Provides consistent** error handling and response processing

## Verification Steps

### 1. Check Environment Variables
Open your browser console and run:
```javascript
console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
console.log('Blocks Key:', process.env.REACT_APP_BLOCKS_KEY);
```

### 2. Verify GraphQL Endpoint
The endpoint should be constructed as:
```javascript
const endpoint = `${process.env.REACT_APP_API_BASE_URL}/graphql/v1/graphql`;
console.log('GraphQL Endpoint:', endpoint);
// Output: https://api.seliseblocks.com/graphql/v1/graphql
```

### 3. Test API Requests
1. Navigate to the customers page
2. Open browser dev tools → Network tab
3. Look for GraphQL requests to the correct endpoint
4. Verify that requests include the `x-blocks-key` header

## Troubleshooting

### Common Issues

1. **Environment variables not loaded**
   - Ensure the `.env` file is in the project root
   - Restart the development server
   - Check that variable names start with `REACT_APP_`

2. **API errors**
   - Verify the API base URL is correct
   - Check that the blocks key is valid
   - Ensure the API endpoint is accessible

3. **Authentication failures**
   - Confirm the blocks key is set correctly
   - Check that the key has the necessary permissions
   - Verify the API accepts the key format

### Debug Commands

```javascript
// Check if environment variables are loaded
console.log('Environment check:', {
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  blocksKey: process.env.REACT_APP_BLOCKS_KEY ? 'Set' : 'Not set',
  graphqlUrl: `${process.env.REACT_APP_API_BASE_URL}/graphql/v1/graphql`
});

// Test API connectivity
fetch(`${process.env.REACT_APP_API_BASE_URL}/graphql/v1/graphql`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-blocks-key': process.env.REACT_APP_BLOCKS_KEY
  },
  body: JSON.stringify({ query: '{ __typename }' })
}).then(response => console.log('API Status:', response.status));
```

## Security Notes

- **Never commit** `.env` files to version control
- **Use different keys** for different environments
- **Rotate keys** regularly
- **Monitor API usage** for suspicious activity
- **Keep keys secure** and limit access to them

## Next Steps

After setting up the environment variables:

1. **Test the feature** by navigating to the customers page
2. **Verify data loading** by checking if customers are displayed
3. **Test operations** by adding, editing, or deleting customers
4. **Check error handling** by intentionally causing errors

If you encounter any issues, refer to the troubleshooting section above or check the browser console for error messages.
