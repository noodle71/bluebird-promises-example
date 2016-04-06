requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bluebird: '../bower_components/bluebird/js/browser/bluebird'
    }
});

define(['jquery', 'bluebird', 'http', 'dom'],
  function ($, Promise, http, dom) {

  function init(){
    renderText();
  }

  function test(){
    useDeepPromises().then(dom.info).catch(dom.error);
  }

  function fillHashMap(element, keyVal, value, hashmap){
    if(keyVal in hashmap) {
      if(value in hashmap[keyVal]) hashmap[keyVal][value].push(element);
      else hashmap[keyVal][value] = [element];
    }
    else {
      hashmap[keyVal] = {};
      hashmap[keyVal][value] = [element];
    }
    return hashmap;
  }

  function buildHashMap(data, key, value, hashmap){
    var total = data.length;
    var element;
    var keyVal;
    while(total--){
      element = data[total];
      keyVal = element[key];
      hashmap = fillHashMap(element, keyVal, value, hashmap);
    }
    return hashmap;
  }

  function mapPromises(array, url){
    return array.map(function(element){
      return http.getUsingPromises(url + element);
    });
  }

  function useDeepPromises(){

    var hashmap = {};
    var usersId = [];
    return http.getUsingPromises(http.TODOS)
              .then(function(todos){
                hashmap = buildHashMap(todos, 'userId', 'todos', {});
                usersId = Object.keys(hashmap);
                return Promise.all(mapPromises(usersId, http.POST_BY_USER_ID));
              })
              .then(function(allPosts){
                allPosts.forEach(function(posts){
                  hashmap = buildHashMap(posts, 'userId', 'posts', hashmap);
                });
                return Promise.all(mapPromises(usersId, http.USER_BY_USER_ID));
              })
              .then(function(allUsers){
                allUsers.forEach(function(user){
                  hashmap = buildHashMap(user, 'id', 'userInfo', hashmap);
                });
                return hashmap;
              })
              .catch(dom.error);
  }

  function renderText(){
    dom.button('test', test);
    dom.append(test.toString());
    dom.append(useDeepPromises.toString());
    dom.append(mapPromises.toString());
    dom.append(buildHashMap.toString());
    dom.append(fillHashMap.toString());
    dom.append(http.getUsingPromises.toString());
  }

  return {
    'init': init
  };
});
