import React, {Component} from 'react';
import request from 'superagent';

export default class StaticContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: ''
    };
  }
  componentWillMount() {
    request
      .get(`/static/${this.props.prodid}`)
      .end((err, res) => {
        err ? console.log(err) : '';
        if(res.text === 'not found') {
          console.log('not found')
        } else {
          this.setState({html: res.text})
        }
      });
  }
  createMarkup(html) {
    return {__html: JSON.parse(html)};
  }
  render() {
    return (
      <div>
        {this.state.html && <div className="static-overview" dangerouslySetInnerHTML={this.createMarkup(this.state.html)}></div>}
      </div>
    )
  }
}