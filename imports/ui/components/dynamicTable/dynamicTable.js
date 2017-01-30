import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dynamicTable.html';

class Controller {

	constructor($scope, $timeout, $reactive, NgTableParams) {
		'ngInject';
		$reactive(this).attach($scope);
		this.$timeout = $timeout;

		this.dataSet = new NgTableParams({
			count: 10
		}, {
			counts: [5, 10, 25],
			filterDelay: 300,
		});
	};

	$onInit() {
		this.renderTable();
		this.$timeout(this.clickOnHeader, 1000);
	};

	renderTable() {
		this.dataSet.settings({
			dataset: this.data
		});
	};

	clickOnHeader() {
		let headerSelector = 'dynamic-table > div > table > thead > tr.ng-table-sort-header > th:nth-child(1) > div';
		let header = angular.element(document).find(headerSelector)[0];
		header.click();
		header.click();
	}

}

const name = 'dynamicTable';

export default angular.module(name, [
	angularMeteor,
]).component(name, {
	template,
	controllerAs: name,
	controller: Controller,
	bindings: {
		'columns': '=',
		'data': '=',
	},
})
