import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { useToasts } from '@magento/peregrine';
import AccountSideBar from '../AccountSideBar';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import defaultClasses from './dashboard.module.css';
/* components */
import AccountInformation from './widgets/AccountInformation';
import LatestOrders from './widgets/LatestOrders';
import Addresses from './widgets/Addresses';
import CartItems from './widgets/CartItems';
import WishlistWidget from './widgets/WishlistWidget';

const Dashboard = props => {
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);

    const title = formatMessage({
        id: 'dashboard.title',
        defaultMessage: 'Dashboard'
    });

    return (
        <div className={classes.cont}>
            <div className={classes.row}>
                <AccountSideBar classes={classes.sidebar} />
                <div className={classes.root}>
                    <StoreTitle>{title}</StoreTitle>
                    <h1 className={classes.title}>
                        <FormattedMessage
                            id={'dashboard.communicationsText'}
                            defaultMessage={'dashboard'}
                        />
                    </h1>
                    <AccountInformation />
                    <LatestOrders />
                    <Addresses />
                </div>
                <div className={classes.megaSidebar}>
                    <CartItems />
                    <WishlistWidget />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
