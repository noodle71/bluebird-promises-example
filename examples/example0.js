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
    getFromServer(http.INVALID_URL);
  }

  function getFromServer(url){
    http.promiseGetUsingXMLHttpRequest(url).then(dom.info).catch(dom.error);
  }

  function renderText(){
    dom.button('sendRequests', sendRequests);
    dom.append(sendRequests.toString());
    dom.append(getFromServer.toString());
    dom.append(http.promiseGetUsingXMLHttpRequest.toString());
  }

  return {
    'init': init
  };
});
