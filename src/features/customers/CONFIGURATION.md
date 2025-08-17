# GraphQL API Configuration Guide

## Environment Variables Setup

To configure the Customer feature to work with your GraphQL API, you need to set up environment variables in your project root.

### 1. Create Environment File

In your project root directory, create a `.env` file (or `.env.local` for local development):

```bash
# Customer Feature GraphQL API Configuration

# GraphQL API endpoint URL
REACT_APP_GRAPHQL_API_URL=https://your-api-domain.com/graphql

# API Key for authentication (if required)
REACT_APP_GRAPHQL_API_KEY=your-api-key-here
```

### 2. Environment Variable Details

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `REACT_APP_GRAPHQL_API_URL` | Full URL to your GraphQL endpoint | Yes | `https://api.example.com/graphql` |
| `REACT_APP_GRAPHQL_API_KEY` | Authentication token/API key | No* | `Bearer token123` |

*Required if your API requires authentication

### 3. Important Notes

- **REACT_APP_ prefix**: All environment variables must start with `REACT_APP_` for Create React App to recognize them
- **No quotes**: Don't wrap values in quotes unless they're part of the actual value
- **Restart required**: After adding environment variables, restart your development server
- **Build time**: Environment variables are embedded at build time, not runtime

### 4. Development vs Production

#### Development (.env.local)
```bash
REACT_APP_GRAPHQL_API_URL=http://localhost:4000/graphql
REACT_APP_GRAPHQL_API_KEY=dev-api-key
```

#### Production (.env.production)
```bash
REACT_APP_GRAPHQL_API_URL=https://api.production.com/graphql
REACT_APP_GRAPHQL_API_KEY=prod-api-key
```

### 5. Testing Configuration

To test if your configuration is working:

1. Check the browser console for GraphQL requests
2. Look for network requests to your GraphQL endpoint
3. Verify authentication headers are being sent correctly

### 6. Troubleshooting

#### Common Issues:

1. **"GraphQL request failed"**: Check your API URL and ensure the endpoint is accessible
2. **"GraphQL errors"**: Your GraphQL schema might not match the expected operations
3. **"Failed to create customer"**: Verify your mutation names and input types
4. **Authentication errors**: Check your API key and authentication method

#### Debug Steps:

1. Verify environment variables are loaded:
   ```javascript
   console.log('API URL:', process.env.REACT_APP_GRAPHQL_API_URL);
   console.log('API Key:', process.env.REACT_APP_GRAPHQL_API_KEY);
   ```

2. Check network tab in browser dev tools for failed requests

3. Verify your GraphQL schema supports the required operations:
   - `querySchema`
   - `createSchemaItem`
   - `updateSchemaItem`
   - `deleteSchemaItem`

### 7. Schema Requirements

Your GraphQL schema must support these operations with the specified structure. See the main README.md for the complete schema requirements.

### 8. Security Considerations

- Never commit `.env` files to version control
- Use different API keys for development and production
- Consider using environment-specific configuration files
- Implement proper CORS policies on your GraphQL server
