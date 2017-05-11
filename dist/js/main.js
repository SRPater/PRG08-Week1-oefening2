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
    function GameObject(tag, parent) {
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
    }
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "div", {
        get: function () { return this._div; },
        set: function (value) { this._div = value; },
        enumerable: true,
        configurable: true
    });
    return GameObject;
}());
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(parent, offsetX) {
        var _this = _super.call(this, "wheel", parent) || this;
        _this.div.style.transform = "translate(" + offsetX + "px, 30px)";
        return _this;
    }
    return Wheel;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(g) {
        var _this = this;
        var container = document.getElementById("container");
        _this = _super.call(this, "car", container) || this;
        _this.game = g;
        _this.x = 0;
        _this.y = 220;
        _this.speed = Math.floor((Math.random() * 7) + 3);
        var frontWheel = new Wheel(_this.div, 105);
        var rearWheel = new Wheel(_this.div, 20);
        document.addEventListener("keydown", function (e) { return _this.handleKeyDown(e); });
        _this.move();
        return _this;
    }
    Car.prototype.handleKeyDown = function (e) {
        if (e.key == ' ') {
            this.braking = true;
        }
    };
    Car.prototype.move = function () {
        if (this.braking) {
            this.speed *= 0.95;
            if (this.speed < 0.05) {
                this.speed = 0;
            }
        }
        if (this.x > 335) {
            if (!this.crashed) {
                this.game.carCrashed(this.speed);
                this.stop();
            }
            this.crashed = true;
        }
        if (this.speed == 0) {
            this.game.endGame();
        }
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Car.prototype.stop = function () {
        this.speed = 0;
    };
    return Car;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.car = new Car(this);
        this.rock = new Rock();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.move();
        this.rock.move();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.carCrashed = function (carSpeed) {
        this.rock.crashed(carSpeed);
    };
    Game.prototype.endGame = function () {
        var score = 0;
        if (this.car.x < 335) {
            score = Math.round(335 + this.car.x);
        }
        document.getElementById("score").innerHTML = "Score : " + score;
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock() {
        var _this = _super.call(this, "rock", document.getElementById("container")) || this;
        _this.gravity = 0;
        _this.speed = 0;
        _this.x = 490;
        _this.y = 210;
        _this.move();
        return _this;
    }
    Rock.prototype.crashed = function (carSpeed) {
        this.speed = carSpeed;
        this.gravity = 9.81;
        this.speed *= 0.98;
    };
    Rock.prototype.move = function () {
        this.x += this.speed;
        this.y += this.gravity;
        if (this.y + 62 > document.getElementById("container").clientHeight) {
            this.speed = 0;
            this.gravity = 0;
        }
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Rock;
}(GameObject));
//# sourceMappingURL=main.js.map