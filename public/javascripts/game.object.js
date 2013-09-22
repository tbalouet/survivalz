var gameStates  = { 'INIT' : 0, 'PLAYING' : 1, 'PAUSE' : 2 };

var gameObject = function(){
    this.init = function(){}
    this.update = function(){
        this.manage();
        this.render();
    }
    this.manage = function(){}
    this.render = function(){}
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();