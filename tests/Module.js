let chai = require('chai');

import Module from '../src/js/Module';

describe('Module', function() {

    it('Returns an instance', () => {
        let module = new Module();
        chai.assert.instanceOf(module, Module);
    });

});
