import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './projectRemove.html';
import { Projects } from '../../../api/projects';

class ProjectRemove {
  remove() {
    if (this.project) {
      Projects.remove(this.project._id);
    }
  }
}

const name = 'projectRemove';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    project: '<'
  },
  controllerAs: name,
  controller: ProjectRemove
});
