var five = require("johnny-five");
var Twitter = require('twitter');
var board = new five.Board();

var WAIT_LED = 20;
var NB_LED = 6;

var client = new Twitter({
 consumer_key: process.env.TWITTER_CONSUMER_KEY,
 consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
 access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
 access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

board.on("ready", function() {
  var ledPins = [2,4,5,6,7,8,9,10,11,12];
  var leds = new five.Leds(ledPins);
  var ledTemoin = new five.Led(3);
  var counter = 0;
  var pot = new five.Sensor("A5");
  var delay = 10;
  var prevDelay = 0;
  var timerId;
  var sens = 1;

  pot.scale([1, 20]).on("change", function() {
    d = Math.round(this.value / 3) * WAIT_LED;
    if (d != prevDelay) {
      beep();
      prevDelay = delay;
      delay = d;
      clearInterval(timerId);
      timerId = setInterval(tick.bind(board), delay);
    }
  });

  function beep() {
    ledTemoin.on();
    board.wait(WAIT_LED*6, function(){ledTemoin.fadeOut()});
  }

  function tick() {
    var ledNumber = counter;
    leds[counter].on();
    if (sens < 0) {
      if (counter == 0) {
        counter = leds.length - 1;
      } else {
        counter--;
      }
    } else {
      counter = (counter + sens) % leds.length;
    }
    board.wait(NB_LED*delay, function(){
      leds[ledNumber].off();
    })
  }
  
  function flash() {
    clearInterval(timerId);

    board.wait(60, function(){
      leds.each(function(led, index) {
        led.on();
      });
    });
    board.wait(1500, function(){
      sens = -sens;
      timerId = setInterval(tick.bind(board), delay);
    });
  }

  this.repl.inject({
    beep: beep,
    flash: flash,
    b: beep,
    f: flash
  })

  timerId = setInterval(tick.bind(board), delay);

  client.stream('statuses/filter', {track: '#TZnantes'},  function(stream){
    stream.on('data', function(tweet) {
      console.log(tweet.text);
      flash();
    });

    stream.on('error', function(error) {
      console.log("Twitter error" + error);
    });
  });
});

