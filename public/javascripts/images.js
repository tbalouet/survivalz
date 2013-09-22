var img = function (url, name, x, y, w, h, callback){
    this.isloaded       = false;
    this.posX           = x;
    this.posY           = y;
    this.width          = w;
    this.height         = h;
    this.name           = name;
    this.callback       = callback;

    this.imgObject      = new Image();
    this.imgObject.src  = this.urlLink = url;
    var thisObj         = this;
    this.imgObject.onload = function() {
        thisObj.imgLoaded();
    }
};

img.method('imgLoaded', function(){
    this.imgKinetic = new Kinetic.Image({
        x       : this.posX,
        y       : this.posY,
        image   : this.imgObject,
        width   : this.width,
        height  : this.height
    });
    this.isloaded   = true;
    if(this.callback != undefined)
        this.callback();
});