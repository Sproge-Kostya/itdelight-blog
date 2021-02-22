import {Router} from 'express';
import {apiStatus} from '../../../lib/util';
const Magento2Client = require('magento2-rest-client').Magento2Client

module.exports = ({ config }) => {
  let api = Router();
  api.get('/mpblog/post', (req, res) => {
    const client = Magento2Client(config.magento2.api);

    client.addMethods('sendMethod', (restClient) => {
      let module = {};
      module.getBlock = function () {
        return restClient.get('/mpblog/post');
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
