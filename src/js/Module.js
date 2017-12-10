import Utils from './Utils';
let template = require( '../templates/module.hbs' );

export default class Module {

    constructor( options ) {
        this.options = options;
    }

    render() {
        const el = document.createDocumentFragment();
        const div = document.createElement( 'div' );
        div.innerHTML = template( this.options );
        while ( div.childNodes[ 0 ] ) {
            el.appendChild( div.childNodes[ 0 ] );
        }
        this.el = el.childNodes[ 0 ];
        this.el.style.left = Utils.randomIntInclusive( 50, ( document.body.offsetWidth - 250 ) );
        return this;
    }
}