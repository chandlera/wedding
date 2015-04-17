var osmosis = require('osmosis');
var fs = require('fs');
var request = require('request');

// osmosis
// .get('http://www.learnvest.com/2014/11/') 
// .find('div.post h2 a')
// .set('location')
// .follow('@href')
// .set({
//     'title':        '.entry-title',
//     'content':      '.entry-content'
// })
// .data(function(listing) {
//     // do something with listing data
//     fs.writeFile(__dirname + '/' + listing.title.split(' ')[0] + '.txt', listing.content.trim(), function(err) {
//       if(err) {
//         return console.log(err);
//       }
//       console.log('the file was saved.');
//     });
// });

var site = 'http://spdru.com';

osmosis
.get(site) 
.set({'links[]': 'a@href'})
.data(function(listing) {
	console.log('These links are dead: ');
	listing.links.map(function(item) {
		var link = item.indexOf('/') === 0 ? site + item : site + '/' + item;

		if(item.indexOf('http') === 0) {
			request(item, function(error, response, body) {
				if(error || response.statusCode === 404) {
					console.log(item);
				}
			});
		}
		else {
			request(link, function(error, response, body) {
				if(error || response.statusCode === 404) {
					console.log(item);
				}
			});
		}
	});
});

// var anchors = window.document.getElementsByTagName('a');
// for(var i = 0; i < anchors.length; i++) {
// 	var index = anchors[i];
// 	if(index.getAttribute("href") && index.getAttribute("href").indexOf('content') === 0) {
// 		console.log(index.innerText);
// 	}
// }
