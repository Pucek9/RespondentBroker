import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './normalTable.html';
import {Projects} from '../../../api/projects';
// import {name as Actions} from '../actions/actions';


class NormalTable {

	constructor($scope,$reactive,NgTableParams) {
		'ngInject';
		$reactive(this).attach($scope);
		this.dataSet = new NgTableParams({
			count: 5
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

const name = 'normalTable';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	// Actions
]).component(name, {
	template,
	controllerAs: name,
	controller: NormalTable,
	bindings: {
		'data': '='
	},
})
