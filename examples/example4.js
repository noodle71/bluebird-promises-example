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

    useCallbacksParallel([postsURL, usersURL, albumsURL]);
    usePromisesParallel([postsURL, usersURL, albumsURL]);

    useCallbacksParallel([invalidUrl, usersURL, albumsURL]);
    usePromisesParallel([invalidUrl, usersURL, albumsURL]);

    useCallbacksParallel([invalidUrl, invalidUrl, invalidUrl]);
    usePromisesParallel([invalidUrl, invalidUrl, invalidUrl]);
  }

  function getUsingPromises(url){
    return Promise.resolve($.get(url));
  }

  function getUsingCallbacks(url, cb){
    return $.get(url, cb).fail(function(error){
      console.trace('Callbacks: Fail handler');
      dom.error('Callbacks: Error');
    });
  }

  function usePromisesParallel(urls){
    var joinPromises = urls.map(function(url){return getUsingPromises(url)});
    Promise.all(joinPromises)
      .then(function(data){
        dom.info('Promises: Got Everything: ' + typeof data);
      })
      .catch(function(error){
        console.trace('Promises: Fail handler');
        dom.error('Promises: Error');
      });
  }

  function useCallbacksParallel(urls){
    var tot = Array.isArray(urls) ? urls.length : 0;
    var received = 0;
    var dataCollected = [];

    for(var i = 0; i < tot; i++){
      getUsingCallbacks(urls[i], function(data){
        received++;
        dataCollected.push(data);
        if(received == tot){
          dom.info('Callbacks: Got Everything: ' + typeof data);
        }
      })
    }

  }

  function renderText(){
    dom.button('test', test);
    dom.append(test.toString());
    dom.append(useCallbacksParallel.toString());
    dom.append(usePromisesParallel.toString());
    dom.append(getUsingCallbacks.toString());
    dom.append(getUsingPromises.toString());
  }

  return {
    'init': init
  };
});
