# Environment Variable Setup for Local Development

## Cross-Domain Cookie Access Issue

The access token cookie is set for the domain `.seliseblocks.com`:
- **Name**: `access_token_659C34D805F84648BE5A4C89C7EEBBAC`
- **Domain**: `.seliseblocks.com`
- **Path**: `/`

When running the application locally (e.g., from `localhost`), you cannot access cookies from other domains due to browser security restrictions.

## Solution: Environment Variable Fallback

Set the following environment variables in your `.env` file:

```bash
# Access Token (fallback when cookies are not accessible)
REACT_APP_GRAPHQL_API_KEY=your_access_token_here

# GraphQL API URL
REACT_APP_GRAPHQL_API_URL=https://api.seliseblocks.com/graphql/v1/graphql

# Blocks Key
REACT_APP_BLOCKS_KEY=659C34D805F84648BE5A4C89C7EEBBAC
```

## How to Get the Access Token

1. **From Browser (when on .seliseblocks.com domain)**:
   - Open Developer Tools (F12)
   - Go to Application/Storage → Cookies
   - Find the cookie named `access_token_659C34D805F84648BE5A4C89C7EEBBAC`
   - Copy its value

2. **From Network Tab**:
   - Make a request to the GraphQL API from .seliseblocks.com domain
   - Check the request headers for the Authorization token

3. **From API Response**:
   - Some APIs return the access token in response headers or body

## Development Workflow

1. **Set up environment variables** in your `.env` file
2. **Restart your development server** after adding environment variables
3. **Use the AccessTokenStatus component** to monitor token availability
4. **The system automatically falls back** to environment variables when cookies are not accessible

## Production Deployment

When deploying to production:
- If deploying to a subdomain of `.seliseblocks.com`, cookies will be accessible
- If deploying to a different domain, use environment variables or implement token transfer
- Consider using secure HTTP-only cookies for production environments

## Troubleshooting

- **Token not found**: Check that `REACT_APP_GRAPHQL_API_KEY` is set correctly
- **API errors**: Verify `REACT_APP_GRAPHQL_API_URL` and `REACT_APP_BLOCKS_KEY`
- **Cookie access**: Use the AccessTokenStatus component to debug cookie availability
- **Cross-domain issues**: The warning will appear when running from different domains
