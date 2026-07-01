var WineQAI_Widget = function(options) {
	options = options || {};

    var self = {
	    shadow_root: null,
	    scripts_queue: [
			'//dev.wineq.ai/web-widget/wineqai_widget.css?t=' + (new Date().getTime())
//			'//app.wineq.ai/web-widget/wineqai_widget.css?t=' + (new Date().getTime())
		],
		scripts_loaded_count: 0,
	    chat_body: null,
	    campaign: '',
		wineqai_chat: {
		    api_definitions: '',
			wine_sweetness: '',
			wine_acidity: '',
			wine_style: '',
			wine_aroma: '',
			food: '',
			budget: '',
			api_results: '',
			html_results: '',
			widget_opened: false
		}
	};

	self.init = function() {
		if ( options.key == undefined ) {
            console.log('Key is required');
            return;
        }

	    if ( wineqai_template == undefined ) {
            console.log('Template could not be loaded');
            return;
        }

		var	xhttp = new XMLHttpRequest();

		xhttp.open('GET', 'https://app.wineq.ai/api/campaign/' + options.key, true);
		xhttp.send();
		xhttp.onreadystatechange = function() {
			if ( this.readyState == 4 && this.status == 200 ) {
				self.campaign = JSON.parse(this.responseText);

				if ( self.campaign.active ) {
					document.getElementById('wineqai-widget-container').innerHTML = '<wineqai-widget style="display: none;position: fixed;width: 100%;bottom: 0;left: 0;z-index: 99999;"></wineqai-widget>';

					customElements.define('wineqai-widget', class extends HTMLElement {
						constructor() {
							super();

							const shadowRoot = this.attachShadow({mode: 'open'});

							shadowRoot.innerHTML = wineqai_template;

							self.shadow_root = shadowRoot;

							self.scripts_load();
						}
					});
				}
			}
		};
	};

	self.scripts_load = function() {
        for ( var i = 0; i < self.scripts_queue.length; i++ ) {
            var src = self.scripts_queue[i];
            var script;
            
            if ( src.indexOf('.js') != -1 ) {
                script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = src;
            } else if ( src.indexOf('.css') != -1 ) {
                script = document.createElement('link');
                script.rel = 'stylesheet';
                script.href = src;
            }

            script.async = true;
            script.onload = function() {
                self.script_loaded();
            };

            self.shadow_root.appendChild(script);
        }
    };

    self.script_loaded = function() {
        self.scripts_loaded_count++;

        if ( self.scripts_loaded_count == self.scripts_queue.length ) {
            self.init_widget();
        }
    };

	self.init_widget = function() {
		self.chat_body = self.shadow_root.querySelector('#wineqai-chat-body');

		document.querySelector('wineqai-widget').style.display = 'block';
		self.shadow_root.querySelector('#wineqai-chat').style.display = 'block';
	
		// Open chat widget
		self.shadow_root.querySelector('#wineqai-chat-button').addEventListener('click', function() {
			self.shadow_root.querySelector('#wineqai-chat-button').style.display = 'none';
			self.shadow_root.querySelector('#wineqai-chat-button-message').style.display = 'none';
			self.shadow_root.querySelector('#wineqai-chat-box').style.display = 'block';

			if ( !self.wineqai_chat.widget_opened ) {
				var	xhttp = new XMLHttpRequest();

				xhttp.open('POST', 'https://app.wineq.ai/api/event/' + options.key + '/widget_opened', true);
				xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				xhttp.send();
				xhttp.onreadystatechange = function() {
					if ( this.readyState == 4 && this.status == 200 ) {
						self.wineqai_chat.widget_opened = true;
						
						localStorage.setItem('wineqai-chat', JSON.stringify(self.wineqai_chat));
					}
				}
			};
		});

		// Auto open
		var get_params = new URLSearchParams(document.location.search);

		if ( get_params.get('wauto') == '1' ) {
			self.shadow_root.querySelector('#wineqai-chat-button').click();
		}

	
		// Close chat widget
		self.shadow_root.querySelector('#wineqai-chat-close').addEventListener('click', function() {
			self.shadow_root.querySelector('#wineqai-chat-button').style.display = 'block';
			self.shadow_root.querySelector('#wineqai-chat-box').style.display = 'none';
		});

		// Check session storage
		if ( localStorage.getItem('wineqai-chat') ) {
			self.wineqai_chat = JSON.parse(localStorage.getItem('wineqai-chat'));

			self.update_templates();
		} else {
			localStorage.setItem('wineqai-chat', JSON.stringify(self.wineqai_chat));

			var	xhttp = new XMLHttpRequest();

			xhttp.open('GET', 'https://app.wineq.ai/api/definitions', true);
			xhttp.send();
			xhttp.onreadystatechange = function() {
				if ( this.readyState == 4 && this.status == 200 ) {
					self.wineqai_chat.api_definitions = JSON.parse(this.responseText);

					localStorage.setItem('wineqai-chat', JSON.stringify(self.wineqai_chat));

					self.update_templates();
				}
			};
		}
	};

	self.update_templates = function() {
		for ( const [key, value] of Object.entries(self.wineqai_chat.api_definitions.sweetness) ) {
			wineqai_form_sweetness = wineqai_form_sweetness.replace('[sweetness.' + key + '.name]', value.name);
			wineqai_form_sweetness = wineqai_form_sweetness.replace('[sweetness.' + key + '.label]', value.label);
		}

		for ( const [key, value] of Object.entries(self.wineqai_chat.api_definitions.acidity) ) {
			wineqai_form_acidity = wineqai_form_acidity.replace('[acidity.' + key + '.name]', value.name);
			wineqai_form_acidity = wineqai_form_acidity.replace('[acidity.' + key + '.label]', value.label);
		}

		for ( const [key, value] of Object.entries(self.wineqai_chat.api_definitions.primary_aroma) ) {
			wineqai_form_style = wineqai_form_style.replace('[primary_aroma.' + key + '.name]', value.name);
			wineqai_form_style = wineqai_form_style.replace('[primary_aroma.' + key + '.label]', value.label);
		}

		for ( const [key, value] of Object.entries(self.wineqai_chat.api_definitions.secondary_aroma) ) {
			wineqai_form_red_aroma = wineqai_form_red_aroma.replace('[secondary_aroma.' + key + '.name]', value.name);
			wineqai_form_red_aroma = wineqai_form_red_aroma.replace('[secondary_aroma.' + key + '.label]', value.label);

			wineqai_form_white_aroma = wineqai_form_white_aroma.replace('[secondary_aroma.' + key + '.name]', value.name);
			wineqai_form_white_aroma = wineqai_form_white_aroma.replace('[secondary_aroma.' + key + '.label]', value.label);

			wineqai_form_rose_aroma = wineqai_form_rose_aroma.replace('[secondary_aroma.' + key + '.name]', value.name);
			wineqai_form_rose_aroma = wineqai_form_rose_aroma.replace('[secondary_aroma.' + key + '.label]', value.label);

			wineqai_form_sparkling_aroma = wineqai_form_sparkling_aroma.replace('[secondary_aroma.' + key + '.name]', value.name);
			wineqai_form_sparkling_aroma = wineqai_form_sparkling_aroma.replace('[secondary_aroma.' + key + '.label]', value.label);
		}

		for ( const [key, value] of Object.entries(self.wineqai_chat.api_definitions.food) ) {
			wineqai_form_food = wineqai_form_food.replace('[food.' + key + '.name]', value.name);
			wineqai_form_food = wineqai_form_food.replace('[food.' + key + '.label]', value.label);
		}

		for ( const [key, value] of Object.entries(self.wineqai_chat.api_definitions.budget) ) {
			wineqai_form_budget = wineqai_form_budget.replace('[budget.' + key + '.name]', value.name);
			wineqai_form_budget = wineqai_form_budget.replace('[budget.' + key + '.label]', value.label);
		}

		self.load_question();
	};

	self.load_question = function() {
		self.chat_body.innerHTML = '';

		if ( self.wineqai_chat.wine_sweetness == '' ) {			
			self.chat_body.innerHTML = wineqai_form_sweetness;

			for ( var i = 0; i < self.shadow_root.querySelectorAll('.wineqai-chat-form-sweetness-option').length; i++ ) {
		    	self.shadow_root.querySelectorAll('.wineqai-chat-form-sweetness-option')[i].addEventListener('change', function(e) {
					self.wineqai_chat.wine_sweetness = e.target.defaultValue;
			    	localStorage.setItem('wineqai-chat', JSON.stringify(self.wineqai_chat));

					self.load_question();

					var	xhttp = new XMLHttpRequest();

					xhttp.open('POST', 'https://app.wineq.ai/api/event/' + options.key + '/question_answered', true);
					xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					xhttp.send('question=1&answer=' + self.wineqai_chat.wine_sweetness);
		    	});
			}
		} else if ( self.wineqai_chat.wine_acidity == '' ) {
			self.chat_body.innerHTML = wineqai_form_acidity;

			for ( var i = 0; i < self.shadow_root.querySelectorAll('.wineqai-chat-form-acidity-option').length; i++ ) {
		    	self.shadow_root.querySelectorAll('.wineqai-chat-form-acidity-option')[i].addEventListener('change', function(e) {
					self.wineqai_chat.wine_acidity = e.target.defaultValue;
			    	localStorage.setItem('wineqai-chat', JSON.stringify(self.wineqai_chat));

					self.load_question();

					var	xhttp = new XMLHttpRequest();

					xhttp.open('POST', 'https://app.wineq.ai/api/event/' + options.key + '/question_answered', true);
					xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					xhttp.send('question=2&answer=' + self.wineqai_chat.wine_acidity);
		    	});
			}
		} else if ( self.wineqai_chat.wine_style == '' ) {
			self.chat_body.innerHTML = wineqai_form_style;

			for ( var i = 0; i < self.shadow_root.querySelectorAll('.wineqai-chat-form-style-option').length; i++ ) {
		    	self.shadow_root.querySelectorAll('.wineqai-chat-form-style-option')[i].addEventListener('change', function(e) {
					self.wineqai_chat.wine_style = e.target.defaultValue;

					if ( self.wineqai_chat.wine_style == self.wineqai_chat.api_definitions.primary_aroma.SURPRISE.name ) {
						self.wineqai_chat.wine_aroma = 'none';
					} else {
						self.wineqai_chat.food = self.wineqai_chat.api_definitions.food.NONE.name;
					}

			    	localStorage.setItem('wineqai-chat', JSON.stringify(self.wineqai_chat));

					self.load_question();

					var	xhttp = new XMLHttpRequest();

					xhttp.open('POST', 'https://app.wineq.ai/api/event/' + options.key + '/question_answered', true);
					xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					xhttp.send('question=3&answer=' + self.wineqai_chat.wine_style);
		    	});
			}
		} else if ( self.wineqai_chat.wine_aroma == '' ) {
			if ( self.wineqai_chat.wine_style == self.wineqai_chat.api_definitions.primary_aroma.RICH.name ) {
				self.chat_body.innerHTML = wineqai_form_red_aroma;
			} else if ( self.wineqai_chat.wine_style == self.wineqai_chat.api_definitions.primary_aroma.LIGHT.name ) {
				self.chat_body.innerHTML = wineqai_form_white_aroma;
			} else if ( self.wineqai_chat.wine_style == self.wineqai_chat.api_definitions.primary_aroma.FRUITY.name ) {
				self.chat_body.innerHTML = wineqai_form_rose_aroma;
			} else if ( self.wineqai_chat.wine_style == self.wineqai_chat.api_definitions.primary_aroma.CELEBRATORY.name ) {
				self.chat_body.innerHTML = wineqai_form_sparkling_aroma;
			}

			for ( var i = 0; i < self.shadow_root.querySelectorAll('.wineqai-chat-form-aroma-option').length; i++ ) {
		    	self.shadow_root.querySelectorAll('.wineqai-chat-form-aroma-option')[i].addEventListener('change', function(e) {
					self.wineqai_chat.wine_aroma = e.target.defaultValue;

					self.wineqai_chat.food = self.wineqai_chat.api_definitions.food.NONE.name;

			    	localStorage.setItem('wineqai-chat', JSON.stringify(self.wineqai_chat));

					self.load_question();

					var	xhttp = new XMLHttpRequest();

					xhttp.open('POST', 'https://app.wineq.ai/api/event/' + options.key + '/question_answered', true);
					xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					xhttp.send('question=4&answer=' + self.wineqai_chat.wine_aroma);
		    	});
			}
		} else if ( self.wineqai_chat.food == '' ) {
			self.chat_body.innerHTML = wineqai_form_food;

			for ( var i = 0; i < self.shadow_root.querySelectorAll('.wineqai-chat-form-food-option').length; i++ ) {
		    	self.shadow_root.querySelectorAll('.wineqai-chat-form-food-option')[i].addEventListener('change', function(e) {
					self.wineqai_chat.food = e.target.defaultValue;

			    	localStorage.setItem('wineqai-chat', JSON.stringify(self.wineqai_chat));

					self.load_question();

					var	xhttp = new XMLHttpRequest();

					xhttp.open('POST', 'https://app.wineq.ai/api/event/' + options.key + '/question_answered', true);
					xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					xhttp.send('question=5&answer=' + self.wineqai_chat.food);
		    	});
			}
		} else if ( self.wineqai_chat.budget == '' ) {
			self.chat_body.innerHTML = wineqai_form_budget;

			for ( var i = 0; i < self.shadow_root.querySelectorAll('.wineqai-chat-form-budget-option').length; i++ ) {
		    	self.shadow_root.querySelectorAll('.wineqai-chat-form-budget-option')[i].addEventListener('change', function(e) {
					self.wineqai_chat.budget = e.target.defaultValue;

			    	localStorage.setItem('wineqai-chat', JSON.stringify(self.wineqai_chat));

					var	xhttp = new XMLHttpRequest();

					xhttp.open('POST', 'https://app.wineq.ai/api/event/' + options.key + '/question_answered', true);
					xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					xhttp.send('question=6&answer=' + self.wineqai_chat.budget);

					self.load_results();
		    	});
			}
		} else {
			self.load_results();
		}
	};

	self.load_results = function() {
		if ( self.wineqai_chat.api_results == '' ) {
			var	xhttp = new XMLHttpRequest(),
				query_string = '?';

			if ( self.wineqai_chat.wine_sweetness != '' ) {
				query_string += 'sweetness=' + self.wineqai_chat.wine_sweetness + '&';
			}
			if ( self.wineqai_chat.wine_acidity != '' ) {
				query_string += 'acidity=' + self.wineqai_chat.wine_acidity + '&';
			}
			if ( self.wineqai_chat.wine_style != '' ) {
				query_string += 'primary_aroma=' + self.wineqai_chat.wine_style + '&';
			}
			if ( self.wineqai_chat.wine_aroma != '' ) {
				query_string += 'secondary_aroma=' + self.wineqai_chat.wine_aroma + '&';
			}
			if ( self.wineqai_chat.food != '' ) {
				query_string += 'food=' + self.wineqai_chat.food + '&';
			}
			if ( self.wineqai_chat.budget != '' ) {
				query_string += 'budget=' + self.wineqai_chat.budget;
			}

			xhttp.open('GET', 'https://app.wineq.ai/api/products/' + options.key + query_string, true);
			xhttp.send();
			xhttp.onreadystatechange = function() {
				if ( this.readyState == 4 && this.status == 200 ) {
					self.wineqai_chat.api_results = JSON.parse(this.responseText);

					self.wineqai_chat.html_results = '<div class="wineqai-results"><div class="wineqai-results-inner">';

					for ( var i = 0; i < self.wineqai_chat.api_results.length; i++ ) {
						var api_result = wineqai_result;

						api_result = api_result.replace('[wine_result.image_url]', self.wineqai_chat.api_results[i].image_url);
						api_result = api_result.replace('[wine_result.name]', self.wineqai_chat.api_results[i].name);
						api_result = api_result.replace('[wine_result.producer]', self.wineqai_chat.api_results[i].producer);
						api_result = api_result.replace('[wine_result.rrp]', self.wineqai_chat.api_results[i].rrp);
						api_result = api_result.replace('[wine_result.varietal]', self.wineqai_chat.api_results[i].varietal);
						api_result = api_result.replace('[wine_result.region]', self.wineqai_chat.api_results[i].region);
						api_result = api_result.replace('[wine_result.country]', self.wineqai_chat.api_results[i].country);
						api_result = api_result.replace('[wine_result.vintage]', self.wineqai_chat.api_results[i].vintage);
						api_result = api_result.replace('[wine_result.url]', self.wineqai_chat.api_results[i].url + '?utm_source=wineq&utm_medium=web-widget&utm_campaign=' + options.key);
						api_result = api_result.replace('[wine_result.id]', self.wineqai_chat.api_results[i].id);

						self.wineqai_chat.html_results += api_result;
					}

					self.wineqai_chat.html_results += '</div></div>';

					localStorage.setItem('wineqai-chat', JSON.stringify(self.wineqai_chat));

					self.show_results();
				}
			};
		} else {
			self.show_results();
		}
	};

	self.show_results = function() {
		if ( self.campaign.platform ) {
			self.chat_body.innerHTML = '<div class="wineqai-chat-body-inner"><div class="wineqai-chat-body-inside">' + wineqai_results_message.replace('[wine_results.count]', self.wineqai_chat.api_results.length) + '</div>' + self.wineqai_chat.html_results + wineqai_buy_pack.replace('[wine_results.count]', self.wineqai_chat.api_results.length) + wineqai_start_over + '</div>';

			self.init_buy_pack();
		} else {
			self.chat_body.innerHTML = '<div class="wineqai-chat-body-inner"><div class="wineqai-chat-body-inside">' + wineqai_results_message.replace('[wine_results.count]', self.wineqai_chat.api_results.length) + '</div>' + self.wineqai_chat.html_results + wineqai_start_over + '</div>';
		}

		self.shadow_root.querySelectorAll('.wineqai-chat-body-inner')[0].scrollTop = self.shadow_root.querySelectorAll('.wineqai-chat-body-inner')[0].scrollHeight;

		for ( var i = 0; i < self.shadow_root.querySelectorAll('.wineqai-result-bottom-opener').length; i++ ) {
	    	self.shadow_root.querySelectorAll('.wineqai-result-bottom-opener')[i].addEventListener('click', function(e) {
		    	for ( var j = 0; j < self.shadow_root.querySelectorAll('.wineqai-result-bottom').length; j++ ) {
			    	self.shadow_root.querySelectorAll('.wineqai-result-bottom')[j].classList.toggle('open');
			    }
			});
		}

		for ( var i = 0; i < self.shadow_root.querySelectorAll('.buy-now').length; i++ ) {
	    	self.shadow_root.querySelectorAll('.buy-now')[i].addEventListener('click', function(e) {
		    	var	xhttp = new XMLHttpRequest();

				xhttp.open('POST', 'https://app.wineq.ai/api/event/' + options.key + '/buy_wine', true);
				xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				xhttp.send('id=' + e.target.getAttribute('data-id'));
			});
		}

		self.shadow_root.querySelector('#wineqai-start-over').addEventListener('click', function(e) {
			e.preventDefault();

			self.wineqai_chat.wine_sweetness = '';
			self.wineqai_chat.wine_acidity = '';
			self.wineqai_chat.wine_style = '';
			self.wineqai_chat.wine_aroma = '';
			self.wineqai_chat.food = '';
			self.wineqai_chat.budget = '';
			self.wineqai_chat.api_results = '';
			self.wineqai_chat.html_results = '';

			localStorage.setItem('wineqai-chat', JSON.stringify(self.wineqai_chat));

			self.load_question();

			var	xhttp = new XMLHttpRequest();

			xhttp.open('POST', 'https://app.wineq.ai/api/event/' + options.key + '/start_over', true);
			xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhttp.send();
		});
	};

	self.init_buy_pack = function() {
		self.shadow_root.querySelector('#buy-mix-pack').addEventListener('click', function(e) {
			e.preventDefault();

			let wine_ids = [];
			for ( var i = 0; i < self.shadow_root.querySelectorAll('.buy-now').length; i++ ) {
				wine_ids[i] = 'ids[]=' + self.shadow_root.querySelectorAll('.buy-now')[i].getAttribute('data-id');
			}

			var	xhttp = new XMLHttpRequest();

			xhttp.open('POST', 'https://app.wineq.ai/api/event/' + options.key + '/buy_pack', true);
			xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhttp.send(wine_ids.join('&'));

			return;

			// WooCommerce
			var	xhttp = new XMLHttpRequest();

			xhttp.open('GET', document.location.origin + '?add-to-cart=18182&quantity=1', true);
			xhttp.send();

			xhttp.onreadystatechange = function() {
				if ( this.readyState == 4 && this.status == 200 ) {
					xhttp.open('GET', document.location.origin + '?add-to-cart=13184&quantity=1', true);
					xhttp.send();

					xhttp.onreadystatechange = function() {
						if ( this.readyState == 4 && this.status == 200 ) {
							window.open(document.location.origin + '/kosik/', '_blank').focus();
						}
					};
				}
			};

			// Shopify
			fetch('https://aaa.bbb/cart/add.js', {
			    method: "post",
			    headers: { 'content-type': 'application/json' },
			    body: JSON.stringify({
			        items: [
			            {
			                id: 1234,
			                quantity: 1
			            },
			            {
			                id: 4321,
			                quantity: 1
			            }
			        ]
			    })
			}).then(function (response) {
				if (response.ok) {
					return response.json();
				}
				return Promise.reject(response);
			}).then(function (data) {
				console.log(data);
				window.open(document.location.origin + '/cart', '_blank').focus();
			}).catch(function (error) {
				console.warn(error);
			});
		});
	};

    self.init();

    return {};
};