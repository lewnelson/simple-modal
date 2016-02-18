function escapeHtml(string) {
    return string
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 };

var SimpleModalDemos = {
  basic: function() {
    var modal = new SimpleModal({
      size: 'extra-small',
      title: 'Very simple modal',
      body: '<p>This is a very basic example of how to create a simple alert type modal.</p>'
    }).show();
  },
  complexModal: function() {
    var modal = new SimpleModal({
      size: 'small',
      title: 'Complex modal',
      body: '<p>This is an example of a more complex modal.</p><p>Please agree to the terms and conditions before continuing.</p><div><label>I agree to the terms and conditions.</label><input type="checkbox"></input></div>',
      buttons: [
        {
          value: 'cancel'
        },
        {
          value: 'OK',
          callback: function(modal) {
            var modalElement = modal.getModalElement();
            var input = modalElement.getElementsByTagName('input');
            console.log(input[0].checked);
            if(input[0].checked) {
              return true;
            } else {
              var errorModal = new SimpleModal({
                size: 'extra-small',
                closable: false,
                closableOnOutsideClick: false,
                body: '<p>You must agree to the terms and conditions to continue.</p>',
                buttons: [
                  {
                    value: 'dismiss'
                  }
                ]
              }).show();

              return false;
            }
          }
        }
      ]
    }).show();
  },
  troubleRunningRequestedDemo: function() {
    alert('no demo');
  },
  troubleGettingCodeForRequestedDemo: function() {
    return 'no demo :(';
  },
  runDemo: function(demo) {
    if(typeof this[demo] !== 'function') {
      this.troubleRunningRequestedDemo();
    } else {
      this[demo]();
    }
  },
  getCode: function(demo) {
    if(typeof this[demo] !== 'function') {
      var code = this.troubleGettingCodeForRequestedDemo();
    } else {
      var code = escapeHtml(this[demo].toString());
    }

    var modal = new SimpleModal({
      size: 'medium',
      title: 'Code for ' + demo + ' demo',
      body: '<pre>' + code + '</pre>',
      buttons: [
        {
          value: 'run demo',
          class: 'primary',
          callback: function() {
            SimpleModalDemos.runDemo(demo);
            return false;
          }
        }
      ]
    }).show();
  }
};

(function() {
  var demoButtons = document.getElementsByClassName('demo-button');
  for(var i = 0; i < demoButtons.length; i++) {
    var demoButton = demoButtons[i];
    demoButton.onclick = function() {
      var parentContainer = this.parentNode.parentNode;
      var demo = parentContainer.getAttribute('data-demo');
      SimpleModalDemos.runDemo(demo);
    }
  }

  var showcodeButtons = document.getElementsByClassName('showcode-button');
  for(var i = 0; i < showcodeButtons.length; i++) {
    var showcodeButton = showcodeButtons[i];
    showcodeButton.onclick = function() {
      var parentContainer = this.parentNode.parentNode;
      var demo = parentContainer.getAttribute('data-demo');
      SimpleModalDemos.getCode(demo);
    }
  }
})();