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
    Promise.map(urls, function(url){return http.getUsingPromises(url)})
      .spread(function(posts, users, todos){
        dom.info('Received posts: ' + posts.length);
        dom.info('Received users: ' + users.length);
        dom.info('Received todos: ' + todos.length);
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
