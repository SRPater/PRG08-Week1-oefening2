/// <reference path="car.ts"/>

class Game {

    private static instance:    Game;
    private car:                Car;
    private rock:               Rock;
    public score:               number = 0;
    
    private constructor() {
        this.car    = new Car();
        this.rock   = new Rock();
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(): void {
        this.car.move();
        this.rock.move();
        requestAnimationFrame(() => this.gameLoop());
    }

    public endGame(): void {
        document.getElementById("score").innerHTML = "Score : " + this.score;
    }

    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
} 


// load
window.addEventListener("load", function() {
    Game.getInstance();
});