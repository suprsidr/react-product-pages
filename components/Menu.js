import React from 'react';
import {render} from 'react-dom';
import Header from './Header';
import Footer from './Footer';

render(
  <Header />,
  document.getElementById('menu-container')
);
render(
  <Footer />,
  document.querySelector('.footer')
);