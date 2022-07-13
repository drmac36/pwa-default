import React from 'react';
import { func, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useAccountMenuItems } from './useAccountMenuItems';

import defaultClasses from './accountSideBarMenuItems.module.css';

const AccountSideBarMenuItems = props => {
    const { onSignOut } = props;

    const talonProps = useAccountMenuItems({ onSignOut });
    const { handleSignOut, menuItems } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    const menu = menuItems.map(item => {
        return (
            <Link
                data-cy="AccountSideBarMenuItems-link"
                className={classes.link}
                key={item.name}
                to={item.url}
            >
                <FormattedMessage id={item.id} defaultMessage={item.name} />
            </Link>
        );
    });

    return (
        <div className={classes.root} data-cy="AccountSideBarMenuItems-root">
            {menu}
            <button
                className={classes.signOut}
                onClick={handleSignOut}
                type="button"
                data-cy="AccountSideBarMenuItems-signOut"
            >
                <FormattedMessage
                    id={'accountMenu.signOutButtonText'}
                    defaultMessage={'Sign Out'}
                />
            </button>
        </div>
    );
};

export default AccountSideBarMenuItems;

AccountSideBarMenuItems.propTypes = {
    classes: shape({
        link: string,
        signOut: string
    }),
    onSignOut: func
};
