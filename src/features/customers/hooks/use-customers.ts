import { useState, useEffect } from 'react';
import { createCustomer, getCustomers, updateCustomer, deleteCustomer, type Customer } from '../services/customer.service';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async (customerData: Customer) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await createCustomer(customerData);
      
      // Refresh the customer list to show the new customer
      await fetchCustomers();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add customer');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const customerList = await getCustomers();
      setCustomers(customerList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customers');
    } finally {
      setIsLoading(false);
    }
  };

  const updateCustomerData = async (customerId: string, customerData: Partial<Customer>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a complete customer object with the ItemId and updated data
      const updatedCustomer: Customer = {
        ItemId: customerId,
        FirstName: customerData.FirstName || '',
        LastName: customerData.LastName || '',
        NetWorth: customerData.NetWorth || 0,
      };
      
      await updateCustomer(updatedCustomer);
      
      // Refresh the customer list to show updated data
      await fetchCustomers();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update customer');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeCustomer = async (customerId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await deleteCustomer(customerId);
      
      // Remove the customer from local state
      setCustomers(prev => prev.filter(customer => customer.ItemId !== customerId));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete customer');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const refreshCustomers = () => {
    fetchCustomers();
  };

  return {
    customers,
    isLoading,
    error,
    addCustomer,
    fetchCustomers,
    updateCustomer: updateCustomerData,
    deleteCustomer: removeCustomer,
    clearError,
    refreshCustomers,
  };
}; 
