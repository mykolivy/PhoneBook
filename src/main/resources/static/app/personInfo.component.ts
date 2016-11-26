import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { EntityBase, Person, Company } from './entities/EntityBase';
import { ContactInformation, Phone, Email, Address } from './entities/ContactInformation';
import { UserService } from './services/user.service';
import { SessionService } from './services/session.service';
import { ContactInformationService } from './services/contactInformation.service';

@Component({
    moduleId : module.id,
    selector: 'person-info',
    templateUrl: './templates/person-info.component.html'
})
export class PersonInfoComponent implements OnInit
{
    user: EntityBase = new Person();

    phones: Phone[];
    emails: Email[];
    addresses: Address[];

    constructor(
        private userService: UserService,
        private contactInformationService: ContactInformationService, 
        private session: SessionService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void 
    {
        this.route.params.forEach((params: Params) => {
            let email = params['email'];
            this.userService.get(email).subscribe(
                response => {
                    this.user = response;
                    this.getContactInformation();
                },
                error =>  this.handleError);
        });
        
    }

    private getContactInformation(): void
    {
        this.contactInformationService.getPhones(this.user.email).subscribe(
            response => this.phones = response,
            error => this.handleError(error));
        
        this.contactInformationService.getEmails(this.user.email).subscribe(
            response => this.emails = response,
            error => this.handleError(error));
        
        this.contactInformationService.getAddresses(this.user.email).subscribe(
            response => this.addresses = response,
            error => this.handleError(error));
    }

    private handleError(error: any): void
    {
        //alert(error);
    }

    goBack(): void {
        this.location.back();
    }
}