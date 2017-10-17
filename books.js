"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger();
var books = require('./lib/google-books-search');

module.exports =
    {
        metadata: () => ({
            "name": "books.search",
			"properties": {
						"title": {"type": "string", "required": true},
						"lang": {"type": "string", "required": true},
						"limit": {"type": "integer", "required": true},
						"order": {"type": "string", "required": true},
						"printType": {"type": "string", "required": true}
			},
            "supportedActions": []
        }),
        invoke: (conversation, done) => {

            var title = conversation.properties().title;
			var lang = conversation.properties().lang;
			var limit = conversation.properties().lang;
			var order = conversation.properties().lang;
			var printType = conversation.properties().printType;

            if ((title) && (lang) && (limit) && (order) && (printType)) {
				var options = {
					key: "AIzaSyAsyyj247OHz4nFUJHQTHje2I7rf95SmCE",
					field: 'title',
					offset: 0,
					limit: limit,
					type: printType,
					order: order,
					lang: lang
				};
				
				titles.search(title, function(error, results) {
					if ( ! error ) {
						var titles = [];
						for (var i = 0; i < results.length; i++){
						  titles[i] = results[i]['title'];
						}
						conversation.variable('titles', titles);
						conversation.transition();
						done();
					} else {
						conversation.reply({text: error});
						conversation.transition();
						done();
					}
				});
            }
            else {
                conversation.keepTurn(true);
                conversation.transition('intent');
                done();
            }
        }
    }