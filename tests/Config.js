let chai = require('chai');

import Config from '../src/js/Config';

describe('Config', function() {

    it('is an object', () => {
        chai.expect(Config).to.be.an('object')
    });
});
