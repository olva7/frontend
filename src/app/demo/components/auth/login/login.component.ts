import { AppUser } from './../../../api/user';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/demo/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import Swal from 'sweetalert2';
const phoneNumberPattern = /^[0-9]+$/;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`

@import url("https://fonts.googleapis.com/css?family=Fira+Sans");

html,body {
	position: relative;
	min-height: 100vh;
	background-color: #E1E8EE;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.form-structor {
	background-color: #222;
	border-radius: 15px;
	height: 550px;
	width: 350px;
	position: relative;
	overflow: hidden;

	&::after {
		content: '';
		opacity: .8;
		position: absolute;
		top: 0;right:0;bottom:0;left:0;
		background-repeat: no-repeat;
		background-position: left bottom;
		background-size: 500px;
		background-image: url('https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bf884ad570b50659c5fa2dc2cfb20ecf&auto=format&fit=crop&w=1000&q=100');
	}

	.signup {
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		width: 65%;
		z-index: 5;
		-webkit-transition: all .3s ease;


		&.slide-up {
			top: 5%;
			-webkit-transform: translate(-50%, 0%);
			-webkit-transition: all .3s ease;
		}

		&.slide-up .form-holder,
		&.slide-up .submit-btn {
			opacity: 0;
			visibility: hidden;
		}

		&.slide-up .form-title {
			font-size: 1em;
			cursor: pointer;
		}

		&.slide-up .form-title span {
			margin-right: 5px;
			opacity: 1;
			visibility: visible;
			-webkit-transition: all .3s ease;
		}

		.form-title {
			color: #fff;
			font-size: 1.7em;
			text-align: center;

			span {
				color: rgba(0,0,0,0.4);
				opacity: 0;
				visibility: hidden;
				-webkit-transition: all .3s ease;
			}
		}

		.form-holder {
			border-radius: 15px;
			background-color: #fff;
			overflow: hidden;
			margin-top: 50px;
			opacity: 1;
			visibility: visible;
			-webkit-transition: all .3s ease;

			.input {
				border: 0;
				outline: none;
				box-shadow: none;
				display: block;
				height: 30px;
				line-height: 30px;
				padding: 8px 15px;
				border-bottom: 1px solid #eee;
				width: 100%;
				font-size: 12px;

				&:last-child {
					border-bottom: 0;
				}
				&::-webkit-input-placeholder {
					color: rgba(0,0,0,0.4);
				}
			}
		}

		.submit-btn {
			background-color: rgba(0,0,0,0.4);
			color: rgba(256,256,256,0.7);
			border:0;
			border-radius: 15px;
			display: block;
			margin: 15px auto;
			padding: 15px 45px;
			width: 100%;
			font-size: 13px;
			font-weight: bold;
			cursor: pointer;
			opacity: 1;
			visibility: visible;
			-webkit-transition: all .3s ease;

			&:hover {
				transition: all .3s ease;
				background-color: rgba(0,0,0,0.8);
			}
		}
	}

	.login {
		position: absolute;
		top: 20%;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 5;
		-webkit-transition: all .3s ease;

		&::before {
			content: '';
			position: absolute;
			left: 50%;
			top: -20px;
			-webkit-transform: translate(-50%, 0);
			background-color: #fff;
			width: 200%;
			height: 250px;
			border-radius: 50%;
			z-index: 4;
			-webkit-transition: all .3s ease;
		}

		.center {
			position: absolute;
			top: calc(50% - 10%);
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			width: 65%;
			z-index: 5;
			-webkit-transition: all .3s ease;

			.form-title {
				color: #000;
				font-size: 1.7em;
				text-align: center;

				span {
					color: rgba(0,0,0,0.4);
					opacity: 0;
			    visibility: hidden;
				  -webkit-transition: all .3s ease;
				}
			}

			.form-holder {
				border-radius: 15px;
				background-color: #fff;
				border: 1px solid #eee;
				overflow: hidden;
				margin-top: 50px;
				opacity: 1;
				visibility: visible;
				-webkit-transition: all .3s ease;

				.input {
					border: 0;
					outline: none;
					box-shadow: none;
					display: block;
					height: 30px;
					line-height: 30px;
					padding: 8px 15px;
					border-bottom: 1px solid #eee;
					width: 100%;
					font-size: 12px;

					&:last-child {
						border-bottom: 0;
					}
					&::-webkit-input-placeholder {
						color: rgba(0,0,0,0.4);
					}
				}
			}

			.submit-btn {
				background-color: #6B92A4;
				color: rgba(256,256,256,0.7);
				border:0;
				border-radius: 15px;
				display: block;
				margin: 15px auto;
				padding: 15px 45px;
				width: 100%;
				font-size: 13px;
				font-weight: bold;
				cursor: pointer;
				opacity: 1;
				visibility: visible;
				-webkit-transition: all .3s ease;

				&:hover {
					transition: all .3s ease;
					background-color: rgba(0,0,0,0.8);
				}
			}
		}

		&.slide-up {
			top: 90%;
			-webkit-transition: all .3s ease;
		}

		&.slide-up .center {
			top: 10%;
			-webkit-transform: translate(-50%, 0%);
			-webkit-transition: all .3s ease;
		}

		&.slide-up .form-holder,
		&.slide-up .submit-btn {
			opacity: 0;
			visibility: hidden;
			-webkit-transition: all .3s ease;
		}

		&.slide-up .form-title {
			font-size: 1em;
			margin: 0;
			padding: 0;
			cursor: pointer;
			-webkit-transition: all .3s ease;
		}

		&.slide-up .form-title span {
			margin-right: 5px;
			opacity: 1;
			visibility: visible;
			-webkit-transition: all .3s ease;
		}
	}
}
/* login.component.css */
.slide-up {
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
}

    `]
})
//const phoneNumberPattern = /^[0-9]+$/;
export class LoginComponent {

