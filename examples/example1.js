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

  function testPromises(){
    usePromiseConstructor(true).then(dom.info).catch(dom.error);
    usePromiseConstructor(false).then(dom.info).catch(dom.error);
    usePromiseResolve().then(dom.info).catch(dom.error);
    usePromiseReject().then(dom.info).catch(dom.error);
    castJqueryPromise(http.HOST + http.POSTS).then(dom.info).catch(dom.error);
    castJqueryPromise('this is a invalid url').then(dom.info).catch(dom.error);
  }

  function usePromiseConstructor(success){
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if(success) resolve('usePromise: OK');
        else reject('usePromise: ERROR');
      }, 2000);
    });
  }

  function usePromiseResolve(url){
    return Promise.resolve(function(){
      return 'usePromiseResolve: OK';
    });
  }

  function usePromiseReject(url){
    return Promise.reject(function(){
      return 'usePromiseReject: ERROR';
    });
  }

  function castJqueryPromise(url){
    return Promise.resolve($.get(url));
  }

  function renderText(){
    dom.button('testPromises', testPromises);
    dom.append(castJqueryPromise.toString());
    dom.append("//BONUS:");
    dom.append(testPromises.toString());
    dom.append(usePromiseReject.toString());
    dom.append(usePromiseResolve.toString());
    dom.append(usePromiseConstructor.toString());
  }

  return {
    'init': init
  };
});
