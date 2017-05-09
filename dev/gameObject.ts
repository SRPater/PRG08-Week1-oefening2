class GameObject {

    protected div:  HTMLElement;
    protected x:    number;
    protected y:    number;

    constructor(tag: string, container: HTMLElement) {
        this.createDiv(tag, container);
    }

    private createDiv(tag: string, container: HTMLElement): void {
        let parent = container;
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
    }

}