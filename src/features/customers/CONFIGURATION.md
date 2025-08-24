# GraphQL API Configuration Guide - SeliseBlocks

## Overview

To configure the Customer feature to work with your SeliseBlocks GraphQL API, you need to set up environment variables in your project root.

## Environment Variables

### Required Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `REACT_APP_API_BASE_URL` | Base URL for your API | Yes | `https://api.seliseblocks.com` |
| `REACT_APP_BLOCKS_KEY` | Blocks key for authentication | Yes | `659C34D805F84648BE5A4C89C7EEBBAC` |

### Optional Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_GRAPHQL_URL` | Full GraphQL endpoint URL | No | `${REACT_APP_API_BASE_URL}/graphql/v1/graphql` |

## Configuration Examples

### Development Environment

```bash
# .env.development
REACT_APP_API_BASE_URL=https://api.seliseblocks.com
REACT_APP_BLOCKS_KEY=your-dev-blocks-key
```

### Production Environment

```bash
# .env.production
REACT_APP_API_BASE_URL=https://api.seliseblocks.com
REACT_APP_BLOCKS_KEY=your-prod-blocks-key
```

### Local Development

```bash
# .env.local
REACT_APP_API_BASE_URL=https://api.seliseblocks.com
REACT_APP_BLOCKS_KEY=your-local-blocks-key
```

## How It Works

The feature is configured to work with the centralized GraphQL client:

1. **Base URL**: The main API base URL is used to construct the GraphQL endpoint
2. **Authentication**: The blocks key is automatically included in all requests
3. **Endpoint**: GraphQL requests are sent to `${baseUrl}/graphql/v1/graphql`

## API Endpoint Structure

```
Base URL: https://api.seliseblocks.com
GraphQL Endpoint: https://api.seliseblocks.com/graphql/v1/graphql
```

## Authentication Headers

The centralized GraphQL client automatically includes:

- `Content-Type: application/json`
- `x-blocks-key: {REACT_APP_BLOCKS_KEY}`

## Testing Configuration

To test your configuration:

1. Set the required environment variables
2. Restart your development server
3. Navigate to the customers page
4. Check the browser's network tab for GraphQL requests
5. Verify that requests include the correct headers

## Troubleshooting

### Common Issues

1. **API Key not found**: Check that `REACT_APP_BLOCKS_KEY` is set correctly
2. **API errors**: Verify `REACT_APP_API_BASE_URL` is correct
3. **Authentication failures**: Ensure the blocks key is valid

### Debug Steps

1. Check environment variables are loaded:
   ```javascript
   console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
   console.log('Blocks Key:', process.env.REACT_APP_BLOCKS_KEY);
   ```

2. Verify GraphQL endpoint construction:
   ```javascript
   const endpoint = `${process.env.REACT_APP_API_BASE_URL}/graphql/v1/graphql`;
   console.log('GraphQL Endpoint:', endpoint);
   ```

3. Check network requests in browser dev tools

## Security Notes

- Never commit environment files with real API keys
- Use different keys for different environments
- Rotate keys regularly
- Monitor API usage for suspicious activity
