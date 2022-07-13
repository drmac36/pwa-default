import React, { Fragment } from 'react';
import { Facebook, Instagram, Twitter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

import Logo from '@magento/venia-ui/lib/components/Logo';
import CmsBlock from '@magento/venia-ui/lib/components/CmsBlock';
import Newsletter from '../Newsletter';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './footer.module.css';
import { DEFAULT_LINKS, LOREM_IPSUM } from '@magento/venia-ui/lib/components/Footer/sampleData';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

const Footer = props => {
    const { links } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useFooter();

    const { copyrightText } = talonProps;

    return (
        <footer data-cy="Footer-root" className={classes.root}>
            { props.footerCms ?
                <CmsBlock identifiers={[props.footerCms]} />
                : null
            }
        </footer>
    );
};

export default Footer;

Footer.defaultProps = {
    links: DEFAULT_LINKS
};

Footer.propTypes = {
    classes: shape({
        root: string
    })
};
