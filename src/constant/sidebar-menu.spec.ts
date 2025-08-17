import { menuItems } from '../constant/sidebar-menu';

describe('menuItems', () => {
  test('should have the correct structure', () => {
    expect(Array.isArray(menuItems)).toBe(true);
    expect(menuItems.length).toBe(3);
  });

  test('each menu item should have required properties', () => {
    menuItems.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('path');
      expect(item).toHaveProperty('icon');
      expect(typeof item.id).toBe('string');
      expect(typeof item.name).toBe('string');
      expect(typeof item.path).toBe('string');
      expect(typeof item.icon).toBe('string');
    });
  });

  test('IAM item should be integrated', () => {
    const iamItem = menuItems.find((item) => item.id === 'iam');
    expect(iamItem).toBeDefined();
    if (iamItem) {
      expect(iamItem.isIntegrated).toBe(true);
    }
    if (iamItem) {
      expect(iamItem.name).toBe('IAM');
      expect(iamItem.path).toBe('/identity-management');
      expect(iamItem.icon).toBe('Users');
    }
  });

  test('Inventory item should be integrated', () => {
    const inventoryItem = menuItems.find((item) => item.id === 'inventory');
    expect(inventoryItem).toBeDefined();
    if (inventoryItem) {
      expect(inventoryItem.isIntegrated).toBe(true);
    }
    if (inventoryItem) {
      expect(inventoryItem.name).toBe('INVENTORY');
      expect(inventoryItem.path).toBe('/inventory');
      expect(inventoryItem.icon).toBe('Store');
    }
  });

  test('Customers item should be integrated', () => {
    const customersItem = menuItems.find((item) => item.id === 'customers');
    expect(customersItem).toBeDefined();
    if (customersItem) {
      expect(customersItem.isIntegrated).toBe(true);
    }
    if (customersItem) {
      expect(customersItem.name).toBe('CUSTOMERS');
      expect(customersItem.path).toBe('/customers');
      expect(customersItem.icon).toBe('User');
    }
  });

  test('all paths should start with a slash', () => {
    menuItems.forEach((item) => {
      expect(item.path.startsWith('/')).toBe(true);
    });
  });
});
