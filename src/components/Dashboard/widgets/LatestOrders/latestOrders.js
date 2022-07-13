import React, { useCallback, useState, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FormattedMessage, useIntl } from 'react-intl';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { ChevronRight as RightIcon } from 'react-feather';
import { Printer as PrinterIcon } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import widgetClasses from '../widgets.module.css';
import defaultClasses from './latestOrders.module.css';
import { Link } from 'react-router-dom';
import DEFAULT_OPERATIONS from './latestOrders.gql.js';

const LatestOrders = props => {
    const { formatMessage } = useIntl();
    const [{ isSignedIn }] = useUserContext();
    const classes = useStyle(defaultClasses, widgetClasses);
    const [itemState, setItemState] = useState(true);
    
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getCustomerInformationQuery
    } = operations;

    const { data: customerData, error: customerDataError } = useQuery(
        getCustomerInformationQuery,
        { skip: !isSignedIn }
    );

    const initialValues = useMemo(() => {
        if (customerData) {
            return { orders: customerData.customer.orders.items };
        }
    }, [customerData?.customer]);

    let ordersContent = null;
    if (!initialValues) {
        return null;
    } else {
        const { orders } = initialValues;
        ordersContent = (
            orders?.map((order) => (
                <div className={classes.item} key={order.id}>
                    <div className={classes.value}>{order.id}</div>
                    <div className={classes.value}>{order.order_date}</div>
                    <div className={classes.value}>{order.total.grand_total.value + order.total.grand_total.currency}</div>
                    <div className={classes.state}>{order.status}</div>
                </div>
            ))
        );
    }

    const doToggle = (e, id, active) => {
        setItemState(!itemState);
    }

    const toggleIconClass = itemState ? classes.toggleIconOpened : classes.toggleIcon;
    const toggleBodyClass = itemState ? classes.body : classes.bodyClosed;
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <span className={classes.headerIcon}>
                    <Icon src={PrinterIcon} classes={{ icon: classes.titleIcon }}  />
                </span>
                <span className={classes.title}>
                    <FormattedMessage
                        id={'LatestOrders.titleText'}
                        defaultMessage={'Latest Orders'}
                    />
                </span>
                <button type="button" className={classes.btnToggle} onClick={(e) => doToggle()}>
                    <Icon src={RightIcon} classes={{ icon: toggleIconClass }}  />
                </button>
            </div>
            <div className={toggleBodyClass}>
                <div className={classes.orders}>
                    <div className={classes.tableTitles}>
                        <div className={classes.tableTitle}><FormattedMessage id={'LatestOrders.latestOrdersId'} defaultMessage="Id" /></div>
                        <div className={classes.tableTitle}><FormattedMessage id={'LatestOrders.latestOrdersDate'} defaultMessage="Date" /></div>
                        <div className={classes.tableTitle}><FormattedMessage id={'LatestOrders.latestOrdersPrice'} defaultMessage="Price" /></div>
                        <div className={classes.tableTitle}><FormattedMessage id={'LatestOrders.latestOrdersStatus'} defaultMessage="Status" /></div>
                    </div>
                    {ordersContent}
                </div>
            </div>
            <div className={classes.footer}>
                <Link
                    data-cy="LatestOrdersPage-link"
                    className={classes.link}
                    to="/order-history"
                >
                    <FormattedMessage id={'LatestOrders.latestOrdersLink'} defaultMessage="View All" />
                </Link>
            </div>
        </div>
    );
};

export default LatestOrders;
