export default class Utils {

    static guid() {
        return '#' + this.s4();
    }

    static s4() {
        return Math.floor( ( 1 + Math.random() ) * 0x10000 )
            .toString( 16 )
            .substring( 1 );
    }

    static randomIntInclusive( min, max ) {
        return Math.floor( Math.random() * ( Math.floor( max ) - Math.ceil( min ) + 1 ) ) + Math.ceil( min );
    }

    static getTranslateYValue( translateString ) {
        const n = translateString.indexOf( ',' );
        const n1 = translateString.indexOf( ')' );
        return parseInt( translateString.slice( n + 1, n1 - 1 ) );
    }
}
