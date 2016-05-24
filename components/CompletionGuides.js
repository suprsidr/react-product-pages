import React, {Component} from 'react';
import PartsList from './PartsList';

export default class CompletionGuides extends Component {
  render() {
    return (
      <div className="row">
        {this.props.list.map((list, i) => (
          <div className="small-12 columns">
            <h4>{list.ID}</h4>
            <PartsList key={i} partsList={list.Name} db={this.props.db} />
          </div>))}
      </div>
    )
  }
}