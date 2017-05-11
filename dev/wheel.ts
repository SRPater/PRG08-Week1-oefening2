/// <reference path="gameObject.ts"/>

class Wheel extends GameObject {
                        
    constructor(parent: HTMLElement, offsetX: number) {
        super("wheel", parent);

        this.div.style.transform ="translate(" + offsetX + "px, 30px)";
    }
}