var Launcher = function(parentEngine){
    this.nbChar         = 4;
};

Launcher.inherits(gameObject);

Launcher.method('init', function() {
    var recSize    = (GAME_ENGINE.WIDTH*5)/(6*this.nbChar+1);
    var recMargin   = recSize/5;
    var i = 0;
    for(var i = 0; i < this.nbChar; ++i){
        var rect = new Kinetic.Rect({
            x               : recMargin*(i+1)+(i*recSize),
            y               : (GAME_ENGINE.HEIGHT-recSize)/2,
            stroke          : '#555',
            strokeWidth     : 5,
            fill            : '#2d2',
            width           : recSize,
            height          : recSize,
            shadowColor     : 'black',
            shadowBlur      : 10,
            shadowOffset    : [10, 10],
            shadowOpacity   : 0.2,
            cornerRadius    : 10,
            name            : 'Player'+(i+1)
        });
        GAME_ENGINE.layerBack.add(rect);
        var text = new Kinetic.Text({
            x           : recMargin*(i+1)+(i*recSize)+5,
            y           : (GAME_ENGINE.HEIGHT-recSize)/2+recSize/2,
            text        : 'Player'+(i+1),
            fontSize    : 30,
            fontFamily  : 'Calibri',
            fill        : 'green'
        });
        GAME_ENGINE.layerBack.add(text);
    }
    GAME_ENGINE.layerBack.draw();

    GAME_ENGINE.gameState  = gameStates.INIT;
    GAME_ENGINE.update();
});

Launcher.method('update', function(){
    this.manage();
    this.render();
});

Launcher.method('manage', function(){
    if (GAME_ENGINE.game_inputs.tapped) {
        GAME_ENGINE.game_inputs.tapped = false;
        var obj = GAME_ENGINE.layerBack.getIntersection({x: GAME_ENGINE.game_inputs.x, y: GAME_ENGINE.game_inputs.y});
        if( obj != undefined && obj.shape ){
            var newPlayer   = undefined;
            switch (obj.shape.getName()){
                case "Player1":
                    newPlayer   = new Character(8,5,3,4,'images/perso1.png');
                    break;
                case "Player2":
                    newPlayer   = new Character(5,6,4,5,'images/perso2.png');
                    break;
                case "Player3":
                    newPlayer   = new Character(5,5,7,3,'images/perso3.png');
                    break;
                case "Player4":
                    newPlayer   = new Character(6,7,4,3,'images/perso4.png');
                    break;
            }
            if( newPlayer != undefined ){
                GAME_ENGINE.game_main = new Game(newPlayer);
                GAME_ENGINE.game_main.init();
            }
        }
        else
            GAME_ENGINE.printDebug('');
    }
});