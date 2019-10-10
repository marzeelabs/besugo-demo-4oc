import React from 'react';
import BesugoComponent from 'Besugo';
import ReactHtmlParser from 'react-html-parser';

import EndFooter from 'partials/EndFooter';
import getData from 'partials/Reservation/getData';
import Quotes from 'partials/Quotes';
import ReservationSlider from 'partials/Reservation/Slider';
import SVGElements from 'partials/SVGElements';
import TopHeader from 'partials/TopHeader';

import LocationCard from 'location/Card';

export default class PageHome extends BesugoComponent {
  static config = {
    tag: 'Homepage',
    categories: [ 'homepage', 'homepage-pt' ],
  }

  static extraProps(props, xplaceholder) {
    const content = xplaceholder.getChildren('Content');
    props.content = JSON.parse(content[0].text());

    props.quotes = xplaceholder
      .getChildren('HomepageQuote')
      .map(location => ({
        author: location.getAttribute('author'),
        occupation: location.getAttribute('occupation'),
        picture: location.getAttribute('picture'),
        text: location.getAttribute('text'),
      }));

    props.locations = xplaceholder
      .getChildren('HomepageLocation')
      .map(location => ({
        title: location.getAttribute('title'),
        url: location.getAttribute('url'),
        teaser: location.getAttribute('teaser'),
        image: location.getAttribute('image'),
      }));

    // Data for the Reservations widget.
    getData(props, xplaceholder);
  }

  getData() {
    if (this.isPreview()) {
      const { entry, getAsset, widgetFor } = this.props;
      const data = entry.getIn([ 'data' ]);

      return {
        title: data.getIn([ 'pagetitle' ]),
        content: widgetFor('body'),
        header: data.getIn([ 'header' ]) ? getAsset(data.getIn([ 'header' ])).toString() : '',
        quotes: (data.getIn([ 'quotes' ]) || [])
          .map(quote => ({
            author: quote.getIn([ 'author' ]),
            occupation: quote.getIn([ 'occupation' ]),
            text: quote.getIn([ 'text' ]),
            picture: quote.getIn([ 'picture' ]) ? getAsset(quote.getIn([ 'picture' ])).toString() : '',
          })),
        locations: [],
      };
    }

    const data = Object.assign({}, this.props);

    // "Content" comes pre-built with HTML markup already.
    // We need to parse it so that it doesn't show up as simple text
    data.content = ReactHtmlParser(data.content);

    return data;
  }

  renderBlock() {
    const data = this.getData();

    return (
      <div className="page-main styleguide__wrapper">
        <div className="styleguide__section-component">
          <h1 className="page-home__welcome-title">
            { data.welcometitle }
          </h1>
          { data.content }
        </div>

        { !data.locations.length ? null : (
          <div className="page-home__locations styleguide__section-component">
            { data.locations.map(location => (
              <LocationCard { ...location } key={ `location-wrapper-${location.title}` } />
            )) }
          </div>
        ) }

        { this.isPreview() ? null : (
          <div className="styleguide__section-component">
            <ReservationSlider { ...data } />
          </div>
        ) }

        <Quotes { ...data } className="page-home__quotes" />
      </div>
    );
  }

  renderPreview() {
    return (
      <div id="cmsPreview">
        <SVGElements />
        <TopHeader />
        { this.renderBlock() }
        <EndFooter />
      </div>
    );
  }
}
