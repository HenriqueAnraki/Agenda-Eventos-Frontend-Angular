import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from 'src/environments/environment';



/*
  Service to handle http request and local storage logic from UserFormComponent

*/
@Injectable()
export class UserFormService {
  private readonly endpoint = environment.apiEndpoint;

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) { }

  createAccount(credentials: any) {
    const graphqlQuery = gql`
      mutation ($createUserData: UserInput!) {
        createUser(data: $createUserData) {
          message
        }
      }
    `

    const variables = {
      createUserData: {
        email: credentials.email,
        password: credentials.password
      }
    }

    console.log(graphqlQuery)

    return this.apollo.mutate({
      mutation: graphqlQuery,
      variables
    })
    // return this.http.post(`${this.endpoint}/users`, credentials)
  }

  getUserIdByEmail(email: string){
    const graphqlQuery = gql`
      query User($email: String!) {
        user(email: $email) {
          _id
          email
        }
      }
    `

    const variables = {
      email
    }

    console.log(graphqlQuery)

    return this.apollo.query({
      query: graphqlQuery,
      variables
    })
    // return this.http.get(`${this.endpoint}/users/${email}`);
  }
}
