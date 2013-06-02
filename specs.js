var oar = require('./index');

describe('oar', function () {

  var a;

  beforeEach(function () {
    a = oar();
  });

  describe('events', function () {

    it('works without any handlers', function () {
      a.push('test');
    });

    it('can set events before you call the proxy method', function (done) {
      a.on('push', function () {
        done();
      });

      a.push('test');
    });

    it('can set events after you call the proxy method', function (done) {
      a.push('test');

      a.on('push', function () {
        done();
      });
    });

    it('calls multiple handlers', function (done) {

      var calls = 0;
      a.push('test');

      var callback = function () {
        calls += 1;
        if (calls === 3) {
          done();
        }
      };

      a.on('push', callback);
      a.on('push', callback);
      a.on('push', callback);

    });

  });

  describe('constructor', function () {

    it('can accept a base array', function () {
      a = oar(['one', 'two']);
      a.should.eql(['one', 'two']);
    });

  });

  describe('pop', function () {
    
    it('returns the last value of the array', function () {
      a = oar(['one', 'two']);
      a.pop().should.eql('two');
    });

    it('fires the pop event and returns the new array', function (done) {
      a = oar(['one', 'two']);
      a.pop();
      a.on('pop', function (result) {
        result.should.eql(['one']);
        done();
      });
    });

  });

  describe('push', function () {
    
    it('adds one value to the array', function () {
      a.push('one');
      a.should.eql(['one']);
    });

    it('adds multiple values to the array', function () {
      a.push('one', 'two');
      a.should.eql(['one', 'two']);
    });

    it('fires the push event and returns the new array', function (done) {
      a.push('one');
      a.on('push', function (result) {
        result.should.eql(['one']);
        done();
      });
    });

  });

  describe('reverse', function () {

    it('reverses the array', function () {
      a = oar(['one', 'two']);
      a.reverse();
      a.should.eql(['two', 'one']);
    });

    it('fires the reverse event and returns the new array', function (done) {

      a = oar(['one', 'two']);
      a.reverse();
      a.on('reverse', function (result) {
        result.should.eql(['two', 'one']);
        done();
      });

    });

  });

  describe('shift', function () {
    
    it('returns the first value of the array', function () {
      a = oar(['one', 'two']);
      a.shift().should.eql('one');
    });

    it('fires the shift event and returns the new array', function (done) {
      a = oar(['one', 'two']);
      a.shift();
      a.on('shift', function (result) {
        result.should.eql(['two']);
        done();
      });
    });

  });

  describe('sort', function () {
    
    it('sorts the array', function () {
      a = oar([1, 3, 2]);
      a.sort(function (a, b) {
        return a > b;
      });
      a.should.eql([1, 2, 3]);
    });

    it('fires the sort event and returns the new array', function (done) {
      a = oar([1, 3, 2]);
      a.sort(function (a, b) {
        return a > b;
      });
      a.on('sort', function (result) {
        result.should.eql([1, 2, 3]);
        done();
      });
    });

  });

  describe('splice', function () {
    
    it('replaces an element', function () {
      a = oar(['one', 'three']);
      a.splice(1, 1, 'two');
      a.should.eql(['one', 'two']);
    });

    it('fires the sort event and returns the new array', function (done) {
      a = oar(['one', 'three']);
      a.splice(1, 1, 'two');
      a.on('splice', function (result) {
        result.should.eql(['one', 'two']);
        done();
      });
    });

  });

  describe('unshift', function () {
    
    it('Adds one or more elements to the beginning of an array and returns the new length of the array.', function () {
      a = oar(['two', 'three']);
      a.unshift('one').should.eql(3);
      a.should.eql(['one', 'two', 'three']);
    });

    it('fires the unshift event and returns the new array', function (done) {
      a = oar(['two', 'three']);
      a.unshift('one');
      a.on('unshift', function (result) {
        result.should.eql(['one', 'two', 'three']);
        done();
      });
    });

  });

});
