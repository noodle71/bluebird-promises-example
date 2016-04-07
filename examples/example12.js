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
    //Promise is fullfilled when 2 are fulfilled
    Promise.some(getUrls, 2)
      .spread(function(first, second, third){
        dom.info('first: ' + first.length);
        dom.info('second: ' + second.length);
        dom.info('third: ' + third);
      })
      .catch(Promise.AggregateError, function(error) {
        //Can't have two promises fulfilled
        dom.error(error);
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
