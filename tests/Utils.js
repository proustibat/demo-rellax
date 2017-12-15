let chai = require('chai');

import Utils from '../src/js/Utils';

describe('Utils', function() {

    it('Returns an instance', () => {
        let utils = new Utils();
        chai.assert.instanceOf(utils, Utils);
    });
});