    signupForm = new FormGroup({
        firstname: new FormControl('', [Validators.required, Validators.minLength(3)]), // Add Validators as needed
        lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),

        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
       // phoneNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(phoneNumberPattern) ]),


      });

      loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    valCheck: string[] = ['remember'];

    password!: string;
    loginIsSlidUp: boolean = false;
    signupIsSlidUp: boolean = false;
    currentUser: any;


    constructor(public layoutService: LayoutService,public service:UserService, private router: Router) { }
    ngOnInit() {
        this.currentUser = this.service.getCurrentUser();
        localStorage.removeItem("token")
      }
    toggleSlide(form: string): void {
        if (form === 'login') {
          this.loginIsSlidUp = !this.loginIsSlidUp;
          this.signupIsSlidUp = false; // Optionally hide the other form
        } else if (form === 'signup') {
          this.signupIsSlidUp = !this.signupIsSlidUp;
          this.loginIsSlidUp = false; // Optionally hide the other form
        }
      }
      logining() {
        // First, check if the form is valid
        if (this.loginForm.invalid) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please fill out the form correctly.',
                confirmButtonText: 'OK'
            });
            return; // Stop execution if the form is invalid
        }

        // Prepare credentials from the form values
        const credentials = {
            email: this.loginForm.value.email!,
            motdepasse: this.loginForm.value.password!
        };

        // Execute the authentication request
        this.service.authenticate(credentials).subscribe(
            (response) => {
                console.log("Authentication successful:", response);
                // Store the token in localStorage
                localStorage.setItem("token", response.token);


            },
            (error) => {
                console.error('Error during login:', error);
                let errorMessage = 'An error occurred during login. Please try again.';
                if (error.status === 403) {
                    errorMessage = 'Access Denied. You might not have permission to access this resource or your credentials are incorrect.';
                } else if (error.status === 401) {
                    errorMessage = 'Invalid credentials. Please check your username and password.';
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: errorMessage,
                    confirmButtonText: 'OK'
                });
            }
        );
    }

      /*logining() {
        const credentials = {
            email: this.loginForm.value.email!, // Asserting non-null
            motdepasse: this.loginForm.value.password!
        };
        console.log(credentials,'credentials')

        this.service.authenticate(credentials).subscribe(
          (response) => {
            console.log(response)
            // Vérifiez la réponse renvoyée par le backend
            if (response && response.token) {
              // Si le backend renvoie un token dans la réponse, cela signifie que l'authentification a réussi
              // Vous pouvez maintenant vérifier le contenu du token pour déterminer le rôle de l'utilisateur

              localStorage.setItem("token", response.token); // Stocker le token dans le local storage ici

              //if (response.role === 'admin') {
                // Redirection vers l'interface d'administration
                // Utilisez le routeur Angular pour effectuer cette redirection
                 this.router.navigate(['/landing']);
               /* console.log("Rediriger vers l'interface d'administration");
              } else {
                if (response.role === 'concessionnaire') {
                  // Redirection vers l'interface de concessionnaire
                  this.router.navigate(['/concessionnaire']);
                }
                console.log("Rediriger vers l'interface Concessionnaire");
              }
            } else {
              // Gérer les autres cas de réponse du backend, comme les erreurs d'authentification
              console.error("Réponse invalide du backend");
            }
            const token = response.token; // Supposons que votre réponse contient un champ 'token'
            this.service.setToken(token); // Stocker le token dans le local storage
            this.service.setToken(response.token);
            // Vous pouvez également rediriger l'utilisateur vers une autre page ici
          },
          (error) => {
            // Gérer les erreurs de connexion
            console.error('Erreur lors de la connexion :', error);
          }
        );
      }*/




      toggleForm(event: any) {
        const element = event.target.closest('.form-structor > div');
        if (!element.classList.contains('slide-up')) {
          element.classList.add('slide-up');
        } else {
          element.classList.remove('slide-up');
        }
      }
      /*register(){
        if (this.signupForm.valid){
            console.log('Registration data:',this.signupForm.value);
            this.service.register(this.signupForm.value).subscribe((response) => {

        })}else{
            console.error('Signup form is not valid:', this.signupForm.errors)
        }
      }*/
      register(): void {
        if (this.signupForm.valid) {
            this.service.register(this.signupForm.value).subscribe(
                (response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Inscription réussie',
                        text: 'Vous pouvez maintenant vous connecter avec vos identifiants..',
                        confirmButtonText: 'OK'
                    });
                    // Optionally reset the form or redirect the user
                    this.signupForm.reset();
                    this.router.navigate(['/landing']);
                },
                (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: 'Please check the provided information.',
                        confirmButtonText: 'OK'
                    });
                }
            );
        }
    }

    /*login() {
        this.service.login(this.loginForm.value).subscribe(

          (response) => {
            console.log("Response:", response);

            if (response.access_token) {
              Swal.fire({
                icon: 'success',
                title: 'Hello!',
                text: `Welcome, ${response.email}!`,
                confirmButtonText: 'OK',
              }).then(() => {
                try {
                  localStorage.setItem('jwt', response.token);
                  localStorage.setItem('user', JSON.stringify({email: response.email})); // Storing user details
                  this.router.navigate(['/landing']);
                } catch (error) {
                  console.error('Error setting JWT in local storage:', error);
                }
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Incorrect username or password',
                confirmButtonText: 'OK',
              });
            }
          },
          (error) => {
            console.error('Login error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Incorrect username or password',
              confirmButtonText: 'OK',
            });
          }
        );
      }*/

      login() {
        this.service.login(this.loginForm.value).subscribe(
          (response) => {
            console.log("this:",response);
            if (response.access_token) {
              Swal.fire({
                icon: 'success',
                title: 'réussie!',
                text: `Bienvenue, Olfa!`,
                confirmButtonText: 'OK',
              }).then(() => {
                try {
                  localStorage.setItem('jwt', response.access_token);
                  this.router.navigate(['/landing']);
                } catch (error) {
                  console.error('Error setting JWT in local storage:', error);
                }
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Incorrect username or password',
                confirmButtonText: 'OK',
              });
            }
          },
          (error) => {
            console.error('Login error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Incorrect username or password',
              confirmButtonText: 'OK',
            });
          }
        );
      }




}
