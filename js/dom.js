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

  function append(text){
    $container.prepend($('<pre>',{'text': text}));
  }

  function log(text, level){
    console[level](text);
    $logger.append($('<p>',{'text': text, 'class': level}));
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
    $container.append($logger);
  }

  return {
    'startContainer': startContainer,
    'info': info,
    'warn': warn,
    'error': error,
    'getContainer': getContainer,
    'getLogger': getLogger,
    'append': append
  };
});
