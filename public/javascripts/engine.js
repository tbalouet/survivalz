var ENGINE  = function(){
    this.stage              =  null;
    this.canvas             =  null;
    this.WIDTH              =  540;
    this.HEIGHT             =  320;

    // the position of the canvas in relation to the screen
    this.RATIO              =  null;
    this.currentWidth       =  null;
    this.currentHeight      =  null;
    this.scale              =   1;

    //Game layers
    this.layerBack          =  null;
    this.layerInfoStatus    =  null;
    this.layerOrientation   =  null;
    this.layerFront         =  null;

    this.debugText          =  null;

    this.gameState          =  null;

    this.game_launcher      =  null;
    this.game_main          =  null;
    this.game_inputs        = null;
};

ENGINE.inherits(gameObject);

ENGINE.method('init', function(){
    // the proportion of width to height
    this.RATIO           = this.WIDTH / this.HEIGHT;
    // these will change when the screen is resized
    this.currentWidth    = this.WIDTH;
    this.currentHeight   = this.HEIGHT;

    this.stage = new Kinetic.Stage({
        container   : 'popCanvas',
        width       : this.WIDTH,
        height      : this.HEIGHT
    });

    this.layerBack  = new Kinetic.Layer({
        fill            : '#00f'
    });
    this.stage.add(this.layerBack);
    this.layerBack.setZIndex(1);

    this.layerFront  = new Kinetic.Layer();
    this.debugText  = new Kinetic.Text({
        x           : 0,
        y           : 15,
        text        : '',
        fontSize    : 30,
        fontFamily  : 'Calibri',
        fill        : 'green'
    });
    this.layerFront.add(this.debugText);
    this.stage.add(this.layerFront);
    this.layerFront.setZIndex(22);

    this.layerInfoStatus  = new Kinetic.Layer();
    this.stage.add(this.layerInfoStatus);
    this.layerInfoStatus.setZIndex(18);
    var rect = new Kinetic.Rect({
        x               : 15,
        y               : 15,
        stroke          : '#555',
        strokeWidth     : 5,
        fill            : '#ddd',
        width           : this.WIDTH-30,
        height          : 80,
        shadowColor     : 'black',
        shadowBlur      : 10,
        shadowOffset    : [10, 10],
        shadowOpacity   : 0.2,
        cornerRadius    : 10
    });
    this.layerInfoStatus.add(rect);
    this.layerInfoStatus.hide();

    this.initLayerOrientation();

    // we need to sniff out Android and iOS so that we can hide the address bar in our resize function
    this.ua      = navigator.userAgent.toLowerCase();
    this.android = this.ua.indexOf('android') > -1 ? true : false;
    this.ios     = ( this.ua.indexOf('iphone') > -1 || this.ua.indexOf('ipad') > -1  ) ? true : false;

    // we're ready to resize
    this.resize();

    this.game_inputs    = new Input();
    this.addListeners(this);

    this.launch();
});

ENGINE.method('resize', function() {
    if( window.innerHeight > window.innerWidth ){
        this.layerBack.hide();
        this.layerOrientation.show();
        this.stage.draw();

        this.currentWidth       = window.innerWidth;
        // resize the width in proportion to the new height
        this.currentHeight      = this.currentWidth * this.RATIO;
    }
    else{
        this.layerOrientation.hide();
        this.layerBack.show();
        this.stage.draw();

        this.currentHeight      = window.innerHeight + 50;
        // resize the width in proportion to the new height
        this.currentWidth       = Math.floor (this.currentHeight * this.RATIO);
    }

    // this will create some extra space on the
    // page, allowing us to scroll past
    // the address bar, thus hiding it.
    if (this.android || this.ios) {
        document.body.style.height = (window.innerHeight + 50) + 'px';
    }

    this.scale       = this.currentWidth / this.WIDTH;
//        this.printDebug(this.currentWidth+'x'+this.currentHeight+' ->'+this.scale);

    // set the new canvas style width and height
    // note: our canvas is still 320 x 480, but
    // we're essentially scaling it with CSS
    var canvasArray = document.getElementsByTagName('canvas');
    for( var i = 0; i < canvasArray.length; ++i ){
        canvasArray[i].style.width  = this.currentWidth + 'px';
        canvasArray[i].style.height = this.currentHeight + 'px';
    }

    // we use a timeout here because some mobile
    // browsers don't fire if there is not
    // a short delay
    window.setTimeout(function() {
        window.scrollTo(0,1);
    }, 1);
});

ENGINE.method('initLayerOrientation', function(){
    this.layerOrientation   = new Kinetic.Layer({
        fill            : '#f00'
    });

    var complexText = new Kinetic.Text({
        x           : 100,
        y           : 60,
        text        : 'ORIENTATION\n\nPlease turn around your phone.',
        fontSize    : 18,
        fontFamily  : 'Calibri',
        fill        : '#555',
        width       : 380,
        padding     : 20,
        align       : 'center'
    });

    var rect = new Kinetic.Rect({
        x               : 100,
        y               : 60,
        stroke          : '#555',
        strokeWidth     : 5,
        fill            : '#ddd',
        width           : 380,
        height          : complexText.getHeight(),
        shadowColor     : 'black',
        shadowBlur      : 10,
        shadowOffset    : [10, 10],
        shadowOpacity   : 0.2,
        cornerRadius    : 10
    });

    this.layerOrientation.add(rect);
    this.layerOrientation.add(complexText);
    this.stage.add(this.layerOrientation);
    this.layerOrientation.setZIndex(20);
    this.layerOrientation.hide();
});

ENGINE.method('launch', function(){
    this.game_launcher  = new Launcher(this);
    this.game_launcher.init();
});

// this is where all entities will be moved
// and checked for collisions, etc.
ENGINE.method('manage', function() {
    switch(this.gameState){
        case gameStates.INIT :
            this.game_launcher.update();
            break;
        case gameStates.PLAYING :
            this.game_main.update();
            break;
        case gameStates.PAUSE :
            break;
        default :
            break;
    }
});

// this is where we draw all the entities
ENGINE.method('render', function() {
});

// the actual loop requests animation frame, then proceeds to update and render
ENGINE.method('update', function() {
    requestAnimFrame( this.update.bind(this) );
    this.manage();
    this.render();
});

ENGINE.method('addListeners', function(gameEngine){
    // listen for clicks
    window.addEventListener('click', function(e) {
        e.preventDefault();
        gameEngine.game_inputs.set(e);
    }, false);

    // listen for touches
    window.addEventListener('touchstart', function(e) {
        e.preventDefault();
        // the event object has an array
        // named touches; we just want
        // the first touch
        gameEngine.game_inputs.set(e.touches[0]);
    }, false);
    window.addEventListener('touchmove', function(e) {
        // we're not interested in this,
        // but prevent default behaviour
        // so the screen doesn't scroll
        // or zoom
        e.preventDefault();
    }, false);
    window.addEventListener('touchend', function(e) {
        // as above
        e.preventDefault();
    }, false);
});

ENGINE.method('printDebug', function(text){
    this.debugText.setText(text);
    this.layerFront.draw();
});



var Input = function(){
    this.x      = 0;
    this.y      = 0;
    this.tapped = false;
};

Input.method('set', function(data) {
    this.x      = Math.ceil(( data.pageX ) / GAME_ENGINE.scale);
    this.y      = Math.ceil(( data.pageY ) / GAME_ENGINE.scale);
    this.tapped = true;
});

