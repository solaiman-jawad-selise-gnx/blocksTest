import { menuItems } from './sidebar-menu';

describe('sidebar-menu', () => {
  it('should have the correct number of menu items', () => {
    expect(menuItems.length).toBe(2);
  });

  it('should have IAM menu item', () => {
    const iamItem = menuItems.find(item => item.id === 'iam');
    expect(iamItem).toBeDefined();
    expect(iamItem?.name).toBe('IAM');
    expect(iamItem?.path).toBe('/identity-management');
  });

  it('should have customers menu item', () => {
    const customersItem = menuItems.find(item => item.id === 'customers');
    expect(customersItem).toBeDefined();
    expect(customersItem?.name).toBe('customers');
    expect(customersItem?.path).toBe('/customers');
  });
});
