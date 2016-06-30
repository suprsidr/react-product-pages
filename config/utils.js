import request from 'superagent';
import jsonp from 'superagent-jsonp';
import {FETCH_URL} from './globals';

/**
 * fetch data from the server
 * @param {Object} query
 * @param {Function} cb
 */
export const fetchData = (query, cb) => {
	console.log('getting data from the server');
	const q = JSON.stringify(query),
				s = JSON.stringify({
					ProdID: 1
				}),
				f = JSON.stringify({
					_id: 0,
					ProdID: 1,
					BrandName: 1,
					Name: 1,
					ProductStatus: 1,
					DemandRank: 1,
					Desc: 1,
					LongDesc: 1,
					Price: 1,
					ListPrice: 1,
					PartsList: 1,
					RatingAverage: 1,
					RatingCount: 1,
					Attributes: 1,
					Categories: 1,
          CompletionGuides: 1
				});
	request
			.get(`${FETCH_URL}/search/${q}/0/${s}/${f}`)
			.use(jsonp)
			.end((err, res) => {
				if (err) {
					cb(err);
				} else {
					const data = res.body.error ? [] : res.body;
					cb(null, data);
				}
			});
};

export const upsert = (db, data, cb) => {
	db.products.upsert(data, () => {
		console.log('data upserted');
    cb && cb();
	});
}
