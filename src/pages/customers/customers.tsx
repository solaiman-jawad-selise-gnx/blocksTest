import React, { useState } from 'react';
import { Button } from 'components/ui/button';
import { Plus, UserPlus, RefreshCw } from 'lucide-react';
import { AddCustomerForm, useCustomers, AccessTokenStatus } from 'features/customers';
import { Customer } from 'features/customers';

export default function CustomersPage() {
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const { 
    customers, 
    isLoading, 
    error, 
    addCustomer, 
    fetchCustomers, 
    refreshCustomers 
  } = useCustomers();

  const handleAddCustomer = async (customerData: Omit<Customer, 'ItemId'>) => {
    try {
      await addCustomer(customerData);
    } catch (err) {
      console.error('Failed to add customer:', err);
    }
  };

  if (isLoading && customers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer relationships and data
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshCustomers} variant="outline" disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setShowAddCustomerForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Access Token Status - for debugging/development */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {error && (
            <div className="bg-destructive/15 border border-destructive/50 text-destructive px-4 py-3 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <p className="font-medium">Error loading customers</p>
                <Button 
                  onClick={() => fetchCustomers()} 
                  variant="outline" 
                  size="sm"
                >
                  Try Again
                </Button>
              </div>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {customers.length === 0 && !isLoading ? (
            <div className="text-center py-12">
              <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No customers yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first customer
              </p>
              <Button onClick={() => setShowAddCustomerForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">
                Customer List ({customers.length})
              </h4>
              <div className="space-y-4">
                {customers.map((customer: Customer, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">{customer.FirstName} {customer.LastName}</h5>
                      <p className="text-sm text-muted-foreground">
                        Net Worth: ${customer.NetWorth?.toLocaleString() || '0'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ID: {customer.ItemId || 'New'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Access Token Status Sidebar */}
        <div className="lg:col-span-1">
          <AccessTokenStatus />
        </div>
      </div>

      <AddCustomerForm
        open={showAddCustomerForm}
        onOpenChange={setShowAddCustomerForm}
        onSubmit={handleAddCustomer}
      />
    </div>
  );
}
