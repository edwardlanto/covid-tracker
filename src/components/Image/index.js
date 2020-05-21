
import React from 'react';
import PropTypes from 'prop-types';

export const Image = ({ src,
    srcSet,
    isLazy,
    country
}) => (
        <img
            src={src}
            className={isLazy ? 'lazy flag' : 'flag'}
            srcSet={isLazy ? '' : srcSet}
            data-src={src}
            alt={`${country} flag of country`}
        />
    );

Image.propTypes = {
    src: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
}

Image.defaultProps = {
    isLazy: false
}