import React, { useCallback, useState, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FormattedMessage, useIntl } from 'react-intl';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { ChevronRight as RightIcon } from 'react-feather';
import { User as UserIcon } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import widgetClasses from '../widgets.module.css';
import defaultClasses from './accountInformation.module.css';
import { Link } from 'react-router-dom';
import DEFAULT_OPERATIONS from './accountInformation.gql.js';

const AccountInformation = props => {
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
            return { isSubscribed: customerData };
        }
    }, [customerData]);

    const doToggle = (e, id, active) => {
        setItemState(!itemState);
    }
    const toggleIconClass = itemState ? classes.toggleIconOpened : classes.toggleIcon;
    const toggleBodyClass = itemState ? classes.body : classes.bodyClosed;
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <span className={classes.headerIcon}>
                    <Icon src={UserIcon} classes={{ icon: classes.titleIcon }}  />
                </span>
                <span className={classes.title}>
                    <FormattedMessage
                        id={'accountInformation.titleText'}
                        defaultMessage={'Account Information'}
                    />
                </span>
                <button type="button" className={classes.btnToggle} onClick={(e) => doToggle()}>
                    <Icon src={RightIcon} classes={{ icon: toggleIconClass }}  />
                </button>
            </div>
            <div className={toggleBodyClass}>
                <p className={classes.welcomeMessage}>
                    <FormattedMessage
                        id={'accountInformation.welcome'}
                        defaultMessage={'Welcome, '}
                    />
                    {customerData?.customer.firstname + ' ' + customerData?.customer.lastname}
                </p>
                <div>
                    <span className={classes.label}>
                        <FormattedMessage
                            id={'accountInformation.userFName'}
                            defaultMessage={'First Name: '}
                        />
                    </span>
                    <span className={classes.name}>{customerData?.customer.firstname}</span>
                </div>
                <div>
                    <span className={classes.label}>
                        <FormattedMessage
                            id={'accountInformation.userLName'}
                            defaultMessage={'Last Name: '}
                        />
                    </span>
                    <span className={classes.name}>{customerData?.customer.lastname}</span>
                </div>
                <div>
                    <span className={classes.label}>
                        <FormattedMessage
                            id={'accountInformation.userEmail'}
                            defaultMessage={'Email Address: '}
                        />
                    </span>
                    <span className={classes.name}>{customerData?.customer.email}</span>
                </div>
            </div>
            <div className={classes.footer}>
                <Link
                    data-cy="AccountInformationPage-link"
                    className={classes.link}
                    to="/account-information"
                >
                    <FormattedMessage id={'accountInformation.accountInfoLink'} defaultMessage="Edit" />
                </Link>
            </div>
        </div>
    );
};

export default AccountInformation;
