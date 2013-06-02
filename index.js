var oar = function (base) {

  var arr = base || [];
  var handlers = {};

  Object.defineProperty(arr, 'on', { value:  function (event, callback) {
    if (typeof handlers[event] === 'undefined') {
      handlers[event] = [];
    }
    handlers[event].push(callback);
  }});

  var proxy = function (method) {

    var args = Array.prototype.slice.call(arguments, 1);
    var result = Array.prototype[method].apply(arr, args);

    process.nextTick(function () {
      if (typeof handlers[method] !== 'undefined') {
        handlers[method].forEach(function (handler) {
          handler(arr);
        });
      }
    });

    return result;

  };

  [ 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift' ].forEach(function (method) {
    Object.defineProperty(arr, method, { value: proxy.bind(null, method) });
  });

  return arr;

};

module.exports = oar;