import {Router} from 'express';
import {apiStatus} from '../../../lib/util';
const Magento2Client = require('magento2-rest-client').Magento2Client

module.exports = ({ config }) => {
  let api = Router();
  api.get('/mpblog/posts/all/storeId/:storeId', (req, res) => {
    const client = Magento2Client(config.magento2.api);
    let url = '/mpblog/posts/' +
        '?searchCriteria[filter_groups][0][filters][0][field]=enabled' +
        '&searchCriteria[filter_groups][0][filters][0][value]=1' +
        '&searchCriteria[filter_groups][0][filters][0][condition_type]=in' +
        '&searchCriteria[filter_groups][0][filters][1][field]=store_ids' +
        '&searchCriteria[filter_groups][0][filters][1][value]=' + req.params.storeId +
        '&searchCriteria[filter_groups][0][filters][1][condition_type]=in';

    client.addMethods('sendMethod', (restClient) => {
      let module = {};
      module.getBlock = function () {
        return restClient.get(url);
      }
      return module;
    })
    client.sendMethod.getBlock().then((result) => {
      apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
    }).catch(err => {
      apiStatus(res, err, 500);
    });
  });
  api.get('/mpblog/posts/:size/storeId/:storeId', (req, res) => {
    const client = Magento2Client(config.magento2.api);
    let url = '/mpblog/posts/' +
        '?searchCriteria[filter_groups][0][filters][0][field]=enabled' +
        '&searchCriteria[filter_groups][0][filters][0][value]=1' +
        '&searchCriteria[filter_groups][0][filters][0][condition_type]=in' +
        '&searchCriteria[filter_groups][0][filters][1][field]=store_ids' +
        '&searchCriteria[filter_groups][0][filters][1][value]=' + req.params.storeId +
        '&searchCriteria[filter_groups][0][filters][1][condition_type]=in' +
        '&searchCriteria[page_size]='+ req.params.size +
        '&searchCriteria[sort_orders][0][field]=updated_at' +
        '&searchCriteria[sort_orders][0][direction]=DESC';

    client.addMethods('sendMethod', (restClient) => {
      let module = {};
      module.getBlock = function () {
        return restClient.get(url);
      }
      return module;
    })
    client.sendMethod.getBlock().then((result) => {
      apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
    }).catch(err => {
      apiStatus(res, err, 500);
    });
  });
  api.get('/mpblog/post/view/:id', (req, res) => {
    const client = Magento2Client(config.magento2.api);

    client.addMethods('sendMethod', (restClient) => {
      let module = {};
      module.getBlock = function () {
        return restClient.get('/mpblog/post/view/' + req.params.id);
      }
      return module;
    })
    client.sendMethod.getBlock().then((result) => {
      apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
    }).catch(err => {
      apiStatus(res, err, 500);
    });
  });
  return api;
};
