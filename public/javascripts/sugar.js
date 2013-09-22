/** Methods defined by http://www.crockford.com/javascript/inheritance.html **/

/** This adds a public method to the Function.prototype, so all functions get it by Class Augmentation. It takes a name and a function, and adds them to a function's prototype object.
 It returns this. When I write a method that doesn't need to return a value, I usually have it return this. It allows for a cascade-style of programming. **/
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

/** We make an instance of the parent class and use it as the new prototype. We also correct the constructor field, and we add the uber method to the prototype as well.
 The uber method looks for the named method in its own prototype. This is the function to invoke in the case of Parasitic Inheritance or Object Augmentation.
 If we are doing Classical Inheritance, then we need to find the function in the parent's prototype. The return statement uses the function's apply method to invoke the function,
 explicitly setting this and passing an array of parameters. The parameters (if any) are obtained from the arguments array. Unfortunately, the arguments array is not a true array,
 so we have to use apply again to invoke the array slice method. **/
 Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {},
        p = this.prototype;
    this.prototype.constructor = parent;
    this.method('uber', function uber(name) {
        if (!(name in d)) {
            d[name] = 0;
        }
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});

/** The swiss method loops through the arguments. For each name, it copies a member from the parent's prototype to the new class's prototype. **/
Function.method('swiss', function (parent) {
    for (var i = 1; i < arguments.length; i += 1) {
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
    }
    return this;
});