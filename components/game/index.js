import './index.css!';
import angular from 'angular';

import {BasicAi} from 'tic-tac-toe/lib/ai/basic';
import Session from 'tic-tac-toe/lib/session';
import Cell from 'tic-tac-toe/lib/cell';
let markColors = {
    [Cell.EMPTY]: null,
    [Cell.X]: 'rgb(100, 100, 193)',
    [Cell.O]: 'rgb(234, 123, 123)'
};
let markIcons = {
    [Cell.EMPTY]: null,
    [Cell.X]: 'img/icons/ic_close_black_24px.svg',
    [Cell.O]: 'img/icons/ic_panorama_fish_eye_black_24px.svg'
};

angular.module('game', [])
    .controller('GameCtrl', function () {
        this.XColor = markColors[Cell.X];
        this.OColor = markColors[Cell.O];

        const human = {
            init(session, mark, next){
                this.session = session;
                this.mark = mark;
                this.next=next;
            },
            makeMove(){
                console.log('Human turn to make a move');
            }
        };
        this.stat = [0, 0];
        this.session = new Session(human, new BasicAi(), (result) => {
            if (result !== 'tie') {
                this.stat[this.session.currentPlayer === human ? 0 : 1]++;
            }
            console.log('Game Ended with ' + result);
        });

        this.replay = function() {
            this.session.init();
        };
    })
    .directive('board', function() {
        return {templateUrl: 'components/game/board.html'};
    })
    .directive('fadeStatChange', function($animate) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, iElement, iAttrs) {
                iElement.addClass('stat');
                const idx = iAttrs.fadeStatChange;
                scope.$watchCollection('game.stat', function (stat) {
                    if (stat[idx] !== 0 && stat[idx] !== scope.playerStat) {
                        $animate.addClass(iElement, 'fade').then(function() {
                            scope.playerStat = stat[idx];
                            $animate.removeClass(iElement, 'fade');
                        });
                    } else {
                        scope.playerStat = stat[idx];
                    }
                });
            }
        };
    })
    .directive('cell', function() {
        return {
            scope: true,
            templateUrl: 'components/game/cell.html',
            link: function(scope, iElement, iAttrs) {

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

                scope.$watch(`game.session.board[${iAttrs.x}][${iAttrs.y}]`, function(newValue) {
                    scope.mark = newValue;
                    scope.markColor = markColors[newValue];
                    scope.markIcon = markIcons[newValue];
                });
            }
        };
    });

export default 'game';