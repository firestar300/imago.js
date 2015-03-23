(function (Imago) {
  'use strict';

  if (typeof define === 'function' && define.amd)
    define('imago-js', [], new Imago());
  else if (typeof exports !== 'undefined')
    exports.Imago = new Imago();
  else
    window.Imago = new Imago();
}(function() {
  'use strict';

  function Imago(image) {
    var self = this;

    function init() {
      self.tmp = {};
      self.elements = self.loadElements(image);
      self.data = self.loadData(self.elements);
      console.log(self.elements);
      self.applyElements(self.elements);
    }

    function _save() {
    }

    function _edit() {
    }

    function _undo() {
    }

    function _reset() {
    }

    if (!image || !image.tagName || image.tagName.toLowerCase() !== 'img')
      throw new TypeError('Invalid image: ' + image);

    if (!image.complete)
      image.onload = init;
    else
      init();

    return {
      save: _save,
      edit: _edit,
      undo: _undo,
      reset: _reset
    };
  }

  Imago.prototype = {
    loadElements: function(image) {
      var _image = image,
          _figure,
          _shadow,
          _mask,
          _wrapper,
          _handlers,
          _moveHandler,
          _topLeftHandler,
          _bottomRightHandler;
    
      if (_image.parentElement && _image.parentElement.nodeName.toLowerCase() == 'figure') 
        _figure = _image.parentElement;
      else
        _figure = document.createElement('figure');
    
      _shadow = _figure.getElementsByClassName('crop__shadow')[0];
      _mask = _figure.getElementsByClassName('crop__mask')[0];
      _wrapper = _figure.getElementsByClassName('crop__wrapper')[0];
      _handlers = _figure.getElementsByClassName('crop__handlers')[0];
      _moveHandler = _figure.getElementsByClassName('crop__move-handler')[0];
      _topLeftHandler = _figure.getElementsByClassName('crop__top-left-handler')[0];
      _bottomRightHandler = _figure.getElementsByClassName('crop__bottom-right-handler')[0];

      if (!_shadow) {
        _shadow = _image.cloneNode();
        _shadow.className = 'crop__shadow';
      }
      
      if (!_mask) {
        _mask = document.createElement('div');
        _mask.className = 'crop__mask';
      }
      
      if (!_wrapper) {
        _wrapper = document.createElement('div');
        _wrapper.className = 'crop__wrapper';
      }
      
      if (!_handlers) {
        _handlers = document.createElement('div');
        _handlers.className = 'crop__handlers';
      }
      
      if (!_moveHandler) {
        _moveHandler = document.createElement('div');
        _moveHandler.className = 'crop__move';
      }
      
      if (!_topLeftHandler) {
        _topLeftHandler = document.createElement('span');
        _topLeftHandler.className = 'crop__top-left-handler';
      }

      if (!_bottomRightHandler) {
        _bottomRightHandler = document.createElement('span');
        _bottomRightHandler.className = 'crop__bottom-right-handler';
      }

      return {
        image: _image,
        figure: _figure,
        shadow: _shadow,
        mask: _mask,
        wrapper: _wrapper,
        handlers: _handlers,
        moveHandler: _moveHandler,
        topLeftHandler: _topLeftHandler,
        bottomRightHandler: _bottomRightHandler
      };
    },
    
    applyElements: function(elements) {
      var _image = elements.image,
          _figure = elements.figure;

      if (!_figure.parentElement)
        _image.parentElement.insertBefore(_figure, _image);

      _figure.appendChild(_image);
    },

    loadData: function(elements) {
      var _image = elements.image,
          _origWidth = _image.getAttribute('data-orig-width') * 1,
          _origHeight = _image.getAttribute('data-orig-height') * 1,
          _width = _image.getAttribute('data-width') * 1,
          _height = _image.getAttribute('data-height') * 1,
          _top = _image.getAttribute('data-top') * 1,
          _left = _image.getAttribute('data-left') * 1;

      return {
        origWidth: _origWidth || _image.clientWidth,
        origHeight: _origHeight || _image.clientHeight,
        width: _width || _image.clientWidth,
        height: _height || _image.clientHeight,
        top: _top || 0,
        left: _left || 0,
      }
    },

  };

  return Imago;
}));
