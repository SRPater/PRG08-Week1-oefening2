/// <reference path="gameObject.ts" />

class Wheel extends GameObject {
                        
    constructor(car: Car, x: number) {
        super("wheel", car.getDiv());

        this.div.style.transform = "translate(" + x + "px, 30px)";
    }
}