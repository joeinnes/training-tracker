(function() {
  process.nextTick(function() {
    return console.log('eyo');
  });

}).call(this);
