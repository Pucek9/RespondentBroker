import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './dynamicTable.html';

class DynamicTable {

	constructor($scope,$reactive,NgTableParams) {
		'ngInject';
		$reactive(this).attach($scope);
		this.dataSet = new NgTableParams({
			count: 10
		}, {
			counts: [5, 10, 25],
			filterDelay: 300,
		});
	};

	$onInit() {
		this.renderTable();
	};

	renderTable() {
		this.dataSet.settings({
			dataset: this.data
			});
	};

}

const name = 'dynamicTable';

export default angular.module(name, [
	angularMeteor,
]).component(name, {
	template,
	controllerAs: name,
	controller: DynamicTable,
	bindings: {
		'columns': '=',
		'data': '=',
	},
})
