/**
 *  Javascript SimpleModal library by Lewis Nelson
 *
 *  Author, Lewis Nelson http://www.lewnelson.com
 *
 *  Full source, docs and license available on GitHub
 *  https://github.com/lewnelson/simple-modal
 */

/**
 *  Default global options for SimpleModal
 *
 */
var SimpleModalOptions = {
  disableScrolling: true,
  transitionTime: 600
};

/**
 *  Creates a new instance of SimpleModal
 *
 */
function SimpleModal(options) {
  /**
   *  Contains modal options passed on creating instance
   *
   *  @param object
   */
  var localOptions;

  /**
   *  Reference to self
   *
   *  @param object
   */
  var modal = this;

  /**
   *  Reference to the modal element attached to instance
   *
   *  @param object {javascript node}
   */
  var modalElement;

  /**
   *  Reference to the modal background element attached to instance
   *
   *  @param object {javascript node}
   */
  var modalBackgroundElement;

  /**
   *  All valid modal sizes
   *
   *  @param array
   */
  var validSizes = [
    'extra-small',
    'small',
    'medium',
    'large',
    'extra-large'
  ];

  /**
   *  Default option fallbacks
   *
   *  @param object
   */
  var defaultOptions = {
    size: 'extra-small',
    title: '',
    body: '',
    closable: true,
    closableOnOutsideClick: true,
    closeOnCallback: true
  }

  /**
   *  Valid button options and types
   *
   *  @param object
   */
  var validButtonOptions = {
    class: 'string',
    callback: 'function',
    value: 'string'
  };

  /**
   *  Default button options fallbacks
   *
   *  @param object
   */
  var defaultButtonOptions = {
    value: 'button',
    class: null,
    callback: function(){}
  }

  /**
   *  Holds final options values to
   *  minimise execution time where
   *  get functions are run multiple times
   *
   *  @param object
   */
  var setOptionsObject = {};

  /**
   *  Sets the local options
   *
   *  @param object options
   *  @return void
   */
  function setOptions(options) {
    localOptions = options;
  }

  /**
   *  Returns option from localOptions or null
   *  if option does not exist
   *
   *  @param string option
   *  @return mixed
   */
  function getOption(option) {
    if(typeof localOptions[option] === 'undefined') {
      return null;
    } else {
      return localOptions[option];
    }
  }

  /**
   *  Gets modal size from set options or default fallbacks
   *
   *  @return string
   */
  function getSize() {
    if(typeof setOptionsObject.size !== 'undefined') {
      return setOptionsObject.size;
    }

    var sizeOption = getOption('size');
    if(sizeOption === null) {
      var size = defaultOptions.size;
    } else {
      if(typeof sizeOption === 'string') {
        if(validSizes.indexOf(sizeOption) === '-1') {
          var size = defaultOptions.size;
        } else {
          var size = sizeOption;
        }
      } else {
        throw new Error('Invalid type for option, `size`. Expecting type string.');
      }
    }

    setOptionsObject.size = size;
    return size;
  }

  /**
   *  Gets modal title from set options or default fallback
   *
   *  @return string
   */
  function getTitle() {
    if(typeof setOptionsObject.title !== 'undefined') {
      return setOptionsObject.title;
    }

    var titleOption = getOption('title');
    if(titleOption === null) {
      var title = defaultOptions.title;
    } else {
      if(typeof titleOption === 'string') {
        var title = titleOption;
      } else {
        throw new Error('Invalid type for option, `title`. Expecting type string.');
      }
    }

    setOptionsObject.title = title;
    return title;
  }

  /**
   *  Gets modal body from set options or default fallback
   *
   *  @return string
   */
  function getBody() {
    if(typeof setOptionsObject.body !== 'undefined') {
      return setOptionsObject.body;
    }

    var bodyOption = getOption('body');
    if(bodyOption === null) {
      var body = defaultOptions.body;
    } else {
      if(typeof bodyOption === 'string') {
        var body = bodyOption;
      } else {
        throw new Error('Invalid type for option, `body`. Expecting type string.');
      }
    }

    setOptionsObject.body = body;
    return body;
  }

  /**
   *  Detects if modal should be closable by close icon based on options and defaults
   *
   *  @return boolean
   */
  function isClosable() {
    if(typeof setOptionsObject.closable !== 'undefined') {
      return setOptionsObject.closable;
    }

    var closableOption = getOption('closable');
    if(closableOption === null) {
      var closable = defaultOptions.closable;
    } else {
      if(typeof closableOption === 'boolean') {
        var closable = closableOption;
      } else {
        throw new Error('Invalid type for option, `closable`. Expecting type boolean.');
      }
    }

    setOptionsObject.closable = closable;
    return closable;
  }

  /**
   *  Detects if modal should be closable by clicking outside the modal
   *  based on options and default options
   *
   *  @return boolean
   */
  function isClosableOnOutsideClick() {
    if(typeof setOptionsObject.closableOnOutsideClick !== 'undefined') {
      return setOptionsObject.closableOnOutsideClick;
    }

    var closableOnOutsideClickOption = getOption('closableOnOutsideClick');
    if(closableOnOutsideClickOption === null) {
      var closableOnOutsideClick = defaultOptions.closableOnOutsideClick;
    } else {
      if(typeof closableOnOutsideClickOption === 'boolean') {
        var closableOnOutsideClick = closableOnOutsideClickOption;
      } else {
        throw new Error('Invalid type for option, `closableOnOutsideClick`. Expecting type boolean.');
      }
    }

    setOptionsObject.closableOnOutsideClick = closableOnOutsideClick;
    return closableOnOutsideClick;
  }

  /**
   *  Builds buttons from set options and defaults
   *
   *  @return array
   */
  function getButtonOptions() {
    if(typeof setOptionsObject.buttons !== 'undefined') {
      return setOptionsObject.buttons;
    }

    var buttonsOption = getOption('buttons');
    var completeButtonOptions = [];
    if(buttonsOption !== null) {
      if(typeof buttonsOption !== 'object') {
        throw new Error('Invalid type for option, `buttons`. Expecting type object.');
      } else {
        for(index in buttonsOption) {
          var button = buttonsOption[index];
          for(key in button) {
            if(validButtonOptions[key] === 'undefined') {
              throw new Error('Invalid button option, `' + key + '`.');
            } else {
              var type = validButtonOptions[key];
              if(typeof button[key] !== type) {
                throw new Error('Invalid type for button option, `' + key + '`. Expecting type ' + type + '.');
              }
            }
          }

          for(defaultOption in defaultButtonOptions) {
            if(typeof button[defaultOption] === 'undefined') {
              button[defaultOption] = defaultButtonOptions[defaultOption];
            }
          }

          completeButtonOptions.push(button);
        }
      }
    }

    setOptionsObject.buttons = completeButtonOptions;
    return completeButtonOptions;
  }

  /**
   *  Creates button element from button options, setting callback as well
   *
   *  @param object buttonOptions
   *  @return object {javascript node}
   */
  function createButtonElement(buttonOptions) {
    var buttonElement = document.createElement('button');
    var text = document.createTextNode(buttonOptions.value);
    buttonElement.appendChild(text);
    if(buttonOptions.class !== null) {
      buttonElement.classList.add(buttonOptions.class);
    }

    var callback = buttonOptions.callback;
    buttonElement.onclick = function(event) {
      event.preventDefault();
      var result = callback(modal);
      if(typeof result !== 'boolean') {
        var result = true;
      }

      if(result === true) {
        modal.close();
      }
    }

    return buttonElement;
  }

  /**
   *  Gets the transition time in milliseconds
   *
   *  @return integer
   */
  function getTransitionTime() {
    if(typeof setOptionsObject.transitionTime !== 'undefined') {
      return setOptionsObject.transitionTime;
    }

    var transitionTime = getOption('transitionTime');
    if(transitionTime === null) {
      var transitionTime = parseInt(window.SimpleModalOptions.transitionTime);
    }

    setOptionsObject.transitionTime = transitionTime;
    return transitionTime;
  }

  /**
   *  Event handler for clicks outside of modal
   *
   *  @param object event {javascript event}
   *  @return void
   */
  function outsideModalClickEvent(event) {
    if(isClosableOnOutsideClick() === true) {
      modal.close();
    }
  }

  /**
   *  Gets set background opacity for modal from options
   *
   *  @return float
   */
  function getBackgroundOpacity() {
    var backgroundOpacityOption = getOption('backgroundOpacity');
    if(backgroundOpacityOption !== null) {
      backgroundOpacityOption = parseFloat(backgroundOpacityOption);
      if(backgroundOpacityOption > 1) {
        var backgroundOpacity = 1;
      } else if(backgroundOpacityOption < 0) {
        var backgroundOpacity = 0;
      } else {
        var backgroundOpacity = backgroundOpacityOption;
      }
    } else {
      var backgroundOpacity = -1;
    }

    return backgroundOpacity;
  }

  /**
   *  Creates and shows the modals background element
   *
   *  @return void
   */
  function showBackground() {
    var backgroundElement = document.createElement('div');
    backgroundElement.classList.add('simple-modal-background');
    backgroundElement.classList.add('simple-modal-hide');
    modalBackgroundElement = backgroundElement;
    document.body.appendChild(backgroundElement);
    var backgroundOpacity = getBackgroundOpacity();
    if(backgroundOpacity < 0) {
      fadeIn(backgroundElement);
    } else {
      fadeIn(backgroundElement, backgroundOpacity);
    }

    setTimeout(function() {
      modalBackgroundElement.addEventListener('click', outsideModalClickEvent);
    }, getTransitionTime());
  }

  /**
   *  Hides abd removes the modals background element
   *
   *  @return void
   */
  function hideBackground() {
    fadeOut(modalBackgroundElement);
    setTimeout(function() {
      modalBackgroundElement.parentNode.removeChild(modalBackgroundElement);
    }, getTransitionTime());
  }

  /**
   *  Ran once modal has been shown, will find and run any callbacks to be run once shown
   *
   *  @return void
   */
  function onComplete() {
    var onCompleteCallback = getOption('onComplete');
    if(typeof onCompleteCallback === 'function') {
      onCompleteCallback(modal);
    }
  }

  /**
   *  Checks if scrolling should be disabled and disables if it should
   *
   *  @return void
   */
  function disableScroll() {
    var allModals = document.getElementsByClassName('simple-modal');
    if(allModals.length === 1 && window.SimpleModalOptions.disableScrolling === true) {
      var bodyStyle = getComputedStyle(document.body);
      var previousWidth = parseInt(bodyStyle.width);
      document.body.classList.add('simple-modal-disable-scroll');
      var afterWidth = parseInt(bodyStyle.width);
      var paddingDifference = afterWidth - previousWidth;
      var originalPadding = parseInt(bodyStyle.paddingRight);
      var finalPadding = originalPadding + paddingDifference;
      document.body.style.paddingRight = finalPadding + 'px';
      document.body.setAttribute('data-original-padding', originalPadding + 'px');
    }
  }

  /**
   *  Checks if scrolling should be enabled and enables if it should
   *
   *  @return void
   */
  function enableScroll() {
    var allModals = document.getElementsByClassName('simple-modal');
    if(allModals.length < 1) {
      var bodyClasses = document.body.classList;
      if(bodyClasses.contains('simple-modal-disable-scroll') === true) {
        document.body.classList.remove('simple-modal-disable-scroll');
        var originalPadding = document.body.getAttribute('data-original-padding');
        if(originalPadding === null) {
          var originalPadding = '0px';
        }
        document.body.style.paddingRight = originalPadding;
      }
    }
  }

  /**
   *  Default modal animation function
   *
   *  @param string direction
   *  @param object element {javascript node}
   *  @param float finalOpacity
   *  @return void
   */
  function animateOpacity(direction, element, finalOpacity) {
    var currentStyle = getComputedStyle(element);
    if(direction === 'positive') {
      if(typeof finalOpacity === 'undefined') {
        var finalOpacity = parseFloat(currentStyle.opacity);
      } else {
        var finalOpacity = parseFloat(finalOpacity);
      }
      var currentOpacity = 0;
      element.style.opacity = 0;
      element.style.display = 'block';
    } else {
      var finalOpacity = parseFloat(0);
      var currentOpacity = parseFloat(currentStyle.opacity);
    }
    
    var interval = 20;
    var steps = Math.ceil(getTransitionTime() / interval);
    if(direction === 'positive') {
      var increment = (finalOpacity - currentOpacity) / steps;
    } else {
      var increment = (currentOpacity - finalOpacity) / steps;
    }

    var animationInterval = setInterval(function() {
      var clear = false;
      var opacity = parseFloat(currentStyle.opacity);
      if(direction === 'positive') {
        var newOpacity = opacity + increment;
        if(newOpacity > finalOpacity) {
          newOpacity = finalOpacity;
          clear = true;
        }
      } else {
        if(!isNaN(opacity)) {
          var newOpacity = opacity - increment;
          if(newOpacity < finalOpacity) {
            newOpacity = finalOpacity;
            clear = true;
          }
        }
      }

      if(!isNaN(opacity)) {
        element.style.opacity = newOpacity;
        if(clear === true) {
          clearInterval(animationInterval);
        }
      } else {
        clearInterval(animationInterval);
      }
    }, interval);
  }

  /**
   *  Gets custom fadeIn function from global or local options,
   *  if no custom function found returns null
   *
   *  @return function || null
   */
  function getCustomFadeInFunction() {
    if(typeof setOptionsObject.customFadeIn !== 'undefined') {
      return setOptionsObject.customFadeIn;
    }

    var customFadeInOption = getOption('customFadeIn');
    if(typeof customFadeInOption === 'function') {
      var customFadeIn = customFadeInOption;
    } else {
      if(typeof window.SimpleModalOptions.customFadeIn !== 'undefined') {
        var customFadeIn = window.SimpleModalOptions.customFadeIn;
      } else {
        var customFadeIn = null;
      }
    }

    setOptionsObject.customFadeIn = customFadeIn;
    return customFadeIn;
  }

  /**
   *  Gets custom fadeOut function from global or local options,
   *  if no custom function found returns null
   *
   *  @return function || null
   */
  function getCustomFadeOutFunction() {
    if(typeof setOptionsObject.customFadeOut !== 'undefined') {
      return setOptionsObject.customFadeOut;
    }

    var customFadeOutOption = getOption('customFadeOut');
    if(typeof customFadeOutOption === 'function') {
      var customFadeOut = customFadeOutOption;
    } else {
      if(typeof window.SimpleModalOptions.customFadeOut !== 'undefined') {
        var customFadeOut = window.SimpleModalOptions.customFadeOut;
      } else {
        var customFadeOut = null;
      }
    }

    setOptionsObject.customFadeOut = customFadeOut;
    return customFadeOut;
  }

  /**
   *  Runs fadeIn animation on element either via custom or built in animation function
   *
   *  @return void
   */
  function fadeIn(element, finalOpacity) {
    var customFadeIn = getCustomFadeInFunction();
    if(typeof customFadeIn === 'function') {
      customFadeIn(element);
    } else {
      var direction = 'positive';
      if(typeof finalOpacity === 'undefined') {
        animateOpacity(direction, element);
      } else {
        animateOpacity(direction, element, finalOpacity);
      }
    }
  }

  /**
   *  Runs fadeOut animation on element either via custom or built in animation function
   *
   *  @return void
   */
  function fadeOut(element) {
    var customFadeOut = getCustomFadeOutFunction();
    if(typeof customFadeOut === 'function') {
      customFadeOut(element);
    } else {
      var direction = 'negative';
      animateOpacity(direction, element);
    }
  }

  /**
   *  Builds and shows the modal
   *
   *  @param function callback
   *  @return object {instance of self}
   */
  this.show = function(callback) {
    var newModal = document.createElement('div');
    var size = getSize();
    newModal.classList.add('simple-modal');
    newModal.classList.add('simple-modal-hide');
    newModal.classList.add(size);

    var modalInner = document.createElement('div');
    modalInner.classList.add('simple-modal-inner');

    var closable = isClosable();
    if(closable === true) {
      var closableElement = document.createElement('div');
      closableElement.classList.add('simple-modal-close');
      closableElement.onclick = function(e) {
        e.preventDefault();
        modal.close();
      };
      modalInner.appendChild(closableElement);
    }

    var title = getTitle();
    if(title.length > 0) {
      var modalTitle = document.createElement('div');
      modalTitle.classList.add('simple-modal-title');
      var titleElement = document.createTextNode(title);
      modalTitle.appendChild(titleElement);
      modalInner.appendChild(modalTitle);
    } else {
      newModal.classList.add('simple-modal-no-title');
    }

    var body = getBody();
    if(body.length > 0) {
      var modalBody = document.createElement('div');
      modalBody.classList.add('simple-modal-body');
      modalBody.innerHTML = body;
      modalInner.appendChild(modalBody);
    } else {
      newModal.classList.add('simple-modal-no-body');
    }

    var buttonsOptions = getButtonOptions();
    if(buttonsOptions.length > 0) {
      var modalButtons = document.createElement('div');
      modalButtons.classList.add('simple-modal-buttons');
      for(index in buttonsOptions) {
        var buttonOptions = buttonsOptions[index];
        var buttonElement = createButtonElement(buttonOptions);
        modalButtons.appendChild(buttonElement);
      }
      modalInner.appendChild(modalButtons);
    } else {
      newModal.classList.add('simple-modal-no-buttons');
    }

    newModal.appendChild(modalInner);
    modalElement = newModal;
    showBackground();
    document.body.appendChild(newModal);
    fadeIn(modalElement);
    onComplete();
    if(typeof callback === 'function') {
      callback(modal);
    }
    disableScroll();
    return modal;
  }

  /**
   *  Closes and deletes modal from DOM
   *
   *  @param function callback
   *  @return object {instance of self}
   */
  this.close = function(callback) {
    if(typeof modalElement !== 'undefined') {
      if(modalElement.parentNode !== null) {
        hideBackground();
        fadeOut(modalElement);

        setTimeout(function() {
          modalElement.parentNode.removeChild(modalElement);
          enableScroll();
          if(typeof callback === 'function') {
            callback(modal);
          }
        }, getTransitionTime());
      }
    }

    return modal;
  }

  /**
   *  Updates the title text, if no title was given to begin with then no title will be updated
   *
   *  @param string newTitle
   *  @return void
   */
  this.updateTitle = function(newTitle) {
    var titleElement = modalElement.getElementsByClassName('simple-modal-title');
    if(typeof newTitle !== 'string') {
      throw new Error('Invalid value given for titleElement, expecting type string.');
    } else {
      var newTitleTextNode = document.createTextNode(newTitle);
    }

    if(titleElement.length > 0 && newTitle.length > 0) {
      titleElement[0].innerHTML = '';
      titleElement[0].appendChild(newTitleTextNode);
    }
  }

  /**
   *  Updates the body content of the modal, if no body was given to begin with then no body will be updated
   *
   *  @param string bodyHtml
   *  @return void
   */
  this.updateBody = function(bodyHtml) {
    var bodyElement = modalElement.getElementsByClassName('simple-modal-body');
    if(typeof bodyHtml !== 'string') {
      throw new Error('Invalid value given for updateBody, expecting type string.');
    }

    if(bodyElement.length > 0) {
      bodyElement[0].innerHTML = bodyHtml;
    }
  }

  /**
   *  Gets the modal element
   *
   *  @return object {javascript node}
   */
  this.getModalElement = function() {
    var element = null;
    if(typeof modalElement !== 'undefined') {
      if(modalElement.parentNode !== null) {
        var element = modalElement;
      }
    }

    return element;
  }

  /**
   *  Setup SimpleModal instance by setting local options
   *
   */
  setOptions(options);
};