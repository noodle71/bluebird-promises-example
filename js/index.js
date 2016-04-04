requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bluebird: '../bower_components/bluebird/js/browser/bluebird'
    }
});

requirejs(["jquery", "dom"], function($, container) {

  $(document).ready(function(){
    $('[goto]').off('click');
    $('[goto]').on('click', function(e){
      var example = '../examples/example' + $(this).attr('goto');
      requirejs([example], function(example){
        example.init(container.startContainer());
      });
    });
  });
});
