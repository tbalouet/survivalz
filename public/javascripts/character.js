var skills  = { 'strength'      : null,
                'dexterity'     : null,
                'intelligence'  : null,
                'speed'         : null
};

var Character = function(strength, dexterity, intelligence, speed, imgChar) {
    this.stats              = skills;
    this.stats.strength     = strength;
    this.stats.dexterity    = dexterity;
    this.stats.intelligence = intelligence;
    this.stats.speed        = speed;

    this.imgPerso           = imgChar;

    this.health = 100;
    this.sleep  = 100;
    this.hunger = 100;
};