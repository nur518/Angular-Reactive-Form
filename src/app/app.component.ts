import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { PasswordValidators } from "./shared/password.validators";
import { forbiddenNameValidator } from "./shared/user-name.validators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Angular-Reactive-Form";

  // form model
  // registrationForm = new FormGroup({
  //   username: new FormControl(""),
  //   password: new FormControl(""),
  //   confirmPassword: new FormControl(""),
  //   address: new FormGroup({
  //     city: new FormControl(""),
  //     state: new FormControl(""),
  //     postalCode: new FormControl(""),
  //   }),
  // });

  // loadApiData() {
  //   //exact structure
  //   // this.registrationForm.setValue({
  //   //   username: "Bruce",
  //   //   password: "test",
  //   //   confirmPassword: "test",
  //   //   address: {
  //   //     city: "City",
  //   //     state: "State",
  //   //     postalCode: "123456",
  //   //   },
  //   // });

  //   // not strict about missing properties
  //   this.registrationForm.patchValue({
  //     username: "solim",
  //   });
  //   // console.log(this.registrationForm.value);
  // }

  // =====================================
  // Using Form Builder Services
  // =====================================

  constructor(private fb: FormBuilder) {}

  registrationForm: any = FormGroup;

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        username: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            forbiddenNameValidator(/admin/), // custome validator
          ],
        ], //array first item is default value
        password: ["", Validators.required], // array second item is validation-rule
        confirmPassword: [""],
        address: this.fb.group({
          city: [""],
          state: [""],
          postalCode: [""],
        }),
      },
      { validator: PasswordValidators } // cross field validation
    );
  }

  // getter for validation bit shorter
  get password() {
    return this.registrationForm.get("password");
  }

  test() {
    console.log(this.registrationForm);
  }
}
