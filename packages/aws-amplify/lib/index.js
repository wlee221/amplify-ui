"use strict";
/*
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Amplify = exports.withSSRContext = exports.ServiceWorker = exports.I18n = exports.Signer = exports.ClientDevice = exports.JS = exports.Hub = exports.Logger = exports.Predictions = exports.XR = exports.Interactions = exports.Cache = exports.PubSub = exports.syncExpression = exports.SortDirection = exports.Predicates = exports.DataStore = exports.AuthModeStrategyType = exports.graphqlOperation = exports.APIClass = exports.API = exports.StorageClass = exports.Storage = exports.Auth = exports.AmazonPersonalizeProvider = exports.AWSKinesisFirehoseProvider = exports.AWSKinesisProvider = exports.AWSPinpointProvider = exports.Analytics = void 0;
var core_1 = require("@aws-amplify/core");
Object.defineProperty(exports, "Amplify", { enumerable: true, get: function () { return core_1.Amplify; } });
var auth_1 = require("@aws-amplify/auth");
var cache_1 = __importDefault(require("@aws-amplify/cache"));
/** Always importing Auth when users import Amplify such that
    for unauthenticated access (no sign in and sign up),
    users don't have to import Auth explicitly **/
core_1.Amplify.Auth = auth_1.Auth;
core_1.Amplify.Cache = cache_1.default;
core_1.Amplify.ServiceWorker = core_1.ServiceWorker;
var analytics_1 = require("@aws-amplify/analytics");
Object.defineProperty(exports, "Analytics", { enumerable: true, get: function () { return analytics_1.Analytics; } });
Object.defineProperty(exports, "AWSPinpointProvider", { enumerable: true, get: function () { return analytics_1.AWSPinpointProvider; } });
Object.defineProperty(exports, "AWSKinesisProvider", { enumerable: true, get: function () { return analytics_1.AWSKinesisProvider; } });
Object.defineProperty(exports, "AWSKinesisFirehoseProvider", { enumerable: true, get: function () { return analytics_1.AWSKinesisFirehoseProvider; } });
Object.defineProperty(exports, "AmazonPersonalizeProvider", { enumerable: true, get: function () { return analytics_1.AmazonPersonalizeProvider; } });
var auth_2 = require("@aws-amplify/auth");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return auth_2.Auth; } });
var storage_1 = require("@aws-amplify/storage");
Object.defineProperty(exports, "Storage", { enumerable: true, get: function () { return storage_1.Storage; } });
Object.defineProperty(exports, "StorageClass", { enumerable: true, get: function () { return storage_1.StorageClass; } });
var api_1 = require("@aws-amplify/api");
Object.defineProperty(exports, "API", { enumerable: true, get: function () { return api_1.API; } });
Object.defineProperty(exports, "APIClass", { enumerable: true, get: function () { return api_1.APIClass; } });
Object.defineProperty(exports, "graphqlOperation", { enumerable: true, get: function () { return api_1.graphqlOperation; } });
var datastore_1 = require("@aws-amplify/datastore");
Object.defineProperty(exports, "AuthModeStrategyType", { enumerable: true, get: function () { return datastore_1.AuthModeStrategyType; } });
Object.defineProperty(exports, "DataStore", { enumerable: true, get: function () { return datastore_1.DataStore; } });
Object.defineProperty(exports, "Predicates", { enumerable: true, get: function () { return datastore_1.Predicates; } });
Object.defineProperty(exports, "SortDirection", { enumerable: true, get: function () { return datastore_1.SortDirection; } });
Object.defineProperty(exports, "syncExpression", { enumerable: true, get: function () { return datastore_1.syncExpression; } });
var pubsub_1 = require("@aws-amplify/pubsub");
Object.defineProperty(exports, "PubSub", { enumerable: true, get: function () { return pubsub_1.PubSub; } });
var cache_2 = require("@aws-amplify/cache");
Object.defineProperty(exports, "Cache", { enumerable: true, get: function () { return __importDefault(cache_2).default; } });
var interactions_1 = require("@aws-amplify/interactions");
Object.defineProperty(exports, "Interactions", { enumerable: true, get: function () { return interactions_1.Interactions; } });
__exportStar(require("@aws-amplify/ui"), exports);
var xr_1 = require("@aws-amplify/xr");
Object.defineProperty(exports, "XR", { enumerable: true, get: function () { return xr_1.XR; } });
var predictions_1 = require("@aws-amplify/predictions");
Object.defineProperty(exports, "Predictions", { enumerable: true, get: function () { return predictions_1.Predictions; } });
var core_2 = require("@aws-amplify/core");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return core_2.ConsoleLogger; } });
Object.defineProperty(exports, "Hub", { enumerable: true, get: function () { return core_2.Hub; } });
Object.defineProperty(exports, "JS", { enumerable: true, get: function () { return core_2.JS; } });
Object.defineProperty(exports, "ClientDevice", { enumerable: true, get: function () { return core_2.ClientDevice; } });
Object.defineProperty(exports, "Signer", { enumerable: true, get: function () { return core_2.Signer; } });
Object.defineProperty(exports, "I18n", { enumerable: true, get: function () { return core_2.I18n; } });
Object.defineProperty(exports, "ServiceWorker", { enumerable: true, get: function () { return core_2.ServiceWorker; } });
var withSSRContext_1 = require("./withSSRContext");
Object.defineProperty(exports, "withSSRContext", { enumerable: true, get: function () { return withSSRContext_1.withSSRContext; } });
/**
 * @deprecated use named import
 */
exports.default = core_1.Amplify;
//# sourceMappingURL=index.js.map