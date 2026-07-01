var ThisOneAI_Tool = function() {
	var self = {
		calc_companies: 0,
		calc_skus: 0,
		calc_cost: 0,
		calc_uptake: 0
	};

	self.init = function() {
		self.sliders();
		self.companies();

		for ( var i = 0; i < document.querySelectorAll('form input').length; i++ ) {
			document.querySelectorAll('form input')[i].addEventListener('change', function(e) {
				self.calculate();
			});
		}

		document.getElementById('new-revenue').innerHTML = new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD', maximumFractionDigits: 0}).format(Math.floor(Math.random() * 1000000000));
	};

	self.companies = function() {
		for ( var i = 0; i < document.querySelectorAll('form input.company-all-1').length; i++ ) {
			document.querySelectorAll('form input.company-all-1')[i].addEventListener('change', function(e) {
				var companies = 0;

				for ( var j = 0; j < document.querySelectorAll('form input.company-all-1').length; j++ ) {
					if ( document.querySelectorAll('form input.company-all-1')[j].checked ) {
						companies += parseInt(document.querySelectorAll('form input.company-all-1')[j].value);

						document.querySelectorAll('form input.company-all-1')[j].parentNode.parentNode.classList.add('active');
					} else {
						document.querySelectorAll('form input.company-all-1')[j].parentNode.parentNode.classList.remove('active');
					}
				}

				if ( companies > 0 ) {
					document.querySelector('#company-group-1').innerHTML = new Intl.NumberFormat("en-AU").format(companies);
				} else {
					document.querySelector('#company-group-1').innerHTML = '<br>';
				}

				if ( document.querySelectorAll('form input.company-all-1:checked').length == 5 ) {
					document.querySelector('#company-all-1').checked = true;
				} else {
					document.querySelector('#company-all-1').checked = false;
				}
			});
		}

		document.querySelector('#company-all-1').addEventListener('change', function(e) {
			for ( var i = 0; i < document.querySelectorAll('form input.company-all-1').length; i++ ) {
				if ( document.querySelector('#company-all-1').checked ) {
					document.querySelectorAll('form input.company-all-1')[i].checked = true;
				} else {
					document.querySelectorAll('form input.company-all-1')[i].checked = false;
				}
			}

			document.querySelectorAll('form input.company-all-1')[0].dispatchEvent(new Event('change'));
		});


		for ( var i = 0; i < document.querySelectorAll('form input.company-all-2').length; i++ ) {
			document.querySelectorAll('form input.company-all-2')[i].addEventListener('change', function(e) {
				var companies = 0;

				for ( var j = 0; j < document.querySelectorAll('form input.company-all-2').length; j++ ) {
					if ( document.querySelectorAll('form input.company-all-2')[j].checked ) {
						companies += parseInt(document.querySelectorAll('form input.company-all-2')[j].value);

						document.querySelectorAll('form input.company-all-2')[j].parentNode.parentNode.classList.add('active');
					} else {
						document.querySelectorAll('form input.company-all-2')[j].parentNode.parentNode.classList.remove('active');
					}
				}

				if ( companies > 0 ) {
					document.querySelector('#company-group-2').innerHTML = new Intl.NumberFormat("en-AU").format(companies);
				} else {
					document.querySelector('#company-group-2').innerHTML = '<br>';
				}

				if ( document.querySelectorAll('form input.company-all-2:checked').length == 5 ) {
					document.querySelector('#company-all-2').checked = true;
				} else {
					document.querySelector('#company-all-2').checked = false;
				}
			});
		}

		document.querySelector('#company-all-2').addEventListener('change', function(e) {
			for ( var i = 0; i < document.querySelectorAll('form input.company-all-2').length; i++ ) {
				if ( document.querySelector('#company-all-2').checked ) {
					document.querySelectorAll('form input.company-all-2')[i].checked = true;
				} else {
					document.querySelectorAll('form input.company-all-2')[i].checked = false;
				}
			}

			document.querySelectorAll('form input.company-all-2')[0].dispatchEvent(new Event('change'));
		});


		for ( var i = 0; i < document.querySelectorAll('form input.company-all-3').length; i++ ) {
			document.querySelectorAll('form input.company-all-3')[i].addEventListener('change', function(e) {
				var companies = 0;

				for ( var j = 0; j < document.querySelectorAll('form input.company-all-3').length; j++ ) {
					if ( document.querySelectorAll('form input.company-all-3')[j].checked ) {
						companies += parseInt(document.querySelectorAll('form input.company-all-3')[j].value);

						document.querySelectorAll('form input.company-all-3')[j].parentNode.parentNode.classList.add('active');
					} else {
						document.querySelectorAll('form input.company-all-3')[j].parentNode.parentNode.classList.remove('active');
					}
				}

				if ( companies > 0 ) {
					document.querySelector('#company-group-3').innerHTML = new Intl.NumberFormat("en-AU").format(companies);
				} else {
					document.querySelector('#company-group-3').innerHTML = '<br>';
				}

				if ( document.querySelectorAll('form input.company-all-3:checked').length == 3 ) {
					document.querySelector('#company-all-3').checked = true;
				} else {
					document.querySelector('#company-all-3').checked = false;
				}
			});
		}

		document.querySelector('#company-all-3').addEventListener('change', function(e) {
			for ( var i = 0; i < document.querySelectorAll('form input.company-all-3').length; i++ ) {
				if ( document.querySelector('#company-all-3').checked ) {
					document.querySelectorAll('form input.company-all-3')[i].checked = true;
				} else {
					document.querySelectorAll('form input.company-all-3')[i].checked = false;
				}
			}

			document.querySelectorAll('form input.company-all-3')[0].dispatchEvent(new Event('change'));
		});
	}

	self.sliders = function() {
		const vitamins_range_input = document.getElementById('vitamins-range');
		const vitamins_range_output = document.getElementById('vitamins-range-value');

		vitamins_range_output.innerHTML = vitamins_range_input.value + '<span>SKUs</span>';

		vitamins_range_input.addEventListener('input', function() {
			vitamins_range_output.innerHTML = this.value + '<span>SKUs</span>';
		});

		const skincare_range_input = document.getElementById('skincare-range');
		const skincare_range_output = document.getElementById('skincare-range-value');

		skincare_range_output.innerHTML = skincare_range_input.value + '<span>SKUs</span>';

		skincare_range_input.addEventListener('input', function() {
			skincare_range_output.innerHTML = this.value + '<span>SKUs</span>';
		});

		const fragrances_range_input = document.getElementById('fragrances-range');
		const fragrances_range_output = document.getElementById('fragrances-range-value');

		fragrances_range_output.innerHTML = fragrances_range_input.value + '<span>SKUs</span>';

		fragrances_range_input.addEventListener('input', function() {
			fragrances_range_output.innerHTML = this.value + '<span>SKUs</span>';
		});

		const cost_range_input = document.getElementById('cost-range');
		const cost_range_output = document.getElementById('cost-range-value');

		cost_range_output.innerHTML = cost_range_input.value + '<span>SKU/Day/Cost</span>';

		cost_range_input.addEventListener('input', function() {
			cost_range_output.innerHTML = this.value + '<span>SKU/Day/Cost</span>';
		});

		const uptake_range_input = document.getElementById('uptake-range');
		const uptake_range_output = document.getElementById('uptake-range-value');

		uptake_range_output.innerHTML = uptake_range_input.value + '%<span>Uptake</span>';

		uptake_range_input.addEventListener('input', function() {
			uptake_range_output.innerHTML = this.value + '%<span>Uptake</span>';
		});
	};

	self.calculate = function() {
		self.calc_companies = 0;
		self.calc_skus = 0;

		for ( var i = 0; i < document.querySelectorAll('form input[name="company[]"]').length; i++ ) {
			if ( document.querySelectorAll('form input[name="company[]"]')[i].checked ) {
				self.calc_companies += parseInt(document.querySelectorAll('form input[name="company[]"]')[i].value);
			}
		}

		if ( document.getElementById('category-vitamins').checked ) {
			self.calc_skus += parseInt(document.getElementById('vitamins-range').value);
		}
		if ( document.getElementById('category-skincare').checked ) {
			self.calc_skus += parseInt(document.getElementById('skincare-range').value);
		}
		if ( document.getElementById('category-fragrances').checked ) {
			self.calc_skus += parseInt(document.getElementById('fragrances-range').value);
		}

		self.calc_cost = parseFloat(document.getElementById('cost-range').value);

		self.calc_uptake = parseInt(document.getElementById('uptake-range').value)/100;

		var revenue = self.calc_companies * self.calc_skus * self.calc_cost * self.calc_uptake * 365;

		if ( revenue ) {
			document.getElementById('new-revenue').innerHTML = new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD', maximumFractionDigits: 0}).format(revenue);
			document.getElementById('new-revenue').classList.add('active');
		} else {
			document.getElementById('new-revenue').classList.remove('active');
			document.getElementById('new-revenue').innerHTML = new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD', maximumFractionDigits: 0}).format(Math.floor(Math.random() * 1000000000));
		}
	};

	self.init();

	return {};
};

new ThisOneAI_Tool();