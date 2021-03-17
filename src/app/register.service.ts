import { Injectable } from '@angular/core';
import { User } from './register/register.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  addUser(email: string, password: string, imageBase64: string){

    const user: User = {email: email, password: password, image: imageBase64};

    this.http.post("https://localhost:44341/api/users", user).subscribe(
      (res: Response) => {

        console.log("success");

      },

      err =>{

        if(err.status == 400){

          alert(err.error)

        }

      }

    );

  }

}
