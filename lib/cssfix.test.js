var cssfix = require('./cssfix');
var expect = require('chai').expect;

describe('CSS fix', function() {
    
    before(function() {
        console.log('test starts...')
    });
    
    after(function() {
        console.log('test ends...')
    });


    it('background to backgroundColor', function() {
        var obj = cssfix('background', 'red');
        expect(obj.backgroundColor).to.be.equal('red');
    });

    it('fix val width unit `px`', function() {
        var obj = cssfix('width', '200.5px');
        expect(obj.width).to.be.equal(200.5);
    });

    it('colors or words are identified', function() {
        var obj = cssfix('color', 'rgba(2, 2, 2)');
        expect(obj.color).to.be.equal('rgba(2, 2, 2)');

        var obj_2 = cssfix('color', 'purple');
        expect(obj_2.color).to.be.equal('purple');
    });

    it('margin/padding with multi vals are transformed', function() {
        var obj = cssfix('margin', '200 300 100');
        expect(obj.marginTop).to.be.equal(200);
        expect(obj.marginHorizontal).to.be.equal(300);
        expect(obj.marginBottom).to.be.equal(100);
    });

    it('background-size should be transformed to resizeMode', function() {
        var obj = cssfix('backgroundSize', 'cover');
        expect(obj.resizeMode).to.be.equal('cover');
    });

});
