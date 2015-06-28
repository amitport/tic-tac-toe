import './index.css!';
import angular from 'angular';

angular.module('game', [])
    .controller('GameCtrl', function () {
        this.board = [[1,2,3],[4,5,6],[7,8,9]];
    })
    .directive('board', function() {
        return {templateUrl: 'components/game/board.html'};
    })
    .directive('cell', function() {
        return {
            scope: true,
            templateUrl: 'components/game/cell.html',
            link: function(scope, iElement, iAttrs) {
                //let markColors = {
                //    [Cell.EMPTY]: null,
                //    [Cell.X]: 'rgb(100, 100, 193)',
                //    [Cell.O]: 'rgb(234, 123, 123)'
                //};
                //let markIcons = {
                //    [Cell.EMPTY]: null,
                //    [Cell.X]: 'img/icons/ic_close_black_24px.svg',
                //    [Cell.O]: 'img/icons/ic_panorama_fish_eye_black_24px.svg'
                //};
                const x = scope.x = iAttrs.x;
                const y = scope.y = iAttrs.y;
                if (x === '1' || y === '1') {
                    scope.borderStyle = {
                        'border-style': 'solid'
                    };
                    if (x !== '1') {
                        scope.borderStyle['border-width'] = '0 1px';
                    } else if (y !== '1') {
                        scope.borderStyle['border-width'] = '1px 0';
                    } else {
                        scope.borderStyle['border-width'] = '1px';
                    }
                }

                //style="border: 1px solid rgb(208, 208, 208);"
                //scope.$watch(`room.session.board[${iAttrs.x}][${iAttrs.y}]`, function(newValue) {
                //    scope.mark = newValue;
                //    scope.markColor = markColors[newValue];
                //    scope.markIcon = markIcons[newValue];
                //});
            }
        };
    });

export default 'game';