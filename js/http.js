requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bluebird: '../bower_components/bluebird/js/browser/bluebird'
    }
});

define(['jquery', 'bluebird'], function ($, Promise) {

  var HOST = 'http://jsonplaceholder.typicode.com';
  var POSTS = '/posts';
  var COMMENTS = '/comments';
  var ALBUMS = '/albums';
  var PHOTOS = '/photos';
  var TODOS = '/todos';
  var USERS = '/users';

  function get(url){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest;

        xhr.addEventListener('readystatechange', function(data){
          if(xhr.readyState == 4 && xhr.status == 200)
            resolve(JSON.parse(xhr.responseText));
          else if(xhr.readyState == 4)
            reject('Ha ocurrido un error');
        });

        xhr.open("GET", HOST + url);
        xhr.send(null);
    });
  }

  return {
    'get': get,
    'HOST': HOST,
    'POSTS': POSTS,
    'COMMENTS': COMMENTS,
    'ALBUMS': ALBUMS,
    'PHOTOS': PHOTOS,
    'TODOS': TODOS,
    'USERS': USERS
  };
});
