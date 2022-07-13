import React, { Fragment, Suspense, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { shape, string } from 'prop-types';
import { Heart as HeartIcon } from 'react-feather';
import { useIntl } from 'react-intl';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { Link } from 'react-router-dom';
import { useStyle } from '@magento/venia-ui/lib/classify';
import MiniWishlist from '../MiniWishlist';
import Icon from '@magento/venia-ui/lib/components/Icon';
import defaultClasses from './wishlistTrigger.module.css';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from '../MiniWishlist/miniWishlist.gql';

const MiniCart = React.lazy(() => import('../MiniCart'));

const WishlistTrigger = props => {

    const [{ isSignedIn }] = useUserContext();


    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const [itemCount, setItemCount] = useState();

    const [itemState, setItemState] = useState(false);

    const doToggle = (e, id, active) => {
        setItemState(!itemState);
    }

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
            setItemCount(wishlist.wishlist.items_count);
        }
    }, [wishlist]);

    const maybeItemCounter = itemCount ? (
        <span className={classes.counter} data-cy="CartTrigger-counter">
            {itemCount}
        </span>
    ) : null;

    const miniWishlistContent = isSignedIn ? 
    (
        <div className={classes.dropdownContainer}>
            <button className={classes.link} onClick={doToggle}>
                <Icon src={HeartIcon} />
                {maybeItemCounter}
            </button>
            <MiniWishlist menuState={itemState} wishlist={wishlist} />
        </div>
    ) :
    (
        <Fragment>
            <Link
                data-cy="wishlistTrigger-link"
                className={classes.link}
                to="/wishlist"
            >
                <Icon src={HeartIcon} />
            </Link>
        </ Fragment>
    )

    return miniWishlistContent;
};

export default WishlistTrigger;

WishlistTrigger.propTypes = {
    classes: shape({
        counter: string,
        link: string,
        openIndicator: string,
        root: string,
        trigger: string,
        triggerContainer: string
    })
};
