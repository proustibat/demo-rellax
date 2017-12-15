let chai = require('chai');
import App from '../src/js/App';

describe('App', function() {

    before( () => {
        this.elements = createPage();
    });

    after( () => {
        this.elements.forEach( el=> el.remove() )
    });

    it('Returns an instance', () => {
        let app = new App();
        chai.assert.instanceOf(app, App);
    });
});

const createPage = () => {
    let header = document.createElement('header');
    let h1 = document.createElement('h1');
    let h2 = document.createElement('h2');
    h1.appendChild( document.createTextNode('Rellax JS Demo') );
    h2.appendChild( document.createTextNode('Vanilla Javascript | Parallax Library') );
    document.body.appendChild(header);

    let appSection = document.createElement('section');
    appSection.setAttribute('class', 'app');
    document.body.appendChild(appSection);

    let footer = document.createElement('p');
    footer.appendChild( document.createTextNode('Thanks ') );
    document.body.appendChild(appSection);
    let link = document.createElement('a');
    link.setAttribute('href', 'https://github.com/dixonandmoe/rellax');
    link.setAttribute('target', '_blank');
    link.appendChild( document.createTextNode('Dixon And Moe ') );
    footer.appendChild(link);

    return [
        header,
        appSection,
        footer
    ];
};
