import React, {Component} from 'react';

import ProdTitle from './ProdTitle';
import ProdRating from './ProdRating';
import ProdImage from './ProdImage';
import ProdBuy from './ProdBuy';
import ProdTabs from './ProdTabs';

export default class Content extends Component {
  render() {
    return (
      <div id='Content'>
        Content
        <ProdTitle />
        <ProdRating />
        <ProdImage />
        <ProdBuy />
        <ProdTabs />
      </div>
    )
  }
}


