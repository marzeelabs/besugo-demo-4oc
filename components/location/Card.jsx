import React, { PureComponent } from 'react';

import SrcSet from 'partials/SrcSet';

export default class LocationCard extends PureComponent {
  render() {
    const {
      title,
      teaser,
      image,
      url,
    } = this.props;

    return (
      <a
        className="location-card__link"
        href={ url }
      >
        <div className="location-card__content">

          <div className="location-card__title">
            { title }
          </div>

          <div className="location-card__teaser">
            { teaser }
          </div>
        </div>

        <SrcSet
          className="location-card__image"
          src={ image }
          sizes="50vw"
        />
      </a>
    );
  }
}
