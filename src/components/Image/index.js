
import React from 'react';
import PropTypes from 'prop-types';

export const Image = ({ src,
    srcSet,
    country
}) => (
        <img
            src={src}
            className="lazy flag"
            srcSet={srcSet}
            data-src={src}
            alt={`${country} flag of country`}
        />
    );

Image.propTypes = {
    src: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
}