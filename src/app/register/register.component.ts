import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm : FormGroup;
  submitted = false;
  uploadError: string;
  imageBase64: string;
  isImageSaved: boolean;

  allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

  //fix to show filename on input
  @ViewChild('labelImport')
  labelImport: ElementRef;

  //for password strength meter
  public account = {
    password: null
  };
  public barLabel: string = "Password strength:";

  onFileChange(event){

    this.labelImport.nativeElement.innerText = event.target.files[0].name;

    this.uploadError = null;

    if(event.target.files && event.target.files[0]){

      if(!_.includes(this.allowed_types, event.target.files[0].type)){

        this.uploadError = 'Only Images are allowed ( JPG | PNG )';
        return false;

      }

      const reader = new FileReader();

      reader.onload = (e: any) => {

        const image = new Image();
        image.src = e.target.result;

        const imageBase64Path = e.target.result;
        this.imageBase64 = imageBase64Path;
        this.isImageSaved = true;

        //image's base64 string
        console.log(this.imageBase64)

      }

      reader.readAsDataURL(event.target.files[0]);

    }

  }

  removeImage() {
    this.imageBase64 = null;
}

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      email: ["", [Validators.required, Validators.email]],
      password: ["",[Validators.required]],
      imageUpload: ["", Validators.required]

    })

  }

  //getter for form fields
  get formFields() { return this.loginForm.controls; }

  onSubmit(){

    this.submitted = true;

    if(this.loginForm.invalid){

      return;

    }

    console.log("submitted without error")

  }

}
