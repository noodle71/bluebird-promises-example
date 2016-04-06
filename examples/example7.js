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
    var promiseOk = http.getUsingPromises(postsURL);

    promiseOk.then(function(data){
      dom.info('Ok from then 1');
      throw new Error('Force error');
    })
    .catch(function(error){
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
