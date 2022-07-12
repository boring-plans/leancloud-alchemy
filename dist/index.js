"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var AV = require("leancloud-storage");
var createRow = function (table, columns) {
    var row = new (AV.Object.extend(table))();
    Object.keys(columns).forEach(function (k) {
        row.set(k, columns[k]);
    });
    return row.save();
};
var createRows = function (table, rows) {
    return AV.Object.saveAll(rows.map(function (columns) {
        var row = new (AV.Object.extend(table))();
        Object.keys(columns).forEach(function (k) {
            row.set(k, columns[k]);
        });
        return row;
    }));
};
var updateRow = function (table, id, columns) {
    var row = AV.Object.createWithoutData(table, id);
    Object.keys(columns).forEach(function (k) {
        row.set(k, columns[k]);
    });
    return row.save();
};
var updateRows = function (table, idColumnsList) {
    AV.Object.saveAll(idColumnsList.map(function (_a) {
        var id = _a[0], columns = _a[1];
        var row = AV.Object.createWithoutData(table, id);
        Object.keys(columns).forEach(function (k) {
            row.set(k, columns[k]);
        });
        return row;
    }));
};
var getRow = function (table, id) {
    try {
        return new AV.Query(table).get(id);
    }
    catch (_a) {
        return Promise.resolve(null);
    }
};
var getRows = function (table, ids) {
    try {
        return new AV.Query(table).containedIn("objectId", ids).find();
    }
    catch (_a) {
        return Promise.resolve([]);
    }
};
var getRowsBy = function (table, key, value) {
    var _a;
    if (value === void 0) { value = ''; }
    try {
        var keyValueList = void 0;
        if (key instanceof Array) {
            keyValueList = key;
        }
        else {
            keyValueList = [[key, value]];
        }
        return (_a = AV.Query).and.apply(_a, keyValueList.map(function (_a) {
            var key = _a[0], value = _a[1];
            var query = new AV.Query(table);
            query.equalTo(key, value);
            return query;
        })).find();
    }
    catch (_b) {
        return Promise.resolve([]);
    }
};
var getRowsContainedIn = function (table, key, values) {
    var _a;
    if (values === void 0) { values = []; }
    try {
        var keyValuesList = void 0;
        if (key instanceof Array) {
            keyValuesList = key;
        }
        else {
            keyValuesList = [[key, values]];
        }
        return (_a = AV.Query).and.apply(_a, keyValuesList.map(function (_a) {
            var k = _a[0], vs = _a[1];
            var query = new AV.Query(table);
            query.containedIn(k, vs);
            return query;
        })).find();
    }
    catch (_b) {
        return Promise.resolve([]);
    }
};
var getSomeRows = function (table, num, sortBy, desc) {
    if (sortBy === void 0) { sortBy = null; }
    if (desc === void 0) { desc = false; }
    try {
        var query = new AV.Query(table).limit(num);
        return sortBy ? desc ? query.descending(sortBy).find() : query.ascending(sortBy).find() : query.find();
    }
    catch (_a) {
        return Promise.resolve([]);
    }
};
var deleteRow = function (table, id) {
    var row = AV.Object.createWithoutData(table, id);
    row.destroy();
};
var deleteRows = function (table, ids) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRows(table, ids)];
            case 1:
                rows = _a.sent();
                AV.Object.destroyAll(rows);
                return [2 /*return*/];
        }
    });
}); };
var deleteRowsBy = function (table, key, value) {
    if (value === void 0) { value = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRowsBy(table, key, value)];
                case 1:
                    rows = _a.sent();
                    AV.Object.destroyAll(rows);
                    return [2 /*return*/];
            }
        });
    });
};
var deleteRowsContainedIn = function (table, key, values) {
    if (values === void 0) { values = []; }
    return __awaiter(void 0, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRowsContainedIn(table, key, values)];
                case 1:
                    rows = _a.sent();
                    AV.Object.destroyAll(rows);
                    return [2 /*return*/];
            }
        });
    });
};
var initAV = function (appId, appKey) {
    if (!AV.applicationId) {
        try {
            AV.init({ appId: appId, appKey: appKey });
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(!!AV.applicationId);
                }, 2000);
            });
        }
        catch (err) {
            return new Promise(function (resolve) {
                resolve(err);
            });
        }
    }
    return new Promise(function (resolve) {
        resolve(true);
    });
};
exports.default = {
    createRow: createRow,
    createRows: createRows,
    getRow: getRow,
    getRows: getRows,
    getRowsBy: getRowsBy,
    getSomeRows: getSomeRows,
    getRowsContainedIn: getRowsContainedIn,
    updateRow: updateRow,
    updateRows: updateRows,
    deleteRow: deleteRow,
    deleteRows: deleteRows,
    deleteRowsBy: deleteRowsBy,
    deleteRowsContainedIn: deleteRowsContainedIn,
    initAV: initAV,
};
