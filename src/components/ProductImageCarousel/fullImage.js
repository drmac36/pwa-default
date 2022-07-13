import React, { useMemo } from 'react';
import { bool, func, number, shape, string } from 'prop-types';

import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { useWindowSize } from '@magento/peregrine';
import { useThumbnail } from '@magento/peregrine/lib/talons/ProductImageCarousel/useThumbnail';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './fullImage.module.css';
import Image from '@magento/venia-ui/lib/components/Image';

const DEFAULT_THUMBNAIL_HEIGHT = 170;
const DEFAULT_THUMBNAIL_WIDTH = 135;

/**
 * The Thumbnail Component is used for showing thumbnail preview image for ProductImageCarousel
 * Shows up only in desktop devices
 *
 * @typedef Thumbnail
 * @kind functional component
 *
 * @param {props} props
 *
 * @returns {React.Element} React thumbnail component that displays product thumbnail
 */
const FullImage = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const {
        isActive,
        item: { file, label },
        itemIndex
    } = props;

    const talonProps = useThumbnail({
        itemIndex
    });

    const windowSize = useWindowSize();
    const isDesktop = windowSize.innerWidth >= 1024;
    const IMAGE_WIDTH = 640;

    const thumbnailImage = useMemo(() => {

        return file ? (
            <Image
                alt={label}
                classes={{ image: classes.image }}
                resource={file}
                width={IMAGE_WIDTH}
                height={IMAGE_WIDTH}
            />
        ) : (
            <Image
                alt={label}
                classes={{ image: classes.image }}
                src={transparentPlaceholder}
            />
        );
    }, [file, isDesktop, label, classes.image]);

    return (
        <span
            className={isActive ? classes.rootSelected : classes.root}
            role="button"
            aria-hidden="true"
        >
            {thumbnailImage}
        </span>
    );
};

/**
 * Props for {@link FullImage}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the Thumbnail component
 * @property {string} classes.root classes for root container
 * @property {string} classes.rootSelected classes for the selected thumbnail item
 * @property {bool} isActive is image associated is active in carousel
 * @property {string} item.label label for image
 * @property {string} item.file filePath of image
 * @property {number} itemIndex index number of thumbnail
 * @property {func} onClickHandler A callback for handling click events on thumbnail
 */
FullImage.propTypes = {
    classes: shape({
        root: string,
        rootSelected: string
    }),
    isActive: bool,
    item: shape({
        label: string,
        file: string.isRequired
    }),
    itemIndex: number,
    onClickHandler: func.isRequired
};

export default FullImage;
