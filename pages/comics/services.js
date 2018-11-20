import callbackProp from '@/_common/helpers/httpCallbackProp'
import * as appSettings from '@/_common/appSettings'
const axios = require('axios');


export default {
  getListDataComics(param, callback) {
    var url = ''
    if(param.sortBy != null){
      url = appSettings.URL_GET_LIST_COMICS + appSettings.URL_API_KEY + '&orderBy=' + param.sortBy
    }else{
      url = appSettings.URL_GET_LIST_COMICS + appSettings.URL_API_KEY
    }
    axios({
      method: 'get',
      url: url,
    })
      .then(function(response) {
        callbackProp.IsHttpError = false
        callbackProp.HttpErrorMessage = ''
        callbackProp.ResponseData = response
        callback(callbackProp)
      }).catch(e => {
        callbackProp.IsHttpError = true
        callbackProp.HttpErrorMessage = e
        callbackProp.ResponseData = ''
        callback(callbackProp)
    });
  },
  searchListDataComics(param, callback) {
    var url = ''
    url = appSettings.URL_GET_LIST_COMICS + appSettings.URL_API_KEY + '&titleStartsWith=' + param
    axios({
      method: 'get',
      url: url,
    })
      .then(function(response) {
        callbackProp.IsHttpError = false
        callbackProp.HttpErrorMessage = ''
        callbackProp.ResponseData = response
        callback(callbackProp)
      }).catch(e => {
      callbackProp.IsHttpError = true
      callbackProp.HttpErrorMessage = e
      callbackProp.ResponseData = ''
      callback(callbackProp)
    });
  },
  getDetailDataComics (param, callback) {
    var url = ''
    var id = param + '?'
    url = appSettings.URL_GET_DETAIL_COMICS + id + appSettings.URL_API_KEY
    axios({
      method: 'get',
      url: url,
    })
      .then(function(response) {
        callbackProp.IsHttpError = false
        callbackProp.HttpErrorMessage = ''
        callbackProp.ResponseData = response
        callback(callbackProp)
      }).catch(e => {
      callbackProp.IsHttpError = true
      callbackProp.HttpErrorMessage = e
      callbackProp.ResponseData = ''
      callback(callbackProp)
    });
  },
}
