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
    var invalidUrl = http.INVALID_URL;

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
        return http.getUsingPromises(usersURL)
      })
      .then(function(data){
        dom.info('Promises: Got Users: ' + typeof data);
        return http.getUsingPromises(albumsURL);
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
    try{
      http.getUsingCallbacksThrowingError(postsURL, function(data){
        dom.info('Callbacks: Got Posts: ' + typeof data);
        http.getUsingCallbacksThrowingError(usersURL, function(data){
          dom.info('Callbacks: Got Users: ' + typeof data);
          http.getUsingCallbacksThrowingError(albumsURL, function(data){
            dom.info('Callbacks: Got Albums: ' + typeof data);
          });
        });
      });
    } catch(error) {
      console.trace('Callbacks: Fail handler');
      dom.error('Callbacks: Error');
    }
  }

  function renderText(){
    dom.button('test', test);
    dom.append(test.toString());
    dom.append(useCallbacksChaining.toString());
    dom.append(usePromisesChaining.toString());
    dom.append(http.getUsingCallbacksThrowingError.toString());
    dom.append(http.getUsingPromises.toString());
  }

  return {
    'init': init
  };
});
