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
    http.getUsingPromises(http.POSTS)
      .then(doSomethingWhenFinish);

    http.getUsingPromises(http.INVALID_URL)
      .then(doSomethingWhenFinish);

    //Finally no acepta parámetros
    http.getUsingPromises(http.POSTS)
      .finally(doSomethingWhenFinish);

    http.getUsingPromises(http.INVALID_URL)
      .finally(doSomethingWhenFinish);
  }

  function renderText(){
    dom.button('test', test);
    dom.append(test.toString());
    dom.append(doSomethingWhenFinish.toString());
    dom.append(http.getUsingPromises.toString());
  }

  return {
    'init': init
  };
});
