var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(tag, container) {
        this.createDiv(tag, container);
    }
    GameObject.prototype.createDiv = function (tag, container) {
        var parent = container;
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
    };
    return GameObject;
}());
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(car, x) {
        var _this = _super.call(this, "wheel", car.getDiv()) || this;
        _this.div.style.transform = "translate(" + x + "px, 30px)";
        return _this;
    }
    return Wheel;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this, "car", document.getElementById("container")) || this;
        _this.braking = false;
        new Wheel(_this, 15);
        new Wheel(_this, 105);
        _this.game = Game.getInstance();
        _this.x = 0;
        _this.speed = Math.floor((Math.random() * 7) + 3);
        window.addEventListener("keydown", function () { return _this.onKeyPress(); });
        _this.move();
        return _this;
    }
    Car.prototype.getDiv = function () {
        return this.div;
    };
    Car.prototype.move = function () {
        if (this.speed == 0) {
            this.halted();
        }
        if (this.braking) {
            this.speed = Math.floor(this.speed * 0.9);
            console.log(this.speed);
        }
        if (this.x + Number(this.div.style.width) > 344) {
            this.speed = 0;
            this.game.score = 0;
            this.game.endGame();
        }
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px,220px)";
    };
    Car.prototype.halted = function () {
        this.game.score = 1000 - (345 - (this.x + Number(this.div.style.width)));
        this.game.endGame();
    };
    Car.prototype.onKeyPress = function () {
        this.braking = true;
    };
    return Car;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.score = 0;
        this.car = new Car();
        this.rock = new Rock();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.move();
        this.rock.move();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
        document.getElementById("score").innerHTML = "Score : " + this.score;
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock() {
        var _this = _super.call(this, "rock", document.getElementById("container")) || this;
        _this.speed = 0;
        _this.move();
        return _this;
    }
    Rock.prototype.move = function () {
        this.div.style.transform = "translate(490px,210px)";
    };
    return Rock;
}(GameObject));
//# sourceMappingURL=main.js.map