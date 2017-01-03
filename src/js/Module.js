import Utils from './Utils';
let template = require("../templates/module.hbs");

export default class Module {

    constructor(options) {
        console.log('Hello Module: ', options.uid);
        this.options = options;
    }

    render() {
        let el = document.createDocumentFragment();
        let div = document.createElement('div');
        div.innerHTML = template(this.options);
        while (div.childNodes[0]) {
            el.appendChild(div.childNodes[0]);
        }
        this.el = el.childNodes[0];
        this.el.style.left = Utils.randomIntInclusive(50, (document.body.offsetWidth - 250));
        return this;
    }
}