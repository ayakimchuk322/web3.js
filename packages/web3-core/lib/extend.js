/*
 This file is part of web3.js.

 web3.js is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 web3.js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @file extend.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */
const formatters = require('web3-core-helpers').formatters;
const Method = require('web3-core-method');
const utils = require('web3-utils');
const extend = (pckg) => {
    /* jshint maxcomplexity:5 */
    const ex = (extension) => {
        let extendedObject;
        if (extension.property) {
            if (!pckg[extension.property]) {
                pckg[extension.property] = {};
            }
            extendedObject = pckg[extension.property];
        }
        else {
            extendedObject = pckg;
        }
        if (extension.methods) {
            extension.methods.forEach((method) => {
                if (!(method instanceof Method)) {
                    method = new Method(method);
                }
                method.attachToObject(extendedObject);
                method.setRequestManager(pckg._requestManager);
            });
        }
        return pckg;
    };
    ex.formatters = formatters;
    ex.utils = utils;
    ex.Method = Method;
    return ex;
};
module.exports = extend;