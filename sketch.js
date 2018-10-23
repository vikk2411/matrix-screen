var symbol;
var symbolSize = 10;
var streams = [];

function setup(){
  createCanvas(
    window.innerWidth,
    window.innerHeight
  )

  background(0)
  // symbol = new Symbol(50, 50, random(2, 5))
  // symbol.setToRandomSymbol()
  var x = 0
  var y = random(-500, 0)
  for(var i = 0; i < width/symbolSize; i++){
    var stream = new Stream();
    stream.generateSymbols(x, y);
    streams.push(stream);
    x += symbolSize;
  }


  textSize(symbolSize)
}


function draw(){
  background(0)
  streams.forEach(function(stream){
    stream.render();
  })
}

function Symbol(x, y, speed){
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.value;
  this.switchInterval = round(random(2, 20))

  this.setToRandomSymbol= function(){
    if(frameCount % this.switchInterval === 0){
      this.value = String.fromCharCode( 0x30A0 + round(random(0,96)))
    }
  }

  this.render = function(){
    fill(0, 255, 70)
    text(this.value, this.x, this.y);
    this.rain()
    this.setToRandomSymbol()
  }

  this.rain = function(){
    if(this.y >= height){
      this.y = 0
    }else{
      this.y += speed
    }

  }
}



function Stream(){
  this.symbols = []
  this.totalSymbols = round(random(5,30));
  this.speed = round(random(5,20))
  this.generateSymbols = function(x, y){
    for(var i = 0; i < this.totalSymbols; i++){
      symbol = new Symbol(x, y, this.speed)
      symbol.setToRandomSymbol()
      this.symbols.push(symbol)
      y -= symbolSize
    }
  }

  this.render = function(){
    this.symbols.forEach(function(symbol){
      fill(0, 255, 70)
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain()
      symbol.setToRandomSymbol()
    })
  }

}



