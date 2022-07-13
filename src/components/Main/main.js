import React, {useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from './main.gql';
import { Link } from '@magento/venia-ui/lib/components/Head';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Footer from '../Footer';
import Header from '../Header';
import defaultClasses from '@magento/venia-ui/lib/components/Main/main.module.css';

const Main = props => {
    const { children, isMasked } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;
    const [defaultBlocks, setDefaultBlocks] = useState({topHeaderCms: null, footerCms: null});

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        getDefaultSetting
    } = operations;

    const { data: defaultSetting, error: defaultSettingError } = useQuery(
        getDefaultSetting,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
        }
    );

    var topHeaderCms, footerCms;

    let root = document.documentElement;

    const setVariables = vars => Object.entries(vars).forEach((v) => {
        if (v[1]) {
            root.style.setProperty(v[0], v[1])
        }
    });

    const initialValues = useEffect(() => {
        if (defaultSetting) {
            console.log(defaultSetting);
            setDefaultBlocks({
                topHeaderCms: defaultSetting.defaultSetting.header_top_block, 
                footerCms: defaultSetting.defaultSetting.footer_block
            });

            const myVariables = {
                '--color-default': defaultSetting.defaultSetting.color_default,
                '--color-white': defaultSetting.defaultSetting.color_white,
                '--color-primary': defaultSetting.defaultSetting.color_primary,
                '--color-primary-hover': defaultSetting.defaultSetting.color_primary_hover,
                '--venia-global-color-gray': defaultSetting.defaultSetting.color_gray,
                '--venia-global-color-gray-dark': defaultSetting.defaultSetting.color_gray_dark,
                '--venia-global-color-gray-darker': defaultSetting.defaultSetting.color_gray_darker,
                '--venia-global-color-teal': defaultSetting.defaultSetting.color_teal,
                '--venia-global-color-teal-light': defaultSetting.defaultSetting.color_teal_light,
                '--venia-global-color-border': defaultSetting.defaultSetting.color_border,
                '--venia-global-color-error': defaultSetting.defaultSetting.color_error,
                '--venia-global-color-text': defaultSetting.defaultSetting.color_text,
                '--venia-global-color-text-hint': defaultSetting.defaultSetting.color_text_hint,
                '--text-xs': defaultSetting.defaultSetting.text_xs + 'px',
                '--line-height-xs': defaultSetting.defaultSetting.xs_line_height + 'px',
                '--letter-space-xs': defaultSetting.defaultSetting.xs_letter_space + 'px',
                '--text-sm': defaultSetting.defaultSetting.text_sm + 'px',
                '--line-height-sm': defaultSetting.defaultSetting.sm_line_height + 'px',
                '--letter-space-sm': defaultSetting.defaultSetting.sm_letter_space + 'px',
                '--text-base': defaultSetting.defaultSetting.text_base + 'px',
                '--line-height-base': defaultSetting.defaultSetting.base_line_height + 'px',
                '--letter-space-base': defaultSetting.defaultSetting.base_letter_space + 'px',
                '--text-lg': defaultSetting.defaultSetting.text_lg + 'px',
                '--line-height-lg': defaultSetting.defaultSetting.lg_line_height + 'px',
                '--letter-space-lg': defaultSetting.defaultSetting.lg_letter_space + 'px',
                '--text-xl': defaultSetting.defaultSetting.text_xl + 'px',
                '--line-height-xl': defaultSetting.defaultSetting.xl_line_height + 'px',
                '--letter-space-xl': defaultSetting.defaultSetting.xl_letter_space + 'px',
                '--text-2xl': defaultSetting.defaultSetting.text_2xl + 'px',
                '--line-height-2xl': defaultSetting.defaultSetting.xl2_line_height + 'px',
                '--letter-space-2xl': defaultSetting.defaultSetting.xl2_letter_space + 'px',
                '--text-3xl': defaultSetting.defaultSetting.text_3xl + 'px',
                '--line-height-3xl': defaultSetting.defaultSetting.xl3_line_height + 'px',
                '--letter-space-3xl': defaultSetting.defaultSetting.xl3_letter_space + 'px',
                '--text-4xl': defaultSetting.defaultSetting.text_4xl + 'px',
                '--line-height-4xl': defaultSetting.defaultSetting.xl4_line_height + 'px',
                '--letter-space-4xl': defaultSetting.defaultSetting.xl4_letter_space + 'px',
                '--text-5xl': defaultSetting.defaultSetting.text_5xl + 'px',
                '--line-height-5xl': defaultSetting.defaultSetting.xl5_line_height + 'px',
                '--letter-space-5xl': defaultSetting.defaultSetting.xl5_letter_space + 'px'
            };
            setVariables(myVariables);
        }
    }, [defaultSetting]);

    useScrollLock(isMasked);

    const maniFest = {
        "name": "Brave Bison",
        "short_name": "Venia",
        "start_url": "/",
        "theme_color": "#1F39FF",
        "display": "standalone",
        "background_color": "#fff",
        "description": "Shop the look",
        "icons": [
            {
                "src": "/venia-static/icons/venia_circle_144.png",
                "sizes": "144x144",
                "type": "image/png"
            },
            {
                "src": "/venia-static/icons/venia_circle_192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/venia-static/icons/venia_circle_512.png",
                "sizes": "512x512",
                "type": "image/png"
            },
            {
                "src": "/venia-static/icons/venia_maskable_512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            }
        ]
    };

    var stringManifest = JSON.stringify(maniFest);
    var blob = new Blob([stringManifest], {type: 'application/json'});
    var manifestURL = URL.createObjectURL(blob);

    return (
        <main className={rootClass}>
            <Link rel="manifest" href={manifestURL} />
            <Header topHeaderCms={defaultBlocks.topHeaderCms}/>
            <div className={pageClass}>{children}</div>
            <Footer footerCms={defaultBlocks.footerCms}/>
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};
