"use strict"

var books = require('./lib/google-books-search');

module.exports =
    {
        metadata: () => ({
            "name": "title.detail",
			"properties": {
						"title": {"type": "string", "required": true},
			},
            "supportedActions": []
        }),
        invoke: (conversation, done) => {

            var title = conversation.properties().title;

            if (title) {
				title = title.substring(1, title.indexOf( "]"));

				var options = {
					key: "AIzaSyAsyyj247OHz4nFUJHQTHje2I7rf95SmCE",
				};
				
				books.lookup(title, function(error, results) {
					if ( ! error ) {
						conversation.reply({text: results['description']});
						conversation.transition();
//						conversation.keepTurn(true);
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