function localIntercept(targets) {
    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push({
            name: 'Cart',
            pattern: '/cart',
            exact: true,
            path: require.resolve('./src/components/CartPage')
        });
        return routes;
    });
}

module.exports = localIntercept;