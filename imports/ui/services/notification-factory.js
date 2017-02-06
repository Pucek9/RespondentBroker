export default ($mdToast) => {
		'ngInject';

		 notify = (text, type) => {
			 $mdToast.show(
				 $mdToast.simple()
					 .textContent(text)
					 .toastClass(`md-${type}-toast-theme`)
					 .hideDelay(5000)
					 .action('x')
			 );
		};


		return {

			success(text) {
				notify(text,'success');
			},

			error(text) {
				notify(text,'error');
			},

			warning(text) {
				notify(text,'warning');
			},

			info(text) {
				notify(text,'info');
			},
}
	};

