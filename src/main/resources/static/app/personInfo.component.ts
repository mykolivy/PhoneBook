import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Person } from './entities/Person';
import { ContactInformation, Phone, Email, Address } from './entities/ContactInformation';
import { PersonService } from './services/person.service';
import { SessionService } from './services/session.service';
import { ContactInformationService } from './services/contactInformation.service';

@Component({
    moduleId : module.id,
    selector: 'person-info',
    templateUrl: './templates/person-info.component.html'
})
export class PersonInfoComponent implements OnInit
{
    person: Person = new Person();
    errorMessage: string;

    phones: Phone[];
    emails: Email[];
    addresses: Address[];

    constructor(
        private personService: PersonService,
        private contactInformationService: ContactInformationService, 
        private session: SessionService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void 
    {
        this.route.params.forEach((params: Params) => {
            let email = params['email'];
            this.personService.getPerson(email).subscribe(
                response => {
                    this.person = response;
                    this.getContactInformation();
                },
                error =>  this.handleError);
        });
        
    }

    private getContactInformation(): void
    {
        this.contactInformationService.getPhones(this.person.email).subscribe(
            response => this.phones = response,
            error => this.errorMessage = error);
        this.contactInformationService.getEmails(this.person.email).subscribe(
            response => this.emails = response,
            error => this.handleError(error)
        );
        this.contactInformationService.getAddresses(this.person.email).subscribe(
            response => this.addresses = response,
            error => this.handleError(error)
        );
    }

    private handleError(error: any): void
    {
        alert(error);
    }

    goBack(): void {
        this.location.back();
    }
}