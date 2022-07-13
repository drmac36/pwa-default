import React, { Fragment, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { bool, shape, string } from 'prop-types';

import { Price, useToasts } from '@magento/peregrine';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@magento/venia-ui/lib/components/Icon';
import defaultClasses from './miniWishlist.module.css';
import { ChevronRight as RightIcon } from 'react-feather';
import { Heart as HeartIcon } from 'react-feather';
import { Link } from 'react-router-dom';
import WishlistItem from './wishlistItem';

/**
 * The MiniCart component shows a limited view of the user's cart.
 *
 * @param {Boolean} props.isOpen - Whether or not the MiniCart should be displayed.
 * @param {Function} props.setIsOpen - Function to toggle mini cart
 */
const MiniWishlist = props => {

    const [{ isSignedIn }] = useUserContext();

    const initialValues = useMemo(() => {
        if (props.wishlist) {
            console.log(props.wishlist);
            return props.wishlist.wishlist.items.map(item => {
                return (
                    <WishlistItem
                        key={item.id}
                        item={item}
                    />
                );
            });
        }
    }, [props.wishlist]);
    
    const classes = useStyle(defaultClasses);

    const toggleBodyClass = props.menuState ? classes.root : classes.rootClosed;
    const [{ addToast }] = useToasts();

    return (
        <div className={toggleBodyClass}>
            <div className={classes.items}>
                {initialValues}
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

export default MiniWishlist;

MiniWishlist.propTypes = {
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
