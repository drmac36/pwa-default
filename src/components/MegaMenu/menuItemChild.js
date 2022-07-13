import React, { useState, useEffect } from 'react';
import defaultClasses from './menuItem.module.css';
import { Link } from 'react-router-dom';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { ChevronRight as RightIcon } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import MenuItemChild2 from './menuItemChild';

const MenuItemChild = props => {
	const [itemState, setItemState] = useState(false);
    const classes = useStyle(defaultClasses, props.classes);

    const doToggle = (e, id, active) => {
        setItemState(!itemState);
    }
    useEffect(() => {
        setItemState(false);
    }, [location.pathname]);

    const ribbonStyle = props.item.ribbon_color ? {
      '--parent-color': props.item.ribbon_color,
    } : null;

    const linkStyle = props.item.link_color ? {
      color: props.item.link_color,
    } : null;

    const ribbonClass = props.top ? classes.ribbon_top : classes.ribbon_child;
    const ribbonContainerClass = props.top ? classes.ribbonContainerTop : classes.ribbonContainer;

    const ribbon = props.item.ribbon ? (
        <div className={ribbonContainerClass}>
            <div className={ribbonClass} style={ribbonStyle}>{props.item.ribbon}</div>
        </div>
    ) : null;


    var itemHtml, level, mega, ul, iconClass, colWidth;
    if(props.item.isParent){
        if (props.top) {
            if(props.item.is_mega_menu){
                level = itemState ? classes.mega_menu_opened : classes.mega_menu;
                switch(props.item.sub_menu_width) {
                    case 'col6':
                        ul = classes.mega_menu_ul_col6;
                        break;
                    case 'col9':
                        ul = classes.mega_menu_ul_col9;
                        break;
                    case 'full':
                        ul = classes.mega_menu_ul_full;
                        break;
                    default:
                        ul = classes.mega_menu_ul_col3;
                } 
                return (
                    <li className={level} key={props.item.id} style={linkStyle}>
                        <Link to={props.item.url_key} style={linkStyle} className={props.item.isActive ? classes.topLinkMegaActive : classes.topLinkMega}>{props.item.name}{ribbon}</Link>
                        <button type="button" className={classes.menuBtnParent} onClick={(e) => doToggle(e, props.item.id, props.item.isActive)}>
                            <Icon src={RightIcon} classes={{ icon: iconClass }}  />
                        </button>
                        <div className={itemState ? classes.submenuActive : classes.submenu}>
                            <ul className={ul}>
                                {props.subs?.map((child) => (
                                    parseInt(props.item.id) === child.parent_id ?
                                        <MenuItemChild2 item={child} megaContainer="true" colWidth={props.item.sub_menu_width} subs={props.subs} key={child.id}/>
                                    : null
                                ))}
                            </ul>
                            <div className={classes.content}>
                                <RichContent html={props.item.mega_menu_content} />
                            </div>
                        </div>
                    </li>
                );
            }else{
                level = itemState ? classes.topParentOpened : classes.topParent;
                ul = itemState ? classes.ulTopOpened : classes.ulTop;
                return (
                    <li className={level} key={props.item.id}>
                        <Link to={props.item.url_key} style={linkStyle} className={classes.topLink}>{props.item.name}{ribbon}</Link>
                        <button type="button" className={classes.menuBtnParent} onClick={(e) => doToggle(e, props.item.id, props.item.isActive)}>
                            <Icon src={RightIcon} classes={{ icon: iconClass }}  />
                        </button>
                        <ul className={ul}>
                            {props.subs?.map((child) => (
                                parseInt(props.item.id) === child.parent_id ?
                                    <MenuItemChild2 item={child} subs={props.subs} key={child.id} />
                                : null
                            ))}
                        </ul>
                    </li>
                );
            }
        }else{
            level = itemState ? classes.childParentOpend : classes.childParent;
            ul = itemState ? classes.ulChildOpend : classes.ulChild;
            iconClass = itemState ? classes.childIconOpened : classes.childIcon;
            if(props.megaContainer){
                
                switch(props.colWidth) {
                    case 'col6':
                        level = classes.childMegaParent_col6;
                        break;
                    case 'col9':
                        level = classes.childMegaParent_col4;
                        break;
                    case 'full':
                        level = classes.childMegaParent_col3;
                        break;
                    default:
                        level = classes.childMegaParent_full;
                } 
                ul = itemState ? classes.ulMegaChildOpened : classes.ulMegaChild;
                iconClass = itemState ? classes.childMegaIconOpened : classes.childIcon;
            }
            return (
                <li className={level} key={props.item.id}>
                    <Link to={props.item.url_key} style={linkStyle} className={classes.childLink}>{props.item.name}{ribbon}</Link>
                    <button type="button" className={classes.menuBtn} onClick={(e) => doToggle(e, props.item.id, props.item.isActive)}>
                        <Icon src={RightIcon} classes={{ icon: iconClass }}  />
                    </button>
                    <ul className={ul}>
                        {props.subs?.map((child) => (
                            parseInt(props.item.id) === child.parent_id ?
                                <MenuItemChild2 item={child} megaContainer={props.megaContainer} subs={props.subs} key={child.id} />
                            : null
                        ))}
                    </ul>
                </li>
            );
        }
    }else {
        if (props.top) {
            return (
            <li className={classes.top} key={props.item.id}>
                <Link to={props.item.url_key} style={linkStyle} className={classes.topLink}>{props.item.name}{ribbon}</Link>
            </li>
            );
        }else {
            return (
            <li className={classes.child} key={props.item.id}>
                <Link to={props.item.url_key} style={linkStyle} className={classes.childLink}>{props.item.name}{ribbon}</Link>
            </li>
            );
        }
    }
}
export default MenuItemChild;