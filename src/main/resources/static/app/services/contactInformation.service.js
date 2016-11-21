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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var ContactInformation_1 = require('../entities/ContactInformation');
var ContactInformationService = (function () {
    function ContactInformationService(http) {
        this.http = http;
    }
    ContactInformationService.prototype.getPhones = function (email) {
        return this.getAllContactInforamationByUserEmail(email, "phone");
    };
    ContactInformationService.prototype.getEmails = function (email) {
        return this.getAllContactInforamationByUserEmail(email, "email");
    };
    ContactInformationService.prototype.getAddresses = function (email) {
        return this.getAllContactInforamationByUserEmail(email, "address");
    };
    ContactInformationService.prototype.add = function (contactInformation) {
        var request = this.formRequest(contactInformation, http_1.RequestMethod.Post);
        return this.http.request(request)
            .map(function (response) { return response.text; })
            .catch(function (error) { return error; });
    };
    ContactInformationService.prototype.remove = function (contactInformation) {
        var request = this.formRequest(contactInformation, http_1.RequestMethod.Delete);
        return this.http.request(request)
            .map(function (response) { return response.text; })
            .catch(function (error) { return error; });
    };
    ContactInformationService.prototype.formRequest = function (contactInformation, method) {
        alert(JSON.stringify(contactInformation));
        var headers = new http_1.Headers();
        headers.append("Content-Type", 'application/json');
        var requestOptions = new http_1.RequestOptions({
            method: method,
            url: 'service/contact-information',
            headers: headers,
            body: JSON.stringify(contactInformation)
        });
        return new http_1.Request(requestOptions);
    };
    ContactInformationService.prototype.getAllContactInforamationByUserEmail = function (email, path) {
        return this.http.get('service/contact-information/' + path + '/' + email + '/')
            .map(function (response) { return response.json(); })
            .catch(function (error) { return error; });
    };
    ContactInformationService.prototype.determineTypeProperty = function (instance) {
        if (instance instanceof ContactInformation_1.Phone)
            return "phone";
        else if (instance instanceof ContactInformation_1.Email)
            return "email";
        else if (instance instanceof ContactInformation_1.Address)
            return "address";
    };
    ContactInformationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ContactInformationService);
    return ContactInformationService;
}());
exports.ContactInformationService = ContactInformationService;
//# sourceMappingURL=contactInformation.service.js.map