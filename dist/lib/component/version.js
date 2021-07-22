"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
var core = __importStar(require("@serverless-devs/core"));
var client_1 = __importDefault(require("../client"));
var logger_1 = __importDefault(require("../../common/logger"));
var utils_1 = require("../utils");
var lodash_1 = __importDefault(require("lodash"));
var VERSION_COMMAND = ['list', 'publish', 'remove', 'removeAll'];
var VERSION_COMMAND_HELP_KEY = {
    list: 'VersionListInputsArgs',
    publish: 'VersionPublishInputsArgs',
    remove: 'VersionDeleteInputsArgs',
    removeAll: 'VersionDeleteAllInputsArgs',
};
var Version = /** @class */ (function () {
    function Version(_a) {
        var region = _a.region, credentials = _a.credentials;
        client_1.default.setFcClient(region, credentials);
    }
    Version.handlerInputs = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, parsedData, rawData, subCommand, props, endProps, credentials;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        logger_1.default.debug("inputs.props: " + JSON.stringify(inputs.props));
                        parsedArgs = core.commandParse(inputs, {
                            boolean: ['help', 'table', 'y'],
                            string: ['region', 'service-name', 'description', 'id'],
                            alias: { help: 'h', 'version-id': 'id', 'assume-yes': 'y' },
                        });
                        parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        rawData = parsedData._ || [];
                        if (!rawData.length) {
                            return [2 /*return*/, { help: true, helpKey: 'VersionInputsArgs' }];
                        }
                        subCommand = rawData[0];
                        logger_1.default.debug("version subCommand: " + subCommand);
                        if (!VERSION_COMMAND.includes(subCommand)) {
                            return [2 /*return*/, {
                                    help: true,
                                    helpKey: 'VersionInputsArgs',
                                    errorMessage: "Does not support " + subCommand + " command",
                                }];
                        }
                        if (parsedData.help) {
                            return [2 /*return*/, { help: true, helpKey: VERSION_COMMAND_HELP_KEY[subCommand], subCommand: subCommand }];
                        }
                        props = inputs.props || {};
                        endProps = {
                            region: parsedData.region || props.region,
                            serviceName: parsedData['service-name'] || ((_a = props.service) === null || _a === void 0 ? void 0 : _a.name),
                            description: parsedData.description,
                            versionId: parsedData.id,
                            assumeYes: parsedData.y,
                        };
                        if (!endProps.region) {
                            throw new Error('Not fount region');
                        }
                        if (!endProps.serviceName) {
                            throw new Error('Not fount service name');
                        }
                        return [4 /*yield*/, utils_1.getCredentials(inputs.credentials, (_b = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 1:
                        credentials = _c.sent();
                        logger_1.default.debug("handler inputs props: " + JSON.stringify(endProps));
                        return [2 /*return*/, {
                                credentials: credentials,
                                subCommand: subCommand,
                                props: endProps,
                                table: parsedData.table,
                            }];
                }
            });
        });
    };
    Version.prototype.list = function (_a, table) {
        var serviceName = _a.serviceName;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Getting listVersions: " + serviceName);
                        return [4 /*yield*/, client_1.default.fcClient.get_all_list_data("/services/" + serviceName + "/versions", 'versions')];
                    case 1:
                        data = _b.sent();
                        if (table) {
                            utils_1.tableShow(data, ['versionId', 'description', 'createdTime', 'lastModifiedTime']);
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Version.prototype.publish = function (_a) {
        var serviceName = _a.serviceName, description = _a.description;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Creating service version: " + serviceName);
                        return [4 /*yield*/, client_1.default.fcClient.publishVersion(serviceName, description)];
                    case 1:
                        data = (_b.sent()).data;
                        logger_1.default.debug("publish version: " + JSON.stringify(data));
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Version.prototype.remove = function (_a) {
        var serviceName = _a.serviceName, versionId = _a.versionId;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!versionId) {
                            throw new Error('Not fount version');
                        }
                        logger_1.default.info("Removing service version: " + serviceName + "." + versionId);
                        return [4 /*yield*/, client_1.default.fcClient.deleteVersion(serviceName, versionId)];
                    case 1:
                        res = _b.sent();
                        logger_1.default.debug("delete version: " + JSON.stringify(res));
                        return [2 /*return*/];
                }
            });
        });
    };
    Version.prototype.removeAll = function (_a) {
        var serviceName = _a.serviceName, assumeYes = _a.assumeYes;
        return __awaiter(this, void 0, void 0, function () {
            var listData, meg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.list({ serviceName: serviceName })];
                    case 1:
                        listData = _b.sent();
                        if (!assumeYes) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.forDeleteVersion(serviceName, listData)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        if (!!lodash_1.default.isEmpty(listData)) return [3 /*break*/, 6];
                        utils_1.tableShow(listData, ['versionId', 'description', 'createdTime', 'lastModifiedTime']);
                        meg = "Version configuration exists under service " + serviceName + ", whether to delete all version resources";
                        return [4 /*yield*/, utils_1.promptForConfirmOrDetails(meg)];
                    case 4:
                        if (!_b.sent()) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.forDeleteVersion(serviceName, listData)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Version.prototype.forDeleteVersion = function (serviceName, listData) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, listData_1, versionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, listData_1 = listData;
                        _a.label = 1;
                    case 1:
                        if (!(_i < listData_1.length)) return [3 /*break*/, 4];
                        versionId = listData_1[_i].versionId;
                        return [4 /*yield*/, this.remove({ serviceName: serviceName, versionId: versionId })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Version;
}());
exports.default = Version;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50L3ZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLDBEQUE4QztBQUU5QyxxREFBK0I7QUFDL0IsK0RBQXlDO0FBQ3pDLGtDQUFnRjtBQUNoRixrREFBdUI7QUFhdkIsSUFBTSxlQUFlLEdBQWEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM3RSxJQUFNLHdCQUF3QixHQUFHO0lBQy9CLElBQUksRUFBRSx1QkFBdUI7SUFDN0IsT0FBTyxFQUFFLDBCQUEwQjtJQUNuQyxNQUFNLEVBQUUseUJBQXlCO0lBQ2pDLFNBQVMsRUFBRSw0QkFBNEI7Q0FDeEMsQ0FBQztBQUVGO0lBMERFLGlCQUFZLEVBQXNFO1lBQXBFLE1BQU0sWUFBQSxFQUFFLFdBQVcsaUJBQUE7UUFDL0IsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUEzRFkscUJBQWEsR0FBMUIsVUFBMkIsTUFBTTs7Ozs7Ozt3QkFDL0IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsbUJBQWlCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUM7d0JBRXhELFVBQVUsR0FBeUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7NEJBQ2pFLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDOzRCQUMvQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUM7NEJBQ3ZELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUs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