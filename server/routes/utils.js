"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var del = require("del");
var imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;
var loadCollection = function (colName, db) {
    return new Promise(function (resolve) {
        db.loadDatabase({}, function () {
            var _collection = db.getCollection(colName) || db.addCollection(colName);
            resolve(_collection);
        });
    });
};
exports.loadCollection = loadCollection;
var cleanFolder = function (folderPath) {
    // delete files inside folder but not the folder itself
    del.sync([folderPath + "/**", "!" + folderPath]);
};
exports.cleanFolder = cleanFolder;
//# sourceMappingURL=utils.js.map