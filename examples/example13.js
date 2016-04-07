requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bluebird: '../bower_components/bluebird/js/browser/bluebird'
    }
});

define(['jquery', 'bluebird', 'http', 'dom'], function ($, Promise, http, dom) {

  function init(){
    renderText();
  }

  function doSomethingWhenFinish(data){
    dom.info('Finish: ' + data);
  }

  function test(){
    var getUrls = [
      http.getUsingPromises(http.POSTS),
      http.getUsingPromises(http.USERS),
      http.getUsingPromises(http.TODOS)
    ];
    //Promise is fullfilled when 1 is fulfilled. Returns the value of the first
    Promise.any(getUrls)
      .then(function(res){
        dom.info('Any. First: ' + res.length);
      })
      .catch(Promise.AggregateError, function(error) {
        //Can't have one promise fulfilled
        dom.error('Any. Error: ' + error);
    });

    //Promise is fullfilled when 1 is fulfilled or rejected.
    Promise.race(getUrls)
      .then(function(res){
        dom.info('Race. First: ' + res.length);
      })
      .catch(function(error) {
        //First was rejected
        dom.error('Race. First rejected: ' + error);
    });
  }

  function renderText(){
    dom.button('test', test);
    dom.append(test.toString());
    dom.append(http.getUsingPromises.toString());
  }

  return {
    'init': init
  };
});
