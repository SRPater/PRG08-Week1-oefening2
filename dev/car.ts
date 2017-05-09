/// <reference path="wheel.ts"/>
/// <reference path="gameObject.ts" />

class Car extends GameObject {

    private speed:      number;
    private game:       Game;
    private braking:    boolean = false;
            
    constructor() {
        super("car", document.getElementById("container"));

        new Wheel(this, 15);
        new Wheel(this, 105);

        this.game   = Game.getInstance();
        this.x      = 0;
        this.speed  = Math.floor((Math.random() * 7) + 3);

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        //
        window.addEventListener("keydown", () => this.onKeyPress());

        // alvast goed zetten

        this.move();
    }

    public getDiv(): HTMLElement {
        return this.div;
    }

    public move(): void {
        if (this.speed == 0) {
            this.halted();
        }

        // hier de snelheid verlagen als we aan het afremmen zijn
        //
        if (this.braking) {
            this.speed = Math.floor(this.speed * 0.9);
            console.log(this.speed);
        }

        // hier kijken of de x waarde hoger is dan de x van de rots (335)
        //
        if (this.x + Number(this.div.style.width) > 344) {
            this.speed = 0;
            this.game.score = 0;
            this.game.endGame();
        }

        // de snelheid bij de x waarde optellen
        //
        this.x += this.speed;
        
        // tekenen
        this.div.style.transform = "translate(" + this.x + "px,220px)";
    }

    private halted(): void {
        this.game.score = 1000 - (345 - (this.x + Number(this.div.style.width)));
        this.game.endGame();
    } 

    //
    // hier een method maken voor on key press
    //
    private onKeyPress() {
        this.braking = true;
    }
}