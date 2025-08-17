/**
 * A mapping of application routes to their corresponding i18n translation module names.
 * Each route is mapped to an array of module names that should be loaded for that route.
 *
 * @type {Record<string, string[]>}
 * @property {string[]} [key] - The application route path
 * @property {string[]} [value] - Array of module names to load for the route
 *                                Always includes 'common' as the base module
 *                                followed by route-specific module names
 */
export const routeModuleMap: Record<string, string[]> = {
  '/identity-management': ['common', 'iam'],
  '/customers': ['common', 'customers'],
};
