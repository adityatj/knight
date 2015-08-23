$(document).ready(function() {
    var BOARD_MAX = 5;

    var knightTemplate = '<div class="tile tile-generic"><div class="tile-knight tile-inner">&#9822;</div></div>';
    var gridCellTemplate = '<div class="grid-cell"></div>';
    var goalTemplate = '<div class="tile tile-generic"><div class="tile-queen tile-inner">&#9819;</div></div>';
    var gridRowTemplate = '<div class="grid-row"></div>';
    var blankCellTempalte = '<div class="tile tile-generic blank-grid-cell"></div>';

    var knightPosX, knightPosY, goalPosX, goalPosY, blankCells = [11, 15, 51, 55];
    //var goalPosX, goalPosY;
    //while ((goalPosX = getRand()) == knightPosX);
    //goalPosY = getRand();

    //init grid
    initGrid();

    function makeMove(e) {

        var el = $(e.target);
        if (el.hasClass('tile-knight')) {
            return;
        } else if (el.hasClass('fade-to-black')) {
            return;
        } else {
            if (el.hasClass('red-tile')) {
                if (isValidKnightMove(goalPosX, goalPosY) && $('.fade-to-black').size() == BOARD_MAX * BOARD_MAX - 6) {
                    $('.game-message').addClass('game-won');
                    $('.game-message p').text('You Win!');
                } else
                    return;
            }
            var cellId = el.attr('id');
            var nextPosX = parseInt(cellId.split('-')[1]);
            var nextPosY = parseInt(cellId.split('-')[2]);
            if (isValidKnightMove(nextPosX, nextPosY)) {
                var knight = $('.tile-knight').parent();
                var transX = (nextPosX - knightPosX) * 98;
                if (Math.abs(nextPosX - knightPosX) == 2)
                    transX = (transX > 0) ? transX : transX + 3;
                var transY = (nextPosY - knightPosY) * 98;
                if (Math.abs(nextPosY - knightPosY) == 2)
                    transY = (transY > 0) ? transY : transY + 3;
                var transAttr = 'translate(' + transY + 'px, ' + transX + 'px)';
                if (!knight.parent().hasClass('red-tile'))
                    knight.parent().addClass('fade-to-black');
                knight.css({
                    '-webkit-transform': transAttr,
                    '-moz-transform': transAttr,
                    'transform': transAttr,
                    'transition-duration': '200ms',
                });
                setTimeout(function() {
                    knight.removeAttr('style');
                    knight.remove();
                    el.append(knight);
                    knightPosX = nextPosX;
                    knightPosY = nextPosY;
                    if (!isNextMovePossible() && !$('.game-message').hasClass('game-won')) {
                        $('.game-message').addClass('game-over');
                        $('.game-message p').text('Game Over!');
                    }
                }, 200);
            }
        }
    }

    function isNextMovePossible() {
        var onlyRedTile;
        var el = $('#pos-' + (knightPosX + 2) + '-' + (knightPosY + 1));
        if (el.size() > 0 && !(el.hasClass('fade-to-black') || el.hasClass('blank-grid-cell'))) {
            if (el.hasClass('red-tile'))
                onlyRedTile = true;
            else
                return true;
        }
        el = $('#pos-' + (knightPosX + 2) + '-' + (knightPosY - 1));
        if (el.size() > 0 && !(el.hasClass('fade-to-black') || el.hasClass('blank-grid-cell'))) {
            if (el.hasClass('red-tile'))
                onlyRedTile = true;
            else
                return true;
        }
        el = $('#pos-' + (knightPosX - 2) + '-' + (knightPosY + 1));
        if (el.size() > 0 && !(el.hasClass('fade-to-black') || el.hasClass('blank-grid-cell'))) {
            if (el.hasClass('red-tile'))
                onlyRedTile = true;
            else
                return true;
        }
        el = $('#pos-' + (knightPosX - 2) + '-' + (knightPosY - 1));
        if (el.size() > 0 && !(el.hasClass('fade-to-black') || el.hasClass('blank-grid-cell'))) {
            if (el.hasClass('red-tile'))
                onlyRedTile = true;
            else
                return true;
        }
        el = $('#pos-' + (knightPosX + 1) + '-' + (knightPosY + 2));
        if (el.size() > 0 && !(el.hasClass('fade-to-black') || el.hasClass('blank-grid-cell'))) {
            if (el.hasClass('red-tile'))
                onlyRedTile = true;
            else
                return true;
        }
        el = $('#pos-' + (knightPosX + 1) + '-' + (knightPosY - 2));
        if (el.size() > 0 && !(el.hasClass('fade-to-black') || el.hasClass('blank-grid-cell'))) {
            if (el.hasClass('red-tile'))
                onlyRedTile = true;
            else
                return true;
        }
        el = $('#pos-' + (knightPosX - 1) + '-' + (knightPosY + 2));
        if (el.size() > 0 && !(el.hasClass('fade-to-black') || el.hasClass('blank-grid-cell'))) {
            if (el.hasClass('red-tile'))
                onlyRedTile = true;
            else
                return true;
        }
        el = $('#pos-' + (knightPosX - 1) + '-' + (knightPosY - 2));
        if (el.size() > 0 && !(el.hasClass('fade-to-black') || el.hasClass('blank-grid-cell'))) {
            if (el.hasClass('red-tile'))
                onlyRedTile = true;
            else
                return true;
        }
        if (onlyRedTile) {
            if ($('.fade-to-black').size() == BOARD_MAX * BOARD_MAX - 6) {
                return true;
            }
        }
        return false;
    }

    function isValidKnightMove(x, y) {
        return (knightPosX + 2 == x && knightPosY + 1 == y) || (knightPosX + 2 == x && knightPosY - 1 == y) || (knightPosX - 2 == x && knightPosY + 1 == y) || (knightPosX - 2 == x && knightPosY - 1 == y) || (knightPosX + 1 == x && knightPosY + 2 == y) || (knightPosX + 1 == x && knightPosY - 2 == y) || (knightPosX - 1 == x && knightPosY + 2 == y) || (knightPosX - 1 == x && knightPosY - 2 == y);
    }

    function initGrid() {
        //assign handlers to keep playing and try again buttons
        $('a.keep-playing-button').on('click', function(e) {
            initGrid();
        });
        $('a.retry-button').on('click', function(e) {
            initGrid();
        });
        $('a.restart-button').on('click', function(e) {
            initGrid();
        });
        $('.grid-container').children().remove();
        $('.game-message').removeClass('game-won');
        $('.game-message').removeClass('game-over');
        $('.game-message p').text('');
        knightPosX = getRand();
        knightPosY = getRand();
        while (blankCells.indexOf(knightPosX * 10 + knightPosY) != -1) {
            knightPosX = getRand();
            knightPosY = getRand();
        }
        goalPosX = 10 + knightPosX - 10;
        goalPosY = 10 + knightPosY - 10;
        var gridContainer = $('.grid-container');
        for (var i = 1; i <= BOARD_MAX; i++) {
            var gridRow = $(gridRowTemplate);
            for (var j = 1; j <= BOARD_MAX; j++) {
                var gridCell = $(gridCellTemplate),
                    tile = undefined;
                gridCell.attr('id', 'pos-' + i + '-' + j);
                if (knightPosX == i && knightPosY == j)
                    tile = $(knightTemplate);
                if (isDefined(tile)) {
                    gridCell.addClass('red-tile');
                    gridCell.addClass('knight-appear');
                    gridCell.append(tile);
                }
                if (blankCells.indexOf(i * 10 + j) != -1)
                    gridCell.addClass('blank-grid-cell');
                gridRow.append(gridCell);
            }
            gridContainer.append(gridRow);
        }
        //init cell handlers
        $('.grid-cell:not(.blank-grid-cell)').on('click', makeMove);
    }

    function isDefined(obj) {
        return typeof obj !== 'undefined';
    }

    function getRand() {
        return Math.floor((Math.random() * BOARD_MAX) + 1);
    }
});
