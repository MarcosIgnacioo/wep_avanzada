var Foo = /** @class */ (function () {
    function Foo(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    Foo.prototype.bar = function (buzz) {
        console.log(buzz);
        return 1;
    };
    return Foo;
}());
