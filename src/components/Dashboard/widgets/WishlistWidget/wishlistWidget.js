import React, { Fragment, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { bool, shape, string } from 'prop-types';

import { Price, useToasts } from '@magento/peregrine';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@magento/venia-ui/lib/components/Icon';
import defaultClasses from './wishlistWidget.module.css';
import { ChevronRight as RightIcon } from 'react-feather';
import { Heart as HeartIcon } from 'react-feather';
import widgetClasses from '../widgets.module.css';
import { Link } from 'react-router-dom';
import WishlistItem from './wishlistItem';
import DEFAULT_OPERATIONS from './wishlistWidget.gql';

/**
 * The MiniCart component shows a limited view of the user's cart.
 *
 * @param {Boolean} props.isOpen - Whether or not the MiniCart should be displayed.
 * @param {Function} props.setIsOpen - Function to toggle mini cart
 */
const WishlistWidget = props => {

    const [{ isSignedIn }] = useUserContext();
    
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getWishlistQuery
    } = operations;

    const { data: wishlist, error: wishlistError } = useQuery(
        getWishlistQuery,
        { skip: !isSignedIn }
    );

    const initialValues = useMemo(() => {
        if (wishlist) {
            return wishlist.wishlist.items.map(item => {
                return (
                    <WishlistItem
                        key={item.id}
                        item={item}
                    />
                );
            });
        }
    }, [wishlist]);

    const doToggle = (e, id, active) => {
        setItemState(!itemState);
    }

    const classes = useStyle(defaultClasses, widgetClasses);
    const [itemState, setItemState] = useState(true);

    const toggleIconClass = itemState ? classes.toggleIconOpened : classes.toggleIcon;
    const toggleBodyClass = itemState ? classes.body : classes.bodyClosed;
    const [{ addToast }] = useToasts();

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <span className={classes.headerIcon}>
                    <Icon src={HeartIcon} classes={{ icon: classes.titleIcon }}  />
                </span>
                <span className={classes.title}>
                    <FormattedMessage
                        id={'miniCart.totalQuantity'}
                        defaultMessage={'Wishlist'}
                    />
                </span>
                <button type="button" className={classes.btnToggle} onClick={(e) => doToggle()}>
                    <Icon src={RightIcon} classes={{ icon: toggleIconClass }}  />
                </button>
            </div>
            <div className={toggleBodyClass}>
                <div className={classes.orders}>
                    {initialValues}
                </div>
            </div>
            <div className={classes.footer}>
                <Link
                    data-cy="LatestOrdersPage-link"
                    className={classes.link}
                    to="/wishlist"
                >
                    <FormattedMessage id={'wishlistItems.wishlistLink'} defaultMessage="View Wishlist Page" />
                </Link>
            </div>
        </div>
    );
};

export default WishlistWidget;

WishlistWidget.propTypes = {
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
