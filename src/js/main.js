import Utils  from './Utils';
import Config from './Config';
import Module from './Module';
// import Rellax from 'Rellax';
import * as RellaxLib from 'Rellax';
const Rellax = RellaxLib.default;

class App {

    constructor() {
        for ( let i = 0; i < Config.nbModules; i++ ) {
            let module = new Module({
                uid: Utils.guid(),
                type: Config.shapes[ Math.floor( Math.random() * Config.shapes.length ) ],
                color: Config.colors[ Math.floor( Math.random() * Config.colors.length ) ],
                speed: Math.floor( Math.random() * ( Config.speeds.max - Config.speeds.min ) + Config.speeds.min )
            });
            this.modules.push( module.render() );
        }
        this.render();
    }

    render() {
        const header = this.container.parentElement.querySelector('header');

        const btnSwitcherGray = document.createElement( 'button' );
        header.appendChild( btnSwitcherGray );
        btnSwitcherGray.setAttribute('id', 'btn-switcher-gray');
        btnSwitcherGray.setAttribute('class', 'btn');
        btnSwitcherGray.addEventListener('click', e => document.body.classList.toggle( 'b-w' ) );


        const btnEnableShadows= document.createElement( 'button' );
        header.appendChild( btnEnableShadows );
        btnEnableShadows.setAttribute('id', 'btn-enable-shadows');
        btnEnableShadows.setAttribute('class', 'btn');
        btnEnableShadows.addEventListener('click', e => document.body.classList.toggle( 'shadows-enabled' ) );

        this.modules.forEach( module => {
            this.container.appendChild( module.el );
        });

        // this.container.style.height = this.container.scrollHeight + this.container.offsetTop;

        new Rellax( '.module' );

        console.dir(document.body);
        console.dir(this.container);
        // console.log(document.body.height + this.container.offsetTop);

    }

}

App.prototype = Object.assign( App.prototype, {
    container: document.querySelector( '.app' ),
    modules: []
});

new App();
