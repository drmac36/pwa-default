import React from 'react';

import { setContentTypeConfig } from '@magento/pagebuilder/lib/config';
import NewsletterContentTypeConfig from './ContentType/Newsletter';

// add custom page builder content type
//https://github.com/magento/pwa-studio/pull/2131

setContentTypeConfig('newsletter', NewsletterContentTypeConfig)

const pagebuilderNewsletter = (props) => {
    return null;
};

export default pagebuilderNewsletter;