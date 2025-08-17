import { CUSTOMER_API_CONFIG } from '../config/api.config';
import { graphqlClient } from '../graphql/client';
import { CUSTOMER_QUERIES } from '../graphql/queries';
import { CUSTOMER_MUTATIONS } from '../graphql/mutations';

export interface Customer {
  id?: string; // Optional for new customers, required for existing ones
  name: string;
  netWorth: number;
}

export interface CustomerResponse {
  id: string;
  name: string;
  netWorth: number;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerQueryResult {
  querySchema: {
    data: CustomerResponse[];
    totalCount: number;
    hasMore: boolean;
  };
}

export interface CustomerMutationResult {
  createSchemaItem?: CustomerResponse;
  updateSchemaItem?: CustomerResponse;
  deleteSchemaItem?: {
    success: boolean;
    message: string;
  };
}

/**
 * Creates a new customer using the Customer schema via GraphQL
 * @param customerData - The customer data to create
 * @returns Promise that resolves when customer is created
 */
export const createCustomer = async (customerData: Customer): Promise<void> => {
  try {
    const variables = {
      collectionName: CUSTOMER_API_CONFIG.COLLECTION_NAME,
      schemaName: CUSTOMER_API_CONFIG.SCHEMA_NAME,
      projectKey: CUSTOMER_API_CONFIG.PROJECT_KEY,
      data: {
        name: customerData.name,
        netWorth: customerData.netWorth,
      },
    };

    const result = await graphqlClient.mutate<CustomerMutationResult>(
      CUSTOMER_MUTATIONS.CREATE_CUSTOMER,
      variables
    );

    if (!result.createSchemaItem) {
        throw new Error('Failed to create customer: No response data');
    }
    
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

/**
 * Fetches all customers from your Customer schema via GraphQL
 * @returns Promise that resolves to an array of customers
 */
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const variables = {
      collectionName: CUSTOMER_API_CONFIG.COLLECTION_NAME,
      schemaName: CUSTOMER_API_CONFIG.SCHEMA_NAME,
      projectKey: CUSTOMER_API_CONFIG.PROJECT_KEY,
      limit: CUSTOMER_API_CONFIG.QUERY_DEFAULTS.LIMIT,
      offset: CUSTOMER_API_CONFIG.QUERY_DEFAULTS.OFFSET,
    };

    const result = await graphqlClient.query<CustomerQueryResult>(
      CUSTOMER_QUERIES.GET_CUSTOMERS,
      variables
    );

    if (result.querySchema && result.querySchema.data) {
      // Transform the response to match our Customer interface
      const customers: Customer[] = result.querySchema.data.map((item: CustomerResponse) => ({
        id: item.id,
        name: item.name,
        netWorth: item.netWorth,
      }));

      return customers;
    }

    return [];
    
  } catch (error) {
    console.error('Error fetching customers:', error);
    
    // Fallback to empty array if API fails
    // In production, you might want to show an error message to the user
    return [];
  }
};

/**
 * Updates an existing customer via GraphQL
 * @param customerId - The ID of the customer to update
 * @param customerData - The updated customer data
 * @returns Promise that resolves when customer is updated
 */
export const updateCustomer = async (customerId: string, customerData: Partial<Customer>): Promise<void> => {
  try {
    const variables = {
      collectionName: CUSTOMER_API_CONFIG.COLLECTION_NAME,
      schemaName: CUSTOMER_API_CONFIG.SCHEMA_NAME,
      projectKey: CUSTOMER_API_CONFIG.PROJECT_KEY,
      id: customerId,
      data: {
        name: customerData.name,
        netWorth: customerData.netWorth,
      },
    };

    const result = await graphqlClient.mutate<CustomerMutationResult>(
      CUSTOMER_MUTATIONS.UPDATE_CUSTOMER,
      variables
    );

    if (!result.updateSchemaItem) {
      throw new Error('Failed to update customer: No response data');
    }
    
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

/**
 * Deletes a customer via GraphQL
 * @param customerId - The ID of the customer to delete
 * @returns Promise that resolves when customer is deleted
 */
export const deleteCustomer = async (customerId: string): Promise<void> => {
  try {
    const variables = {
      collectionName: CUSTOMER_API_CONFIG.COLLECTION_NAME,
      schemaName: CUSTOMER_API_CONFIG.SCHEMA_NAME,
      projectKey: CUSTOMER_API_CONFIG.PROJECT_KEY,
      id: customerId,
    };

    const result = await graphqlClient.mutate<CustomerMutationResult>(
      CUSTOMER_MUTATIONS.DELETE_CUSTOMER,
      variables
    );

    if (!(result.deleteSchemaItem && result.deleteSchemaItem.success)) {
      throw new Error(`Failed to delete customer: ${result.deleteSchemaItem?.message || 'Unknown error'}`);
    }
    
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
}; 
