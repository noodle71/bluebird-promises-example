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

  function sendRequests(){
    getFromServer(http.POSTS);
    getFromServer('/esta url no existe');
  }

  function getFromServer(url){
    http.get(url).then(dom.info).catch(dom.error);
  }

  function renderText(){
    dom.button('sendRequests', sendRequests);
    dom.append(sendRequests.toString());
    dom.append(getFromServer.toString());
    dom.append(http.get.toString());
  }

  return {
    'init': init
  };
});
