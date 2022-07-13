import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useStyle } from '@magento/venia-ui/lib/classify';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { ChevronRight as RightIcon } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { X as XIcon } from 'react-feather';
import DEFAULT_OPERATIONS from './megaMenu.gql';
import defaultClasses from './megaMenu.module.css';
import { Link } from 'react-router-dom';
import MenuItemChild from './menuItemChild';
/**
 * The MegaMenu component displays menu with categories on desktop devices
 */
const MegaMenu = props => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getMegaMenuQuery, getStoreConfigQuery } = operations;
    const classes = useStyle(defaultClasses, props.classes);
    const { data: storeConfigData } = useQuery(getStoreConfigQuery, {
        fetchPolicy: 'cache-and-network'
    });

    const { data } = useQuery(getMegaMenuQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const [subs, setSubs] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    var mainSubs = [];

    const categoryUrlSuffix = useMemo(() => {
        if (storeConfigData) {
            return storeConfigData.storeConfig.category_url_suffix;
        }
    }, [storeConfigData]);


    useEffect(() => {
        var hasChild  = false;
        data?.MenuGraphql.map((category) => {
            hasChild  = false;
            data.MenuGraphql?.map((child) => {
                if(child.parent_id === parseInt(category.id)){
                    hasChild = true;
                }
            })
            if(category.parent_id !== 2 ){
            }
            var menuItem = [];
            const linkUrl = category.custom_url ? 
                            `/${category.custom_url}`
                            : `/${category.url_path}${categoryUrlSuffix || ''}`
            if(hasChild){
                menuItem = {
                    id: category.id, 
                    name: category.name, 
                    parent_id: category.parent_id, 
                    url_path: category.url_path,
                    url_key: linkUrl,
                    is_mega_menu: category.is_mega_menu,
                    mega_menu_content: category.mega_menu_content,
                    sub_menu_width: category.sub_menu_width,
                    link_color: category.link_color,
                    ribbon: category.ribbon,
                    ribbon_color: category.ribbon_color,
                    isParent: true,
                    isActive: false
                };
            }else {
                menuItem = {
                    id: category.id, 
                    name: category.name, 
                    parent_id: category.parent_id, 
                    url_path: category.url_path,
                    url_key: linkUrl,
                    is_mega_menu: category.is_mega_menu,
                    mega_menu_content: category.mega_menu_content,
                    sub_menu_width: category.sub_menu_width,
                    link_color: category.link_color,
                    ribbon: category.ribbon,
                    ribbon_color: category.ribbon_color,
                    isParent: false,
                    isActive: false
                };
            }
            mainSubs.unshift(menuItem);
        })
        setSubs(mainSubs);
    }, [data?.MenuGraphql]);

    return (
        <nav className={props.classes}>
            <div className={classes.navHeader}>
                <span className={classes.navTitle}>Main menu</span>
                <button type="button" onClick={props.navOpen} className={classes.close_btn}>
                    <Icon src={XIcon} classes={{ icon: classes.close_icon }}  />
                </button>
            </div>
            {subs?.map((category) => (
                category.parent_id === 2 ? 
                    <MenuItemChild item={category} top="true" megaContainer="false" subs={subs} key={category.id} />
                : null
            ))}
        </nav>
    );
};

export default MegaMenu;
