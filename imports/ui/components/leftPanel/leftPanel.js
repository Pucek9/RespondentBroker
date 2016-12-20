import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {name as Navigation} from '../navigation/navigation';
import {name as UserPanel} from '../userPanel/userPanel';
import template from './leftPanel.html';

class LeftPanel {

	constructor() {
		this.logo = 'Respondent Broker';
		// Get the Sidenav
		this.mySidenav = document.getElementById("mySidenav");
		// Get the DIV with overlay effect
		this.overlayBg = document.getElementById("myOverlay");
	};

	// Toggle between showing and hiding the sidenav, and add overlay effect
	w3_open() {
		if (this.mySidenav.style.display === 'block') {
			this.mySidenav.style.display = 'none';
			this.overlayBg.style.display = "none";
		} else {
			this.mySidenav.style.display = 'block';
			this.overlayBg.style.display = "block";
		}
	};

	// Close the sidenav with the close button
	w3_close() {
		this.mySidenav.style.display = "none";
		this.overlayBg.style.display = "none";
	};

}


const name = 'leftPanel';

// create a module
export default angular.module(name, [
	angularMeteor,
	Navigation,
	UserPanel
]).component(name, {
	template,
	controller: LeftPanel,
	controllerAs: name
});