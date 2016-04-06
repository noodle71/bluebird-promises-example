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

  function test(){
    var postsURL = http.POSTS;
    var invalidUrl = http.INVALID_URL;

    var promiseOk = http.getUsingPromises(postsURL);
    var promiseFail = http.getUsingPromises(invalidUrl);

    //OK
    promiseOk.then(function(data){
      dom.info('Ok from then 1');
    })
    .catch(function(error){
      dom.error('Error from then 1');
    });

    promiseOk.then(function(data){
      dom.info('Ok from then 2');
    })
    .catch(function(error){
      dom.error('Error from then 2');
    });

    //FAIL
    promiseFail.then(function(data){
      dom.info('Ok from then 1');
    })
    .catch(function(error){
      dom.error('Error from then 1');
    });

    promiseFail.then(function(data){
      dom.info('Ok from then 2');
    })
    .catch(function(error){
      dom.error('Error from then 2');
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
