import React , { useState } from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAccountMenu } from './useAccountMenu';
import { List as ListIcon } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { useStyle } from '@magento/venia-ui/lib/classify';
import AccountSideBarMenuItems from './accountSideBarMenuItems';
import defaultClasses from './accountSideBar.module.css';

const AccountSideBar = React.forwardRef((props, ref) => {
    const { formatMessage } = useIntl();
    const { accountMenuIsOpen, setAccountMenuIsOpen } = props;
    const [itemState, setItemState] = useState(false);
    const talonProps = useAccountMenu({
        accountMenuIsOpen,
        setAccountMenuIsOpen
    });
    const {
        view,
        handleSignOut
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    let dropdownContents = null;

    const doToggle = (e, id, active) => {
        setItemState(!itemState);
    }

    const toggleIconClass = itemState ? classes.toggleIconOpened : classes.toggleIcon;

    dropdownContents = <AccountSideBarMenuItems onSignOut={handleSignOut}/>;

    return (
        <aside className={props.classes} data-cy="accountSideBar-root">
            <div ref={ref} className={classes.root}>
                <div className={classes.header}>
                    <span className={classes.title}>
                        <FormattedMessage
                            id={'accountSideBar.titleText'}
                            defaultMessage={'Account Menu'}
                        />
                    </span>
                    <button type="button" className={classes.btnToggle} onClick={(e) => doToggle()}>
                        <Icon src={ListIcon} classes={{ icon: toggleIconClass }}  />
                    </button>
                </div>
                <div className={classes.body}>
                    {dropdownContents}
                </div>
            </div>
        </aside>
    );
});

export default AccountSideBar;

AccountSideBar.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        link: string,
        contents_open: string,
        contents: string
    })
};
