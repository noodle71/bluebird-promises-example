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
      .then(function(){
        return [
          http.getUsingPromises(http.USERS),
          http.getUsingPromises(http.TODOS)
        ];
      })
      .spread(function(users, todos){
        dom.info('Received users: ' + users.length);
        dom.info('Received todos: ' + todos.length);
      })
      .catch(dom.error);

    http.getUsingPromises(http.POSTS)
      .then(function(){
        return [
          http.getUsingPromises(http.USERS),
          http.getUsingPromises(http.TODOS)
        ];
      })
      .then(function(all){
        dom.info('Received users: ' + all[0].length);
        dom.info('Received todos: ' + all[1].length);
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
