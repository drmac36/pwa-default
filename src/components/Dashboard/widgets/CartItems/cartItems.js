import React, { Fragment, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
    AlertCircle as AlertCircleIcon
} from 'react-feather';
import { bool, shape, string } from 'prop-types';

import { useScrollLock, Price, useToasts } from '@magento/peregrine';
import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@magento/venia-ui/lib/components/Icon';
import StockStatusMessage from '@magento/venia-ui/lib/components/StockStatusMessage';
import ProductList from './ProductList';
import defaultClasses from './cartItems.module.css';
import operations from './cartItems.gql';
import { ChevronRight as RightIcon } from 'react-feather';
import { ShoppingCart as ShoppingCartIcon } from 'react-feather';
import widgetClasses from '../widgets.module.css';
import { Link } from 'react-router-dom';

const errorIcon = <Icon src={AlertCircleIcon} size={20} />;

/**
 * The MiniCart component shows a limited view of the user's cart.
 *
 * @param {Boolean} props.isOpen - Whether or not the MiniCart should be displayed.
 * @param {Function} props.setIsOpen - Function to toggle mini cart
 */
const CartItems = React.forwardRef((props, ref) => {
    const { isOpen, setIsOpen } = props;

    // Prevent the page from scrolling in the background
    // when the MiniCart is open.
    useScrollLock(isOpen);

    const talonProps = useMiniCart({
        setIsOpen,
        operations
    });

    const {
        errorMessage,
        loading,
        productList,
        totalQuantity,
        configurableThumbnailSource,
        storeUrlSuffix
    } = talonProps;

    const classes = useStyle(defaultClasses, widgetClasses);
    const [itemState, setItemState] = useState(true);
    const doToggle = (e, id, active) => {
        setItemState(!itemState);
    }

    const toggleIconClass = itemState ? classes.toggleIconOpened : classes.toggleIcon;
    const toggleBodyClass = itemState ? classes.body : classes.bodyClosed;
    const priceClassName = loading ? classes.price_loading : classes.price;

    const isCartEmpty = !(productList && productList.length);

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (errorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: errorMessage,
                dismissable: true,
                timeout: 7000
            });
        }
    }, [addToast, errorMessage]);

    const contents = isCartEmpty ? (
        <div className={classes.emptyCart}>
            <div
                className={classes.emptyMessage}
                data-cy="CartItems-emptyMessage"
            >
                <FormattedMessage
                    id={'miniCart.emptyMessage'}
                    defaultMessage={'There are no items in your cart.'}
                />
            </div>
        </div>
    ) : (
        <Fragment>
            <div className={classes.bodys} data-cy="CartItems-body">
                <ProductList
                    items={productList}
                    loading={loading}
                    configurableThumbnailSource={configurableThumbnailSource}
                    storeUrlSuffix={storeUrlSuffix}
                />
            </div>
        </Fragment>
    );

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <span className={classes.headerIcon}>
                    <Icon src={ShoppingCartIcon} classes={{ icon: classes.titleIcon }}  />
                </span>
                <span className={classes.title}>
                    <FormattedMessage
                        id={'miniCart.totalQuantity'}
                        defaultMessage={'Cart - {totalQuantity} Items'}
                        values={{ totalQuantity }}
                    />
                </span>
                <button type="button" className={classes.btnToggle} onClick={(e) => doToggle()}>
                    <Icon src={RightIcon} classes={{ icon: toggleIconClass }}  />
                </button>
            </div>
            <div className={toggleBodyClass}>
                <div className={classes.orders}>
                    {contents}
                </div>
            </div>
            <div className={classes.footer}>
                <Link
                    data-cy="LatestOrdersPage-link"
                    className={classes.link}
                    to="/cart"
                >
                    <FormattedMessage id={'LatestOrders.latestOrdersLink'} defaultMessage="View Cart Page" />
                </Link>
            </div>
        </div>
    );
});

export default CartItems;

CartItems.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        contents: string,
        contents_open: string,
        header: string,
        body: string,
        footer: string,
        checkoutButton: string,
        editCartButton: string,
        emptyCart: string,
        emptyMessage: string,
        stockStatusMessageContainer: string
    }),
    isOpen: bool
};
