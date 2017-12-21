"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var core_1 = require("@angular/core");
var slot_image_service_1 = require("../slot-image.service");
var util_service_1 = require("../util.service");
var ImageUploaderComponent = /** @class */ (function () {
    function ImageUploaderComponent(imageService, util) {
        this.imageService = imageService;
        this.util = util;
        this.uploadApiUrl = "/api/image/";
        this.readUrl = "/image/";
        this._imageNames = [];
        this.imageUrls = [];
        this.preview = true;
        this.imageNamesChange = new core_1.EventEmitter();
        this.uploadFinished = new core_1.EventEmitter();
    }
    Object.defineProperty(ImageUploaderComponent.prototype, "imageNames", {
        set: function (names) {
            var _this = this;
            this._imageNames = names || [];
            this.imageUrls = this._imageNames.map(function (x) { return _this.imageService.getImageUrl(x); });
        },
        enumerable: true,
        configurable: true
    });
    ImageUploaderComponent.prototype.ngOnInit = function () {
    };
    ImageUploaderComponent.prototype.onUploadFinishedCallback = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, filename, err;
            return __generator(this, function (_a) {
                resp = event.serverResponse;
                filename = resp.text();
                err = null;
                if (resp.status === 200) {
                    this._imageNames.push(filename);
                    this.imageNamesChange.emit(this._imageNames);
                    this.imageUrls.push(this.imageService.getImageUrl(filename));
                }
                else {
                    err = new Error(resp);
                }
                this.uploadFinished.emit(err);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageUploaderComponent.prototype, "preview", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], ImageUploaderComponent.prototype, "imageNames", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ImageUploaderComponent.prototype, "imageNamesChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ImageUploaderComponent.prototype, "uploadFinished", void 0);
    ImageUploaderComponent = __decorate([
        core_1.Component({
            selector: 'amb-image-uploader',
            templateUrl: './image-uploader.component.html',
            styleUrls: ['./image-uploader.component.css']
        }),
        __metadata("design:paramtypes", [slot_image_service_1.ImageService,
            util_service_1.UtilService])
    ], ImageUploaderComponent);
    return ImageUploaderComponent;
}());
exports.ImageUploaderComponent = ImageUploaderComponent;
//# sourceMappingURL=image-uploader.component.js.map