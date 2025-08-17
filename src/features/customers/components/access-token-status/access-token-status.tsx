import React from 'react';
import { useAccessToken } from '../../hooks/use-access-token';
import { getAccessTokenFromCookies, getCookie } from '../../utils/auth.utils';
import { Badge } from 'components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { RefreshCw, Key, Cookie, Settings } from 'lucide-react';
import { Button } from 'components/ui/button';

export const AccessTokenStatus: React.FC = () => {
  const { token, isValid, refreshToken } = useAccessToken();
  const cookieToken = getAccessTokenFromCookies();
  const envToken = process.env.REACT_APP_GRAPHQL_API_KEY;
  
  // Get the specific cookie name being checked
  const projectKey = '659C34D805F84648BE5A4C89C7EEBBAC';
  const specificCookieName = `access_token_${projectKey}`;

  const getTokenSource = () => {
    if (cookieToken) {
      // Check if it's from the specific cookie name
      const specificToken = getCookie(specificCookieName);
      if (specificToken) return 'Cookie (Primary)';
      return 'Cookie (Fallback)';
    }
    if (envToken) return 'Environment Variable';
    return 'None';
  };

  const getTokenPreview = (token: string) => {
    if (!token) return 'No token available';
    if (token.length <= 20) return token;
    return `${token.substring(0, 10)}...${token.substring(token.length - 10)}`;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Access Token Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            <Badge variant={isValid ? "default" : "destructive"}>
              {isValid ? "Valid" : "Invalid"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Source:</span>
            <div className="flex items-center gap-1">
              {cookieToken ? <Cookie className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
              <span className="text-sm">{getTokenSource()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Token Preview:</div>
          <div className="p-2 bg-muted rounded text-xs font-mono break-all">
            {getTokenPreview(token)}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Available Sources:</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Primary Cookie:</span>
              <Badge variant={getCookie(specificCookieName) ? "default" : "secondary"}>
                {getCookie(specificCookieName) ? "Available" : "Not Found"}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Environment Variable:</span>
              <Badge variant={envToken ? "default" : "secondary"}>
                {envToken ? "Available" : "Not Set"}
              </Badge>
            </div>
          </div>
        </div>

        <Button 
          onClick={refreshToken} 
          variant="outline" 
          size="sm" 
          className="w-full"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Status
        </Button>
      </CardContent>
    </Card>
  );
};
