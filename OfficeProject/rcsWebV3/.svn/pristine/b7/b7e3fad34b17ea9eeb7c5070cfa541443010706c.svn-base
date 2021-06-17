/**
 * Created by xiaohan on 2017/10/12.
 */

import {adminServer as basePath} from '../config/config';
import destination from './data/destination.js'
import userLogin from './data/login.js'

const Mock = require('mockjs');


Mock.mock(`${basePath}/destination/getDestination`, 'post', destination.getDestination);


Mock.mock(`${basePath}requestLogin`, 'post', userLogin.login);
