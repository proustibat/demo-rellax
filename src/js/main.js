import Utils  from './Utils';
import Config from './Config';
import Module from './Module';
import Rellax from 'Rellax';

class App {

    constructor() {
        for ( let i=0; i< Config.nbModules; i++ ) {
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
        Array.from( this.modules, module => {
            this.container.appendChild( module.el );
        });

        new Rellax( '.module' );
    }

}

App.prototype = Object.assign( App.prototype, {
    container: document.querySelector( '.app' ),
    modules: []
});

new App();


