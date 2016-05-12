import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import Footer from '../../components/Footer';

describe('Footer', () => {
  it('should render the footer', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Footer />);
    const actual = renderer.getRenderOutput();
    const expected = (
      <div className="small-6 columns">
        © 2016 Wayne Patterson<br />
        Fork me on <a href="https://github.com/suprsidr/react-product-pages">Github</a>
      </div>
    );
    expect(actual).toIncludeJSX(expected);
  });
});