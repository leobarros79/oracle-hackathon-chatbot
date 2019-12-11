"use strict"

var books = require('./lib/google-books-search');

module.exports =
    {
        metadata: () => ({
            "name": "title.search",
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
					key: "XXXXXXXXX",
					field: 'title',
					offset: 0,
					limit: limit,
					type: printType,
					order: order,
					lang: lang
				};
				
				books.search(title, function(error, results) {
					if ( ! error ) {
						var titles = "";
						for (var i = 0; i < results.length; i++){
						  console.log(results[i]['id']);
						  if (i==0)
							titles = "[" + results[i]['id'] + "] " + results[i]['title'].replace(/,/g, ';');
						  else
							titles = titles + ", [" + results[i]['id'] + "] " + results[i]['title'].replace(/,/g, ';');  
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
                conversation.reply({text: "[Erro] Todos os parâmetros são requeridos."});
                conversation.transition('error');
                done();
            }
        }
    }
