import React, { Fragment, Suspense, useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { Link, Route } from 'react-router-dom';

import Logo from '@magento/venia-ui/lib/components/Logo';
import AccountTrigger from './accountTrigger';
import CartTrigger from './cartTrigger';
import WishlistTrigger from './wishlistTrigger';
import NavTrigger from './navTrigger';
import SearchTrigger from '@magento/venia-ui/lib/components/Header/searchTrigger';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { X as XIcon } from 'react-feather';
import { Menu as MenuIcon } from 'react-feather';
import CmsBlock from '@magento/venia-ui/lib/components/CmsBlock';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './header.module.css';
import StoreSwitcher from '@magento/venia-ui/lib/components/Header/storeSwitcher';
import CurrencySwitcher from '@magento/venia-ui/lib/components/Header/currencySwitcher';
import MegaMenu from '../MegaMenu';
import PageLoadingIndicator from '@magento/venia-ui/lib/components/PageLoadingIndicator';

const SearchBar = React.lazy(() => import('../SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useHeader();

    const [topMessage, setTopMessage] = useState(true);
    const [navOpened, setNavOpened] = useState(false);

    const classes = useStyle(defaultClasses, props.classes);
    const rootClass = isSearchOpen ? classes.open : classes.closed;
    const topMessageClass = topMessage ? classes.top_message : classes.top_message_closed;
    const navClass = navOpened ? classes.navigationOpened : classes.navigation;

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader}>
                    <div className={classes.loaderBefore} />
                    <div className={classes.loaderAfter} />
                </div>
            </div>
        </div>
    );
    useEffect(() => {
        setNavOpened(false);
    }, [location.pathname]);
    const closeTopMessage = () => {
        setTopMessage(false);
    };
    const navOpen =() => {
        setNavOpened(!navOpened);
    };
    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;

    return (
        <Fragment>
            { props.topHeaderCms ?
                <div className={topMessageClass}>
                    <div className={classes.message}>
                        <CmsBlock identifiers={[props.topHeaderCms]}/>
                    </div>
                    <button type="button" onClick={closeTopMessage} className={classes.close_btn}>
                        <Icon src={XIcon} classes={{ icon: classes.close_icon }}  />
                    </button>
                </div>
                : null
            }
            <div className={classes.switchersContainer}>
                <div className={classes.switchers} data-cy="Header-switchers">
                    <StoreSwitcher />
                    <CurrencySwitcher />
                </div>
            </div>
            <header className={rootClass} data-cy="Header-root">
                <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <button type="button" onClick={navOpen} className={classes.navTrigger}>
                            <Icon src={MenuIcon} classes={{ icon: classes.navIcon }}  />
                        </button>
                    </div>
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <Link
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                        data-cy="Header-logoContainer"
                    >
                        <Logo classes={{ logo: classes.logo }} />
                    </Link>
                    <div className={classes.secondaryActions}>
                        <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        />
                        <AccountTrigger />
                        <WishlistTrigger />
                        <CartTrigger />
                    </div>
                </div>
                {searchBar}
                <MegaMenu classes={navClass} navState={navOpened} navOpen={navOpen}/>
                <PageLoadingIndicator absolute />
            </header>
        </Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};

export default Header;
