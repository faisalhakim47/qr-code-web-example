(function () {
  /** @type {string[]} */
  var requirements = [];

  /**
   * @param {any} v 
   */
  function typeofUndef(v) {
    return typeof window[v] === 'undefined';
  }

  /**
   * @param {Array} vs 
   */
  function typeofUndefs(vs) {
    vs = vs.map(function (v) {
      return typeofUndef(v);
    });
    for (var index = 0; index < vs.length; index++) {
      if (vs[index]) return true;
    }
    return false;
  }

  /**
   * @param {boolean} isSupported
   * @param {string} feature 
   */
  function addRequirement(isSupported, feature) {
    if (!isSupported) {
      requirements.push(feature);
    }
  }

  var style = document.createElement('div').style;

  /**
   * @param {string} property 
   * @param {string} value 
   */
  function addCSSRequirement(property, value) {
    function reject() {
      addRequirement(false, 'CSS ' + property + ': ' + value + ';');
    }
    if (!(property in style)) reject();
    else {
      const resVal = style[property] = value;
      if (style[property] !== resVal) reject();
    }
  }

  function checkSupports(feature) {
    const length = requirements.length;
    const text = requirements
      .map(function (req) {
        return '"' + req + '"'
      })
      .reduce(function (text, req, index) {
        if (index === 0) return req;
        if (index === (length - 1)) {
          if (length === 2) return text + ' dan ' + req;
          else return text + ', dan ' + req;
        }
        return text + ', ' + req;
      }, '');
    if (length) {
      alert('Awqt runs on dev mode. It reguire browser features, namely: ' + text + '.');
    }
  }

  addRequirement(!window.NO_MODULE, 'ES6 Module');
  addRequirement(typeofUndefs(['Blob', 'WebKitBlob']), 'Blob');

  addCSSRequirement('display', 'flex');

  checkSupports();
})();
