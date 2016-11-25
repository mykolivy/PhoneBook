import { Injectable } from '@angular/core';

import { Person } from '../entities/EntityBase';

@Injectable()
export class SessionService {
    private user: Person;

    public getUser()
    {
        return this.user;
    }

    public setUser(user: Person)
    {
        this.user = user;
    }
}