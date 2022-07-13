import React, { Fragment, Suspense } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAccountInformationPage } from '@magento/peregrine/lib/talons/AccountInformationPage/useAccountInformationPage';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Button from '../Button';
import { Message } from '../Field';
import AccountSideBar from '../AccountSideBar';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import defaultClasses from './accountInformationPage.module.css';
import AccountInformationPageOperations from './accountInformationPage.gql.js';

const EditModal = React.lazy(() => import('./editModal'));

const AccountInformationPage = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const talonProps = useAccountInformationPage({
        ...AccountInformationPageOperations
    });

    const {
        handleCancel,
        formErrors,
        handleChangePassword,
        handleSubmit,
        initialValues,
        isDisabled,
        isUpdateMode,
        loadDataError,
        shouldShowNewPassword,
        showUpdateMode,
        recaptchaWidgetProps
    } = talonProps;
    const { formatMessage } = useIntl();

    const errorMessage = loadDataError ? (
        <Message>
            <FormattedMessage
                id={'accountInformationPage.errorTryAgain'}
                defaultMessage={
                    'Something went wrong. Please refresh and try again.'
                }
            />
        </Message>
    ) : null;

    let pageContent = null;
    if (!initialValues) {
        return fullPageLoadingIndicator;
    } else {
        const { customer } = initialValues;
        const customerName = `${customer.firstname} ${customer.lastname}`;
        const passwordValue = '***********';

        pageContent = (
            <Fragment>
                <div className={classes.cont}>
                    <div className={classes.row}>
                        <AccountSideBar classes={classes.sidebar}/>
                        <div className={classes.accountDetails}>
                            <h1
                                className={classes.title}
                                data-cy="AccountInformationPage-title"
                            >
                                <FormattedMessage
                                    id={'accountInformationPage.accountInformation'}
                                    defaultMessage={'Account Information'}
                                />
                            </h1>
                            <div className={classes.lineItemsContainer}>
                                <div className={classes.fControl}>
                                    <span className={classes.nameLabel}>
                                        <FormattedMessage
                                            id={'global.name'}
                                            defaultMessage={'Name'}
                                        />
                                    </span>
                                    <span className={classes.nameValue}>
                                        {customerName}
                                    </span>
                                </div>
                                <div className={classes.fControl}>
                                    <span className={classes.emailLabel}>
                                        <FormattedMessage
                                            id={'global.email'}
                                            defaultMessage={'Email'}
                                        />
                                    </span>
                                    <span className={classes.emailValue}>
                                        {customer.email}
                                    </span>
                                </div>
                                <div className={classes.fControl}>
                                    <span className={classes.passwordLabel}>
                                        <FormattedMessage
                                            id={'global.password'}
                                            defaultMessage={'Password'}
                                        />
                                    </span>
                                    <span className={classes.passwordValue}>
                                        {passwordValue}
                                    </span>
                                </div>
                            </div>
                            <div className={classes.editButtonContainer}>
                                <Button
                                    className={classes.editInformationButton}
                                    disabled={false}
                                    onClick={showUpdateMode}
                                    priority="normal"
                                    data-cy="AccountInformationPage-editInformationButton"
                                >
                                    <FormattedMessage
                                        id={'global.editButton'}
                                        defaultMessage={'Edit'}
                                    />
                                </Button>
                            </div>
                        </div>
                        <Suspense fallback={null}>
                            <EditModal
                                formErrors={formErrors}
                                initialValues={customer}
                                isDisabled={isDisabled}
                                isOpen={isUpdateMode}
                                onCancel={handleCancel}
                                onChangePassword={handleChangePassword}
                                onSubmit={handleSubmit}
                                shouldShowNewPassword={shouldShowNewPassword}
                                recaptchaWidgetProps={recaptchaWidgetProps}
                            />
                        </Suspense>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'accountInformationPage.titleAccount',
                    defaultMessage: 'Account Information'
                })}
            </StoreTitle>
            {errorMessage ? errorMessage : pageContent}
        </div>
    );
};

export default AccountInformationPage;
