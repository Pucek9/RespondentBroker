export default (precision = 4) => {

	return {
		median (values) {
			values.sort(function (a, b) {
				return a - b;
			});
			let half = Math.floor(values.length / 2);
			if (values.length % 2)
				return values[half];
			else
				return (values[half - 1] + values[half]) / 2.0;
		},

		average (values) {
			if (values.length > 0) {
				let sum = values.reduce(function (a, b) {
					return a + b;
				});
				return sum / values.length;
			} else return 0;
		},

		variance (values) {
			let avg = this.average(values);
			let squareDiffs = values.map(function (value) {
				let diff = value - avg;
				return diff * diff;
			});
			let avgSquareDiff = this.average(squareDiffs);
			return avgSquareDiff;
		},

		min (values) {
			return Math.min(...values);
		},

		max (values) {
			return Math.max(...values);
		},

		standardDeviation (values) {
			let avgSquareDiff = this.variance(values);
			let stdDev = Math.sqrt(avgSquareDiff);
			return stdDev;
		},

		transpose(a) {
			if (a[0] )
			{
				return Object.keys(a[0]).map(c => a.map(r => r[c]));
			}
			else return []
		}

	}

}