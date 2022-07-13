import React from 'react';

import { setContentTypeConfig } from '@magento/pagebuilder/lib/config';
import CustomSliderContentTypeConfig from './ContentTypes/CustomSlider';

// add custom page builder content type
//https://github.com/magento/pwa-studio/pull/2131

export default () => {
    setContentTypeConfig('CustomSlider', CustomSliderContentTypeConfig)
};

const newsletter = (props) => {
    return null;
};

export default newsletter;