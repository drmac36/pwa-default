import React, { useCallback, useState, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FormattedMessage, useIntl } from 'react-intl';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { ChevronRight as RightIcon } from 'react-feather';
import { Truck as TruckIcon } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import widgetClasses from '../widgets.module.css';
import defaultClasses from './addresses.module.css';
import { Link } from 'react-router-dom';
import DEFAULT_OPERATIONS from './addresses.gql.js';

const Addresses = props => {
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
            return { addresses: customerData.customer.addresses };
        }
    }, [customerData?.customer]);

    let addressesContent = null;
    if (!initialValues) {
        return null;
    } else {
        const { addresses } = initialValues;
        addressesContent = (
            addresses?.map((address) => (
                <div className={classes.item} key={address.id}>
                    <div className={classes.value}>{address.firstname + ' ' + address.lastname}</div>
                    <div className={classes.value}>
                        <div>{address.street}</div>
                        <div>{address.city + ', ' + address.postcode}</div>
                        <div>{address.region.region}</div>
                    </div>
                    <div className={classes.value}>{address.telephone}</div>
                    <div className={classes.state}>
                        {address.default_shipping ?
                            <span>
                                <FormattedMessage
                                    id={'Addresses.shippingState'}
                                    defaultMessage={'Default Shipping'}
                                />
                            </span> : null
                        }
                        {address.default_billing ?
                            <span>
                                <FormattedMessage
                                    id={'Addresses.billingState'}
                                    defaultMessage={'Default Billing'}
                                />
                            </span> : null
                        }
                    </div>
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
                    <Icon src={TruckIcon} classes={{ icon: classes.titleIcon }}  />
                </span>
                <span className={classes.title}>
                    <FormattedMessage
                        id={'Addresses.titleText'}
                        defaultMessage={'Shipping And Billing Addresses'}
                    />
                </span>
                <button type="button" className={classes.btnToggle} onClick={(e) => doToggle()}>
                    <Icon src={RightIcon} classes={{ icon: toggleIconClass }}  />
                </button>
            </div>
            <div className={toggleBodyClass}>
                <div className={classes.addresses}>
                    <div className={classes.tableTitles}>
                        <div className={classes.tableTitle}><FormattedMessage id={'Address.AddressName'} defaultMessage="Name" /></div>
                        <div className={classes.tableTitle}><FormattedMessage id={'Address.Address'} defaultMessage="Address" /></div>
                        <div className={classes.tableTitle}><FormattedMessage id={'Address.AddressPhone'} defaultMessage="Phone No" /></div>
                        <div className={classes.tableTitle}><FormattedMessage id={'Address.AddressStatus'} defaultMessage="Status" /></div>
                    </div>
                    {addressesContent}
                </div>
            </div>
            <div className={classes.footer}>
                <Link
                    data-cy="AddressesPage-link"
                    className={classes.link}
                    to="/address-book"
                >
                    <FormattedMessage id={'Addresses.AddressesLink'} defaultMessage="View All" />
                </Link>
            </div>
        </div>
    );
};

export default Addresses;
