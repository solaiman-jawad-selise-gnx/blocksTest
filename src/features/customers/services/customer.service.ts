import { graphqlClient } from '../graphql';
import { CUSTOMER_QUERIES, CUSTOMER_MUTATIONS } from '../graphql';

export interface Customer {
  ItemId?: string;
  FirstName: string;
  LastName: string;
  NetWorth: number;
}

export interface CustomerResponse {
  acknowledged: boolean;
  itemId: string;
}

export interface CustomerQueryResult {
  Customers: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalCount: number;
    totalPages: number;
    items: Customer[];
  };
}

export interface CustomerMutationResult {
  insertCustomer: CustomerResponse;
  updateCustomer: CustomerResponse;
  deleteCustomer: CustomerResponse;
}

export const createCustomer = async (customer: Omit<Customer, 'ItemId'>): Promise<CustomerResponse> => {
  try {
    const result = await graphqlClient.mutate<CustomerMutationResult>({
      query: CUSTOMER_MUTATIONS.CREATE_CUSTOMER,
      variables: {
        firstName: customer.FirstName,
        lastName: customer.LastName,
        netWorth: customer.NetWorth,
      },
    });

    return result.insertCustomer || { acknowledged: false, itemId: '' };
  } catch (error) {
    throw new Error(`Failed to create customer: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const result = await graphqlClient.query<CustomerQueryResult>({
      query: CUSTOMER_QUERIES.GET_CUSTOMERS,
    });

    return result.Customers?.items || [];
  } catch (error) {
    throw new Error(`Failed to fetch customers: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const updateCustomer = async (customer: Customer): Promise<CustomerResponse> => {
  try {
    const result = await graphqlClient.mutate<CustomerMutationResult>({
      query: CUSTOMER_MUTATIONS.UPDATE_CUSTOMER,
      variables: {
        itemId: customer.ItemId,
        firstName: customer.FirstName,
        lastName: customer.LastName,
        netWorth: customer.NetWorth,
      },
    });

    return result.updateCustomer || { acknowledged: false, itemId: '' };
  } catch (error) {
    throw new Error(`Failed to update customer: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const deleteCustomer = async (itemId: string): Promise<CustomerResponse> => {
  try {
    const result = await graphqlClient.mutate<CustomerMutationResult>({
      query: CUSTOMER_MUTATIONS.DELETE_CUSTOMER,
      variables: { itemId },
    });

    return result.deleteCustomer || { acknowledged: false, itemId: '' };
  } catch (error) {
    throw new Error(`Failed to delete customer: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}; 
