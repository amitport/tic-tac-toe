import 'angular-material/angular-material.css!';
import './stylesheets/index.css!';

import angular from 'angular';

import ngMaterial from 'angular-material';
import game from './components/game/index';

angular.element(document).ready(function () {
    angular.bootstrap(document, [ngMaterial, game]);
});
