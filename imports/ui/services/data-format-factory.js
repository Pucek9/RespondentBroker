// angular.module('respondetesBroker')
// 	.factory('dataTableFormatter',
export default ($filter) => {
		'ngInject';

		const toTitleCase = (text) => {
			return text.replace(/([A-Z])/g, ' $1')
				.replace(/^./, (str) => str.toUpperCase());
		};

		const findWhere = (array, criteria) => {
			return array.find(item =>
				Object.keys(criteria).every(key =>
					item[key] === criteria[key]
				)
			)
		};

		return {

			randomDateString() {
				return $filter('date')(this.randomDate(), 'yyyy/MM/dd  hh:mm')
			},

			randomDate() {
				return Math.floor(Math.random() * new Date());
			},

			generateColumns(sampleData, params) {
				console.log('generateColumns',sampleData,params)
				if(sampleData) {
					let colNames = Object.getOwnPropertyNames(sampleData);
					let cols = colNames.map((name) => {
						let filter = {};
						filter[name] = 'text';
						return {
							title: (params.formatTittle ? toTitleCase(name) : name),
							sortable: name,
							filter: filter,
							show: true,
							field: name
						};
					});

					const idField = {field: '_id'};
					let idCol = findWhere(cols, idField);
					if (params.hideId) {
						idCol.show = false;
					}
console.log([idCol].concat(cols.filter(i => ![idCol].includes(i))))
					return [idCol].concat(cols.filter(i => ![idCol].includes(i)));
				}
				return null;
			}
		}

	};

