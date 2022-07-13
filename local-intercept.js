/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

function localIntercept(targets) {
    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push({
            name: 'Cart',
            pattern: '/cart',
            exact: true,
            path: require.resolve('./src/components/CartPage')
        });
        routes.push({
            name: 'CheckoutPage',
            pattern: '/checkout',
            exact: true,
            path: require.resolve('./src/components/CheckoutPage')
        });
        routes.push({
            name: 'Dashboard',
            pattern: '/dashboard',
            exact: true,
            path: require.resolve('./src/components/Dashboard'),
            authed: true,
            redirectTo: "/sign-in"
        });
        routes.push({
            name: 'AccountInformationPage',
            pattern: '/account-information',
            exact: true,
            path: require.resolve('./src/components/AccountInformationPage'),
            authed: true,
            redirectTo: "/sign-in"
        });
        routes.push({
            name: 'CommunicationsPage',
            pattern: '/communications',
            exact: true,
            path: require.resolve('./src/components/CommunicationsPage'),
            authed: true,
            redirectTo: "/sign-in"
        });
        routes.push({
            name: 'AddressBook',
            pattern: '/address-book',
            exact: true,
            path: require.resolve('./src/components/AddressBookPage'),
            authed: true,
            redirectTo: "/sign-in"
        });
        routes.push({
            name: 'WishlistPage',
            pattern: '/wishlist',
            exact: true,
            path: require.resolve('./src/components/WishlistPage'),
            authed: true,
            redirectTo: "/sign-in"
        });
        routes.push({
            name: 'OrderHistory',
            pattern: '/order-history',
            exact: true,
            path: require.resolve('./src/components/OrderHistoryPage'),
            authed: true,
            redirectTo: "/sign-in"
        });
        routes.push({
            name: 'SavedPayments',
            pattern: '/saved-payments',
            exact: true,
            path: require.resolve('./src/components/SavedPaymentsPage'),
            authed: true,
            redirectTo: "/sign-in"
        });
        return routes;
    });
    targets.of('@magento/venia-ui').richContentRenderers.tap(richContentRenderers => {
        richContentRenderers.add({
            componentName: 'newsletter',
            importPath: require.resolve("./src/components/PagebuilderNewsletter")
        });
    });
}

module.exports = localIntercept;
