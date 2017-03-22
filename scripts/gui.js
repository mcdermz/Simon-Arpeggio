console.log('gui sanity check!');

$(document).on('load', function () {
  reset();
});

$('#start-btn').on('click', startButton);

$(document).on('keypress', function (e){
  if (e.which === 13 && $('#start-btn').hasClass('scale-in')) startButton();
})

$('#hint-btn').on('click', hintButton);

$('.game-gui').on('mousedown', '.col', mousedownGUI);

$('.game-gui').on('mouseup', '.col', mouseupGUI);

$('body').on('keydown keyup', function (e) {
  hotKeysPress(e);
});

$('body').on('keyup', function (e) {
  if (userRecord) {
    hotKeysUp(e);
    startUserPattern();
  }
});

function startButton() {
  reset();
  startPlayback(0);
  $('#hint-btn')
    .text('hints left: 2')
    .removeClass('scale-out')
    .addClass('scale-in');
  $('#start-btn')
    .addClass('scale-out')
    .removeClass('scale-in');
}

function hintButton() {
  startPlayback(0);
  userPattern = []
  hints--;
  $('#hint-btn').text('hints left: ' + hints);
  if (hints <= 0) {
    $('#hint-btn')
      .removeClass('scale-in')
      .addClass('scale-out');
  }
}

function startBoxAction($box) {
  playTone(toneObject[$box.attr('id')]);
  $box.addClass('lighten-5 clicked');
}

function endBoxAction($box) {
  stopTone(toneObject[$box.attr('id')]);
  $box.removeClass('lighten-5 clicked');
}

function mousedownGUI () {
  if (uI) {
    startBoxAction($(this));
    if ($(this).hasClass('clicked')) {
      $(this).mouseleave(function () {
        endBoxAction($(this))
      });
    }
  }
}

function mouseupGUI () {
  let $boxNum = $(this).attr('id');
  if (uI && $(this).hasClass('clicked')) {
    endBoxAction($(this))
  }
  if (userRecord && $boxNum !== undefined) {
    userPattern.push($boxNum);
    startUserPattern();
  }
}

function hotKeysUp(e) {
  let keyAction = {
    65: '1',
    83: '2',
    68: '3',
    70: '4',
    71: '5',
  };
  let keyID = keyAction[e.which];
  if (typeof keyID != 'undefined' && uI) {
    userPattern.push(keyID);
  }
}

function hotKeysPress(e) {
  let keyAction = {
    65: '1',
    83: '2',
    68: '3',
    70: '4',
    71: '5',
  };
  let boxNum = keyAction[e.which]
  let boxID = '#' + boxNum;
  if (uI) {
    if (e.type === 'keydown' && boxNum !== undefined) {
      startBoxAction($(boxID))
    } else if (boxNum !== undefined) {
      endBoxAction($(boxID))
    }
  }
}