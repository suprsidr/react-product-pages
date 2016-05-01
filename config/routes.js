import React from 'react';
import Home from '../components/Home';
import Products from '../components/Products';
import Search from '../components/Search';
import Main from '../components/Main';
import ProdPage from '../components/ProdPage';
import { NotFound } from '../components/NotFound';
import {Route, IndexRoute} from 'react-router';

export default (
  <Route path="/" component={Main}>
    <Route path="/products/:category" component={Products} />
    <Route path="/search/:searchterm" component={Search} />
    <Route path="/product/:id" component={ProdPage} />
	  <Route path="*" component={NotFound}/>
    <IndexRoute component={Home} />
  </Route>
);