import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/ui/button';
import { Plus, UserPlus, RefreshCw } from 'lucide-react';
import { AddCustomerForm, useCustomers } from 'features/customers';
import { Customer } from 'features/customers';

export default function CustomersPage() {
  const { t } = useTranslation();
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const { customers, addCustomer, isLoading, error, refreshCustomers } = useCustomers();

  const handleAddCustomer = async (customerData: Customer) => {
    try {
      await addCustomer(customerData);
      // The form will close automatically on success
    } catch (error) {
      console.error('Failed to add customer:', error);
    }
  };

  const handleRefresh = () => {
    refreshCustomers();
  };

  // Helper function to get translation with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center justify-between md:mb-[32px]">
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">
          {getTranslation('CUSTOMERS', 'Customers')}
        </h3>
        <div className="flex gap-4">
          <Button
            onClick={handleRefresh}
            variant="outline"
            disabled={isLoading}
            className="font-bold"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-sm font-bold sr-only sm:not-sr-only sm:whitespace-nowrap">
              {getTranslation('REFRESH', 'Refresh')}
            </span>
          </Button>
          <Button
            onClick={() => setShowAddCustomerForm(true)}
            className="font-bold bg-primary hover:bg-primary/90"
          >
            <UserPlus className="w-2.5 h-2.5" />
            <span className="text-sm font-bold sr-only sm:not-sr-only sm:whitespace-nowrap">
              {getTranslation('ADD_CUSTOMER', 'Add Customer')}
            </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-error bg-error/10 rounded-lg">
            <p className="font-medium">Error: {error}</p>
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm" 
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-12">
            <UserPlus className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-muted-foreground">
              {getTranslation('NO_CUSTOMERS', 'No customers found')}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {getTranslation('GET_STARTED_BY_ADDING_CUSTOMER', 'Get started by adding your first customer using the Customer schema.')}
            </p>
            <div className="mt-6">
              <Button onClick={() => setShowAddCustomerForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {getTranslation('ADD_CUSTOMER', 'Add Customer')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-lg border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">
                  {getTranslation('CUSTOMER_LIST', 'Customer List')}
                </h4>
                <span className="text-sm text-muted-foreground">
                  {customers.length} customer{customers.length !== 1 ? 's' : ''} from Customer schema
                </span>
              </div>
              <div className="space-y-4">
                {customers.map((customer: Customer, index: number) => (
                  <div key={customer.id || index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">{customer.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        {getTranslation('NET_WORTH', 'Net Worth')}: ${customer.netWorth.toLocaleString()}
                      </p>
                      {customer.id && (
                        <p className="text-xs text-muted-foreground mt-1">
                          ID: {customer.id}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <AddCustomerForm
        open={showAddCustomerForm}
        onOpenChange={setShowAddCustomerForm}
        onSubmit={handleAddCustomer}
      />
    </div>
  );
}
