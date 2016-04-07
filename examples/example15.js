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
    var urls = [http.POSTS, http.USERS, http.TODOS];

    Promise.reduce(urls, function(total, url) {
      return http.getUsingPromises(url, "utf8")
        .then(function(contents) {
          return total.concat(contents);
        });
      },[])
    .then(function(total) {
      dom.info('Received: ' + total.length);
    })
    .catch(dom.error);
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
