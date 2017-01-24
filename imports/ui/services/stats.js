export default () => {

	return {
		median (values) {
			values.sort(function (a, b) {
				return a - b;
			});
			let half = Math.floor(values.length / 2);
			if (values.length % 2)
				return values[half];
			else
				return Number((values[half - 1] + values[half]) / 2.0).toFixed(2);
		},

		average (values) {
			if (values.length > 0) {
				let sum = values.reduce(function (a, b) {
					return a + b;
				});
				return Number((sum / values.length).toFixed(2));
			} else return 0;
		},

		standardDeviation (values) {
			let avg = this.average(values);
			let squareDiffs = values.map(function (value) {
				let diff = value - avg;
				return diff * diff;
			});
			let avgSquareDiff = this.average(squareDiffs);
			let stdDev = Math.sqrt(avgSquareDiff);
			return Number(stdDev.toFixed(2));
		},

		transpose(a) {
			return Object.keys(a[0]).map(
				function (c) {
					return a.map(function (r) {
						return r[c];
					});
				}
			);
		}


	}

}