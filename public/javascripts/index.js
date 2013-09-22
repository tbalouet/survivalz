var GAME_ENGINE  = undefined;

window.onload = function(){
    GAME_ENGINE  = new ENGINE();
    window.addEventListener('resize', GAME_ENGINE.resize, false);
    GAME_ENGINE.init();
}
