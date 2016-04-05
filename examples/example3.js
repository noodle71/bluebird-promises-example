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
    var postsURL = http.HOST + http.POSTS;
    var usersURL = http.HOST + http.USERS;
    var albumsURL = http.HOST + http.ALBUMS;
    var invalidUrl = http.HOST + '/invalidUrl';

    useCallbacksChaining(postsURL, usersURL, albumsURL);
    usePromisesChaining(postsURL, usersURL, albumsURL);

    useCallbacksChaining(invalidUrl, usersURL, albumsURL);
    usePromisesChaining(invalidUrl, usersURL, albumsURL);

    useCallbacksChaining(postsURL, usersURL, invalidUrl);
    usePromisesChaining(postsURL, usersURL, invalidUrl);
  }

  function getUsingPromises(url){
    return Promise.resolve($.get(url));
  }

  function getUsingCallbacks(url, cb){
    return $.get(url, cb).fail(function(error){
      throw new Error('Callbacks: Error');
    });
  }

  function usePromisesChaining(postsURL, usersURL, albumsURL){
    getUsingPromises(postsURL)
      .then(function(data){
        dom.info('Promises: Got Posts: ' + typeof data);
        return getUsingPromises(usersURL)
      })
      .then(function(data){
        dom.info('Promises: Got Users: ' + typeof data);
        return getUsingPromises(albumsURL);
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
      getUsingCallbacks(postsURL, function(data){
        dom.info('Callbacks: Got Posts: ' + typeof data);
        getUsingCallbacks(usersURL, function(data){
          dom.info('Callbacks: Got Users: ' + typeof data);
          getUsingCallbacks(albumsURL, function(data){
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
    dom.append(getUsingCallbacks.toString());
    dom.append(getUsingPromises.toString());
  }

  return {
    'init': init
  };
});
