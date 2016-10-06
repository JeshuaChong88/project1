// Make a game where dice rolls determine damage and the human player fights
// against a computer. Make sure that the functionality which deducts hp after
// dice has been rolled.
// To-do-list: background music
// ask shi hao regarding canvas, attack animation

// bonus: animation movement, victory music, encounter system.

var currentPlayer = 1
var enemyRoster = [{ max: 40, src: 'images/monster.png'}, {max: 60, src: 'images/Kefka.gif'},
   {max: 80, src: 'images/Sephiroth.png'}, {max: 100, src: 'images/SaferSephiroth.png'}]
var $playerHp = $('#playerHealth')
var $enemyHp = $('#enemyHealth')
var level = -1

function init () {
  $playerHp[0].value = 50
  $playerHp[0].max = 50
  $enemyHp[0].value = 30
  $enemyHp[0].max = 30
  $('#hpbar').text($playerHp[0].value + '/' + $playerHp[0].max)
  $('#enemybar').text($enemyHp[0].value + '/' + $enemyHp[0].max)
  var $initialImageOne = $('img').eq(0)
  $initialImageOne.attr('src', 'images/Cloud.png' )
  var $initialImageTwo = $('img').eq(1)
  $initialImageTwo.attr('id', 'enemy' )
  $initialImageTwo.attr('src', 'images/Belias.gif' )
}

init()

function dmgRoll(result) {
  switch(result) {
    case 1:
    case 2:
    case 3:
      return 2;
      break;
    case 4:
    case 5:
    case 6:
      return 4;
      break;
    case 6:
    case 7:
    case 8:
      return 6;
      break;
    case 9:
    case 10:
    case 11:
      return 8;
      break;
    case 12:
    case 13:
    case 14:
      return 10;
      break;
    case 15:
    case 16:
    case 17:
      return 12;
      break;
    case 18:
      return 15;
      break;
    case 19:
      return 16;
      break;
    case 20:
      return 20;
      break;
    }
}

var $dice = $('.roll');

$dice.on('click', clickHandler)
$dice.on('mouseover', attackIcon)

function attackIcon() {
  return "Attack"
}

function roll() {
  return Math.floor(Math.random()*20) + 1
}

function generateEnemy(enemyIndex) {
   $enemyHp[0].value = enemyRoster[enemyIndex].max
   $enemyHp[0].max = enemyRoster[enemyIndex].max
   var $enemyImage = $('#enemy')
   $enemyImage.attr('src', enemyRoster[enemyIndex].src)
   dangerZone()
 }

function powerUp () {
  $playerHp[0].value = $playerHp[0].value + 20
  $playerHp[0].max = $playerHp[0].max + 20
}

function dangerZone () {
  if ($playerHp[0].value <= 20) {
    $('#playerHealth').addClass('critical')
  } if ($enemyHp[0].value <= 20) {
    $('#enemyHealth').addClass('critical')
  } if ($playerHp[0].value > 20) {
    $('#playerHealth').removeClass('critical')
  } if ($enemyHp[0].value > 20) {
    $('#enemyHealth').removeClass('critical')
  }
}

function clickHandler() {

  applyDmg();
  dangerZone();
  turnChange();
  checker();
  $('#hpbar').text($playerHp[0].value + '/' + $playerHp[0].max)
  $('#enemybar').text($enemyHp[0].value + '/' + $enemyHp[0].max)

  function applyDmg() {
    var damage = dmgRoll(roll())
    flashingText(currentPlayer, damage);
    if (currentPlayer === 1) {
      return $enemyHp[0].value = $enemyHp[0].value - damage
    } else {
      return $playerHp[0].value = $playerHp[0].value - damage
    }
  }

  function turnChange() {
    if (currentPlayer === 1) {
      currentPlayer = 2
    } else {
      currentPlayer = 1
    }
  }

  function checker() {

    if ($playerHp[0].value < 1) {
      alert("You have lost, try again!!")
      window.location.reload();
    }
    else if ($enemyHp[0].value < 1) {
      alert("You have won, here comes the next challenger")
      level++
      alert("You have leveled!")
      powerUp()
      if (level === 4) {
        alert("You have won the game!!")
        window.location.reload();
      }
      generateEnemy(level)
    }
  }
}

var $potion = $('.potion');

$potion.on('click', heal)

function heal() {
  var damage = dmgRoll(roll())
  if ($playerHp[0].value <= 20) {
    $playerHp[0].value = $playerHp[0].value + 25
    $playerHp[0].value = $playerHp[0].value - damage
  }
  $('#hpbar').text($playerHp[0].value + '/' + $playerHp[0].max)
  dangerZone()
}

var $limitBreak = $('.limitBreak');

$limitBreak.on('click', kaboom)

function kaboom() {
  var damage = dmgRoll(roll())
  bladeDraw();
  checker();

  $('#hpbar').text($playerHp[0].value + '/' + $playerHp[0].max)
  $('#enemybar').text($enemyHp[0].value + '/' + $enemyHp[0].max)


  function bladeDraw() {
    if ($playerHp[0].value <= 20) {
    $enemyHp[0].value = $enemyHp[0].value - 25
    $playerHp[0].value = $playerHp[0].value - damage
    }
  }

  function checker() {

    if ($playerHp[0].value < 1) {
      alert("You have lost, try again!!")
      window.location.reload();
    }
    else if ($enemyHp[0].value < 1) {
      alert("You have won, here comes the next challenger")
      level++
      alert("You have leveled!")
      powerUp()
      if (level === 4) {
        alert("You have won the game!!")
        window.location.reload();
      }
      generateEnemy(level)
    }
  }
}

// create h3 function between player and hp bar, when damage occurs
// set a function that will record the damage and

function flashingText(myTurn, dmg) {
  if (myTurn === 1 && dmg === 15) {
    $('#cloud').text('FINISHING TOUCH!!')
  } if (myTurn === 1 && dmg === 16) {
    $('#cloud').text('CLIMHAZZARD!!')
  } if (myTurn === 1 && dmg === 20) {
    $('#cloud').text('METEORAIN!!')
  }

  if (myTurn === 2 && dmg === 15) {
    $('#opponent').text('MEGAFLARE!!')
  } if (myTurn === 2 && dmg === 16) {
    $('#opponent').text('GAIA RAGE!!')
  } if (myTurn === 2 && dmg === 20) {
    $('#opponent').text('METEOR!!!')
  }


    if (myTurn === 2) {
    $('#cloud').text('Lost ' + dmg + 'hp!').fadeOut(4000, function () {
      $('#cloud').css('display', 'block')})
  } if (myTurn === 1){
    $('#opponent').text('Lost ' + dmg + 'hp!').fadeOut(4000, function () {
      $('#opponent').css('display', 'block')})
    // .fadeOut causing text to not reappear
  }
}

// add percentages to health activators instead of using a flat number
