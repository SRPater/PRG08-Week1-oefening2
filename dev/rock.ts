/// <reference path="gameObject.ts"/>

class Rock extends GameObject {

    private speed:      number;
    private gravity:    number = 0;
                        
    constructor() {
        super("rock", document.getElementById("container"));

        this.speed  = 0;
        this.x      = 490;
        this.y      = 210;

        this.move();
    }

    public crashed(carSpeed: number) {
        this.speed      =  carSpeed;
        this.gravity    =  9.81;
        this.speed      *= 0.98;
    }

    public move(): void {
        // speed optellen zo lang we niet de bodem raken
        // speed wordt hoger dan 0 zodra de auto de rots raakt
        this.x += this.speed;
        this.y += this.gravity;

        if (this.y + 62 > document.getElementById("container").clientHeight) {
            this.speed = 0;
            this.gravity = 0;
        }
        
        //teken de div op de juiste positie
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";     
    }
}