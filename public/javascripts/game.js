var Game = function(character){
    this.character  = character;

    this.imgArray   = Array();
    this.imgsLoaded  = false;

    this.imgArray.push( new img('images/room.png', 'imgBack', 0, 0, GAME_ENGINE.WIDTH, GAME_ENGINE.HEIGHT) );
    this.imgArray.push( new img('images/bed.png', 'imgBed', 275, 165, 90, 80) );
    this.imgArray.push( new img('images/kitchen.png', 'imgKitchen', 185, 70, 71, 154) );
    this.imgArray.push( new img('images/toolbox.png', 'imgToolBox', 435, 160, 71, 93) );

    this.animChar    = null;
    this.lifeText    = null;
    this.hungerText  = null;
    this.sleepText   = null;
    this.safetyText  = null;
}

Game.inherits(gameObject);

Game.method('init', function(){
    GAME_ENGINE.layerBack.destroyChildren();
    GAME_ENGINE.layerInfoStatus.show();
    GAME_ENGINE.gameState    = gameStates.PLAYING;
});

Game.method('postInit', function(){
    var imgAreLoaded    = true;
    for(i in this.imgArray){
        if( !this.imgArray[i].isloaded ){
            imgAreLoaded = false;
            break;
        }
    }
    if( imgAreLoaded ){
        for(i in this.imgArray){
            GAME_ENGINE.layerBack.add(this.imgArray[i].imgKinetic);
        }

        this.imgsLoaded  = true;

        var imgChar = new Image();
        imgChar.src = this.character.imgPerso;
        imgChar.onload = function() {
            this.animChar = new Kinetic.Sprite({
                x: 215,
                y: 190,
                image: imgChar,
                animation: 'idle',
                animations: animationChar,
                frameRate: 4,
                index: 0
            });

            // add the shape to the layer
            GAME_ENGINE.layerBack.add(this.animChar);
            GAME_ENGINE.layerBack.draw();
            this.animChar.start();
        }

        var imageIcons  = new Image();
        imageIcons.src  = 'images/Iconz.png';
        var gameObject  = this;
        imageIcons.onload = function () {
            var Heart = new Kinetic.Sprite({
                x: 50,
                y: 40,
                width:32,
                height:32,
                name: "iconHeart",
                image: imageIcons,
                index: 0,
                animation: 'icons',
                animations: iconsBar
            });
            GAME_ENGINE.layerInfoStatus.add(Heart);
            gameObject.lifeText  = new Kinetic.Text({
                x           : Heart.getX()+Heart.getWidth()+8,
                y           : 40,
                text        : ''+gameObject.character.health,
                fontSize    : 30,
                fontFamily  : 'Calibri',
                fill        : 'black'
            });
            GAME_ENGINE.layerInfoStatus.add(gameObject.lifeText);

            var Hunger = new Kinetic.Sprite({
                x: gameObject.lifeText.getX()+70,
                y: 40,
                width:32,
                height:32,
                name: "iconHunger",
                image: imageIcons,
                index: 1,
                animation: 'icons',
                animations: iconsBar
            });
            GAME_ENGINE.layerInfoStatus.add(Hunger);
            gameObject.hungerText  = new Kinetic.Text({
                x           : Hunger.getX()+Hunger.getWidth()+8,
                y           : 40,
                text        : ''+gameObject.character.hunger,
                fontSize    : 30,
                fontFamily  : 'Calibri',
                fill        : 'black'
            });
            GAME_ENGINE.layerInfoStatus.add(gameObject.hungerText);

            var Sleep = new Kinetic.Sprite({
                x: gameObject.hungerText.getX()+70,
                y: 40,
                width:32,
                height:32,
                name: "iconSleep",
                image: imageIcons,
                index: 2,
                animation: 'icons',
                animations: iconsBar
            });
            GAME_ENGINE.layerInfoStatus.add(Sleep);
            gameObject.sleepText  = new Kinetic.Text({
                x           : Sleep.getX()+Sleep.getWidth()+8,
                y           : 40,
                text        : ''+gameObject.character.sleep,
                fontSize    : 30,
                fontFamily  : 'Calibri',
                fill        : 'black'
            });
            GAME_ENGINE.layerInfoStatus.add(gameObject.sleepText);

            var Safety = new Kinetic.Sprite({
                x: gameObject.sleepText.getX()+70,
                y: 40,
                width:32,
                height:32,
                name: "iconHunger",
                image: imageIcons,
                index: 3,
                animation: 'icons',
                animations: iconsBar
            });
            GAME_ENGINE.layerInfoStatus.add(Safety);
            gameObject.safetyText  = new Kinetic.Text({
                x           : Safety.getX()+Safety.getWidth()+8,
                y           : 40,
                text        : '100',
                fontSize    : 30,
                fontFamily  : 'Calibri',
                fill        : 'black'
            });
            GAME_ENGINE.layerInfoStatus.add(gameObject.safetyText);

            GAME_ENGINE.layerInfoStatus.draw();
        }

    }
});

Game.method('manage', function(){
    if( !this.imgsLoaded ){
        this.postInit();
    }
});

Game.method('render', function(){
});

Game.method('update', function(){
    this.manage();
    this.render();
});

var iconsBar = {
    icons: [{//Heart
        x       : 0,
        y       : 0,
        width   : 32,
        height  : 32
    },{//Hunger
        x       : 32,
        y       : 0,
        width   : 32,
        height  : 32
    },{//Sleep
        x       : 64,
        y       : 0,
        width   : 32,
        height  : 32
    },{//Safety
        x       : 96,
        y       : 0,
        width   : 32,
        height  : 32
    }]
}

var animationChar = {
    idle: [{
        x       : 0,
        y       : 0,
        width   : 64,
        height  : 96
    }],
    walkFront: [{
        x       : 0,
        y       : 0,
        width   : 64,
        height  : 96
    },{
        x       : 64,
        y       : 0,
        width   : 64,
        height  : 96
    },{
        x       : 128,
        y       : 0,
        width   : 64,
        height  : 96
    },{
        x       : 192,
        y       : 0,
        width   : 64,
        height  : 96
    }],
    walkLeft: [{
        x       : 0,
        y       : 96,
        width   : 64,
        height  : 96
    },{
        x       : 64,
        y       : 96,
        width   : 64,
        height  : 96
    },{
        x       : 128,
        y       : 96,
        width   : 64,
        height  : 96
    },{
        x       : 192,
        y       : 96,
        width   : 64,
        height  : 96
    }],
    walkRight: [{
        x       : 0,
        y       : 192,
        width   : 64,
        height  : 96
    },{
        x       : 64,
        y       : 192,
        width   : 64,
        height  : 96
    },{
        x       : 128,
        y       : 192,
        width   : 64,
        height  : 96
    },{
        x       : 192,
        y       : 192,
        width   : 64,
        height  : 96
    }],
    walkBack: [{
        x       : 0,
        y       : 288,
        width   : 64,
        height  : 96
    },{
        x       : 64,
        y       : 288,
        width   : 64,
        height  : 96
    },{
        x       : 128,
        y       : 288,
        width   : 64,
        height  : 96
    },{
        x       : 192,
        y       : 288,
        width   : 64,
        height  : 96
    }]
};