import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Badge } from 'components/ui/badge';
import { Plus, User, Key } from 'lucide-react';
import { AddCustomerForm } from 'features/customers';
import { useCustomers } from 'features/customers';
import { getAccessTokenFromCookies } from 'features/customers';

// Simple token source indicator component
const TokenSourceIndicator: React.FC = () => {
  const cookieToken = getAccessTokenFromCookies();
  const envToken = process.env.REACT_APP_GRAPHQL_API_KEY;
  
  const getTokenSource = () => {
    if (cookieToken) return { source: 'Cookie', variant: 'default' as const };
    if (envToken) return { source: 'Env', variant: 'secondary' as const };
    return { source: 'No Token', variant: 'destructive' as const };
  };

  const { source, variant } = getTokenSource();

  return (
    <div className="flex items-center gap-2">
      <Key className="h-4 w-4 text-muted-foreground" />
      <Badge variant={variant} className="text-xs">
        {source}
      </Badge>
    </div>
  );
};

export default function CustomersPage() {
  const { t } = useTranslation();
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const { customers, isLoading, addCustomer } = useCustomers();

  const handleAddCustomer = async (customerData: { FirstName: string; LastName: string; NetWorth: number }) => {
    try {
      await addCustomer(customerData);
      setIsAddingCustomer(false);
    } catch (error) {
      console.error('Failed to add customer:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t('customers.title', 'Customers')}</h1>
            <p className="text-muted-foreground">
              {t('customers.description', 'Manage your customer relationships')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsAddingCustomer(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {t('customers.add', 'Add Customer')}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {t('customers.list', 'Customer List')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">{t('common.loading', 'Loading...')}</p>
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('customers.empty', 'No customers found')}</p>
              <Button 
                onClick={() => setIsAddingCustomer(true)} 
                variant="outline" 
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('customers.addFirst', 'Add Your First Customer')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {customers.map((customer, index) => (
                <div key={customer.ItemId || index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {customer.FirstName} {customer.LastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Net Worth: ${customer.NetWorth?.toLocaleString() || '0'}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddCustomerForm
        open={isAddingCustomer}
        onOpenChange={setIsAddingCustomer}
        onSubmit={handleAddCustomer}
      />

      {/* Access Token Status Indicator - Bottom Right */}
      <div className="flex justify-end pt-4 border-t">
        <TokenSourceIndicator />
      </div>
    </div>
  );
}
