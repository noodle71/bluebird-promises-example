requirejs.config({
    paths: {
        jquery: 'bower_components/jquery/dist/jquery.min'
    }
});

define(['jquery'], function ($) {

  var $container = $('#exampleContainer');
  var $logger = $('<div>', {'id': 'logger'});


  function getContainer(){
    return $container;
  }

  function getLogger(){
    return $logger;
  }

  function button(text, fun){
    var actionButton = $('<button>',{'text':text});
    actionButton.off('click');
    actionButton.on('click', fun);
    $container.append(actionButton);
  }

  function append(text){
    var code = $('<pre>', {'text': text});
    $container.prepend(code);
  }

  function log(text, level){
    console[level](text);
    $logger.append($('<p>',{'text': text, 'class': level}));
    window.scrollTo(0, document.body.scrollHeight);
  }

  function info(text){
    log(text, 'info');
  };

  function warn(text){
    log(text, 'warn');
  };

  function error(text){
    log(text, 'error');
  };

  function startContainer(){
    $container.empty();
    $logger.empty();
    console.clear();
    $container.append($logger);
  }

  return {
    'startContainer': startContainer,
    'info': info,
    'warn': warn,
    'error': error,
    'getContainer': getContainer,
    'getLogger': getLogger,
    'append': append,
    'button': button
  };
});
