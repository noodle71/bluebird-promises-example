requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bluebird: '../bower_components/bluebird/js/browser/bluebird'
    }
});

define(['jquery', 'bluebird', 'dom'], function ($, Promise, dom) {

  var HOST = 'http://jsonplaceholder.typicode.com';
  var POSTS = HOST + '/posts';
  var COMMENTS = HOST + '/comments';
  var ALBUMS = HOST + '/albums';
  var PHOTOS = HOST + '/photos';
  var TODOS = HOST + '/todos';
  var USERS = HOST + '/users';
  var POST_BY_USER_ID = POSTS + '?userId=';
  var TODOS_BY_USER_ID = TODOS + '?userId=';
  var USER_BY_USER_ID = USERS + '?id=';
  var INVALID_URL = '/invalidUrl';


  function promiseGetUsingXMLHttpRequest(url){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest;

        xhr.addEventListener('readystatechange', function(data){
          if(xhr.readyState == 4 && xhr.status == 200)
            resolve(JSON.parse(xhr.responseText));
          else if(xhr.readyState == 4)
            reject('Ha ocurrido un error');
        });

        xhr.open("GET", url);
        xhr.send(null);
    });
  }

  function getUsingPromises(url){
    return Promise.resolve($.get(url));
  }

  function getUsingCallbacks(url, cb){
    return $.get(url, cb);
  }

  function getUsingCallbacksThrowingError(url, cb){
    return $.get(url, cb).fail(function(error){
      throw new Error('Callbacks: Error');
    });
  }

  function getUsingCallbacksTracingError(url, cb){
    return $.get(url, cb).fail(function(error){
      console.trace('Callbacks: Fail handler');
      dom.error('Callbacks: Error');
    });
  }

  return {
    'promiseGetUsingXMLHttpRequest': promiseGetUsingXMLHttpRequest,
    'getUsingPromises': getUsingPromises,
    'getUsingCallbacks': getUsingCallbacks,
    'getUsingCallbacksThrowingError': getUsingCallbacksThrowingError,
    'getUsingCallbacksTracingError': getUsingCallbacksTracingError,
    'HOST': HOST,
    'POSTS': POSTS,
    'COMMENTS': COMMENTS,
    'ALBUMS': ALBUMS,
    'PHOTOS': PHOTOS,
    'TODOS': TODOS,
    'USERS': USERS,
    'POST_BY_USER_ID': POST_BY_USER_ID,
    'TODOS_BY_USER_ID': TODOS_BY_USER_ID,
    'USER_BY_USER_ID': USER_BY_USER_ID,
    'INVALID_URL': INVALID_URL
  };
});
