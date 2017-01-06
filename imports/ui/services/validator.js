export default (notification) => {
	'ngInject';

	return {

		project(project, user) {

			checkUserPoints = () => {
				if (user.profile.points >= project.maxPoints) {
					return true;
				}
				else {
					notification.error('You have not enough points. Reduce the max points or earn new points.');
					return false
				}
			};

			validateMinMaxPoints = () => {
				if (project.minPoints && project.maxPoints &&
					project.minPoints <= project.maxPoints) {
					return true;
				}
				else {
					notification.error('Min points must be greater than max points.');
					return false
				}
			};

			validateMinPoints = () => {
				if (project.minPoints >= 0) {
					return true;
				}
				else {
					notification.error('Min points cannot have minus value.');
					return false
				}
			};

			return checkUserPoints() && validateMinMaxPoints() && validateMinPoints();
		}
	}
};

