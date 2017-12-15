import Utils  from './Utils';
import Config from './Config';
import Module from './Module';
import Rellax from 'Rellax';
// import * as RellaxLib from 'Rellax';
// const Rellax = RellaxLib.default;

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
        this.scrollListener = this.onScroll.bind( this );
        this.render();
    }

    render() {
        const header = this.container.parentElement.querySelector( 'header' );

        const btnSwitcherGray = document.createElement( 'button' );
        header.appendChild( btnSwitcherGray );
        // btnSwitcherGray.setAttribute( 'id', 'btn-switcher-gray' );
        btnSwitcherGray.setAttribute( 'class', 'btn btn-switcher-gray' );
        btnSwitcherGray.addEventListener('click', () => document.body.classList.toggle( 'b-w' ) );


        const btnEnableShadows = document.createElement( 'button' );
        header.appendChild( btnEnableShadows );
        // btnEnableShadows.setAttribute( 'id', 'btn-enable-shadows' );
        btnEnableShadows.setAttribute( 'class', 'btn btn-enable-shadows' );
        btnEnableShadows.addEventListener('click', () => document.body.classList.toggle( 'shadows-enabled' ) );


        const btnRellax = document.createElement( 'button' );
        header.appendChild( btnRellax );
        // btnRellax.setAttribute('id', 'btn-disable-rellax');
        btnRellax.setAttribute('class', 'btn btn-disable-rellax');
        btnRellax.addEventListener('click', () => this.toggleParallax() );

        this.modules.forEach( module => {
            this.container.appendChild( module.el );
        });

        this.enableParallax();
    }

    toggleParallax() {
        document.body.classList.toggle( 'rellax-disabled' );
        this.rellaxInstance ? this.disableParallax() : this.enableParallax();
    }

    enableParallax() {
        this.rellaxInstance = new Rellax( '.module' );
        window.addEventListener( 'scroll', this.scrollListener );
    }


    disableParallax() {
        window.removeEventListener( 'scroll', this.scrollListener );
        this.rellaxInstance.destroy();
        this.rellaxInstance = null;
    }

    onScroll() {
        this.container.style.height = Math.max( ...Array.prototype.map.call(
            this.rellaxInstance.elems, item => item.offsetTop + Utils.getTranslateYValue( item.style.transform )
        ) ) + 'px';
    }

}

App.prototype = Object.assign( App.prototype, {
    container: document.querySelector( '.app' ),
    modules: []
});

new App();
