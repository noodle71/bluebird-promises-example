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
    var usersURL = http.USERS;
    var albumsURL = http.ALBUMS;
    var invalidUrl = '/invalidUrl';

    useCallbacksChaining(postsURL, usersURL, albumsURL);
    usePromisesChaining(postsURL, usersURL, albumsURL);

    useCallbacksChaining(invalidUrl, usersURL, albumsURL);
    usePromisesChaining(invalidUrl, usersURL, albumsURL);

    useCallbacksChaining(postsURL, usersURL, invalidUrl);
    usePromisesChaining(postsURL, usersURL, invalidUrl);
  }

  function usePromisesChaining(postsURL, usersURL, albumsURL){
    http.getUsingPromises(postsURL)
      .then(function(data){
        dom.info('Promises: Got Posts: ' + typeof data);
        http.getUsingPromises(usersURL);
      })
      .then(function(data){
        dom.info('Promises: Got Users: ' + typeof data);
        http.getUsingPromises(albumsURL);
      })
      .then(function(data){
        dom.info('Promises: Got Albums: ' + typeof data);
      })
      .catch(function(error){
        console.trace('Promises: Fail handler');
        dom.error('Promises: Error');
      });
  }

  function useCallbacksChaining(postsURL, usersURL, albumsURL){
    http.getUsingCallbacks(postsURL, function(data){
      dom.info('Callbacks: Got Posts: ' + typeof data);
      http.getUsingCallbacks(usersURL, function(data){
        dom.info('Callbacks: Got Users: ' + typeof data);
        http.getUsingCallbacks(albumsURL, function(data){
          dom.info('Callbacks: Got Albums: ' + typeof data);
        }).fail(failHandler);
      }).fail(failHandler);
    }).fail(failHandler);
  }

  function failHandler(error){
    console.trace('Callbacks: Fail handler');
    dom.error('Callbacks: Error');
  }

  function renderText(){
    dom.button('test', test);
    dom.append(test.toString());
    dom.append(failHandler.toString());
    dom.append(useCallbacksChaining.toString());
    dom.append(usePromisesChaining.toString());
    dom.append(http.getUsingCallbacks.toString());
    dom.append(http.getUsingPromises.toString());
  }

  return {
    'init': init
  };
});
