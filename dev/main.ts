class Game {

    private car:    Car;
    private rock:   Rock;
    
    constructor() {
        this.car    = new Car(this);
        this.rock   = new Rock();

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() {
        this.car.move();
        this.rock.move();

        requestAnimationFrame(() => this.gameLoop());
    }

    public carCrashed(carSpeed: number) {
        this.rock.crashed(carSpeed);
    }

    public endGame(){
        let score = 0;
        if (this.car.x < 335) {
            score = Math.round(335 + this.car.x);
        }
        document.getElementById("score").innerHTML = "Score : " + score;
    }
} 


// load
window.addEventListener("load", function() {
    new Game();
});