/// <reference path="wheel.ts"/>
/// <reference path="gameObject.ts" />

class Car extends GameObject {

    private game:       Game;
    private speed:      number;
    private braking:    boolean;
    private crashed:    boolean;
            
    constructor(g: Game) {
        let container = document.getElementById("container");
        super("car", container);

        this.game = g;
        this.x = 0;
        this.y = 220;

        this.speed  = Math.floor((Math.random() * 7) + 3);

        let frontWheel  = new Wheel(this.div, 105);
        let rearWheel   = new Wheel(this.div, 20);

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        //
        document.addEventListener("keydown", (e: KeyboardEvent) => this.handleKeyDown(e));

        // alvast goed zetten

        this.move();
    }

    private handleKeyDown(e: KeyboardEvent) {
        if (e.key == ' ') {
            this.braking = true;
        }
    }

    public move(): void {
        // hier de snelheid verlagen als we aan het afremmen zijn
        //
        if (this.braking) {
            this.speed *= 0.95;
            if (this.speed < 0.05) {
                this.speed = 0;
            }
        }

        // hier kijken of de x waarde hoger is dan de x van de rots (335)
        //
        if (this.x > 335) {
            // Collision
            if (!this.crashed) {
                this.game.carCrashed(this.speed);
                this.stop();
            }
            this.crashed = true;
        }

        if (this.speed == 0) {
            this.game.endGame();
        }

        // de snelheid bij de x waarde optellen
        //
        this.x += this.speed;
        
        // tekenen
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }

    private stop() {
        this.speed = 0;
    }
}