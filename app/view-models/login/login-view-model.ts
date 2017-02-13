import { Observable } from 'data/observable';
import * as firebase from "nativescript-plugin-firebase";
import * as frame from "ui/frame";
import * as dialogs from "ui/dialogs";
import { User } from "../../models/login/user";
import * as appSettings from "application-settings";

export class AuthViewModel extends Observable {

    private _email: string = "";
    private _pass: string = "";
    private _newEmail: string = "";
    private _newPass: string = "";
    private _isFormVisible: boolean;

    private  _currentUser: User;

    constructor() {
        super();

        this.isFormVisible = true;
        this.getCurrentUser();
    }

    public get isFormVisible() {
        return this._isFormVisible;
    }


    public set isFormVisible(value: boolean) {
        if (this._isFormVisible !== value) {
            this._isFormVisible = value;
            this.notifyPropertyChange("isFormVisible", value);
        }
    }

    public get email() {
        return this._email;
    }

    public set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange("email", value);
        }
    }

    public get pass() {
        return this._pass;
    }

    public set pass(value: string) {
        if (this._pass !== value) {
            this._pass = value;
            this.notifyPropertyChange("pass", value);
        }
    }

    public get newEmail() {
        return this._newEmail;
    }

    public set newEmail(value: string) {
        if (this._newEmail !== value) {
            this._newEmail = value;
            this.notifyPropertyChange("newEmail", value);
        }
    }

    public get newPass() {
        return this._newPass;
    }

    public set newPass(value: string) {
        if (this._newPass !== value) {
            this._newPass = value;
            this.notifyPropertyChange("newPass", value);
        }
    }

    public get currentUser() {
        return this._currentUser;
    }

    public set currentUser(value: User) {
        if (this._currentUser !== value) {
            this._currentUser = value;
            this.notifyPropertyChange("currentUser", value);
        }
    }

    // for all login methods
    public getCurrentUser() {
        firebase.getCurrentUser().then(user => {
            console.log("User uid: " + user.uid);
            this.currentUser = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
        }).catch(err => {
            dialogs.alert(err);
        })
    }

    // FACEBOOK login
    public onFacebookLogin() {
        if (appSettings.getBoolean("isLogged")) {
            firebase.logout().then(() => {
                firebase.login({
                    type: firebase.LoginType.FACEBOOK,
                    scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
                }).then(user => {
                    this.navigateWithContext(user, "views/drawer-page");
                }).catch(err => {
                    dialogs.alert(err);
                });
            })
        } else {
            firebase.login({
                type: firebase.LoginType.FACEBOOK,
                scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
            }).then(user => {
                this.navigateWithContext(user, "views/drawer-page");
            }).catch(err => {
                dialogs.alert(err);
            })          
        }
    }

    // GOOGLE login
    public onGoogleLogin() {
        if (appSettings.getBoolean("isLogged")) {
            firebase.logout().then(() => {
                firebase.login({
                    type: firebase.LoginType.GOOGLE,
                }).then(user => {
                    this.navigateWithContext(user, "views/drawer-page");
                }).catch(err => {
                    dialogs.alert(err);
                })
            })
        } else {
            firebase.login({
                type: firebase.LoginType.GOOGLE,
            }).then(user => {
                this.navigateWithContext(user, "views/drawer-page");
            }).catch(err => {
                dialogs.alert(err);
            })          
        }
    }

    // ANONYMOUS login
    public onAnonymousLogin() {
        if (appSettings.getBoolean("isLogged")) {
            firebase.logout().then(() => {
                firebase.login({
                    type: firebase.LoginType.ANONYMOUS
                }).then(user => {
                    this.navigateWithContext(user, "views/drawer-page");
                }).catch(err => {
                    dialogs.alert(err);
                })
            })
        } else {
            firebase.login({
                type: firebase.LoginType.ANONYMOUS
            }).then(user => {
                this.navigateWithContext(user, "views/drawer-page");
            }).catch(err => {
                dialogs.alert(err);
            })
        }
    }

    // PASSWORD login
    public onPasswordLogin() {
        if (appSettings.getBoolean("isLogged")) {
            firebase.logout().then(() => {
                firebase.login({
                    type: firebase.LoginType.PASSWORD,
                    email: this.email,
                    password: this.pass
                }).then(user => {
                    this.navigateWithContext(user, "views/drawer-page");
                }).catch(err => {
                    dialogs.alert(err);
                })
            })
        } else {
            firebase.login({
                type: firebase.LoginType.PASSWORD,
                email: this.email,
                password: this.pass
            }).then(user => {
                this.navigateWithContext(user, "views/drawer-page");
            }).catch(err => {
                dialogs.alert(err);
            })
        }
    }

    public onCreateUser() {
        firebase.createUser({
            email: this.newEmail,
            password: this.newPass
        }).then(result => {
            console.log("userid: " + result.key);

            this.email = this.newEmail;
            this.pass = this.newPass;

            firebase.login({
                type: firebase.LoginType.PASSWORD,
                email: this.newEmail,
                password: this.newPass
            }).then(user => {
                this.navigateWithContext(user, "views/drawer-page");
            }).catch(err => {
                dialogs.alert(err);
            })
        }).catch(err => {
            console.log("createUser error: " + err);
            dialogs.alert(err);
        })
    }

    public onResetPassword() {
        firebase.resetPassword({
            email: this.email
        }).then(() => {
            // called when password reset was successful,
            // you could now prompt the user to check his email
            dialogs.alert("Password Rest instructions send to " + this.email);
        }).catch(err => {
            dialogs.alert(err);
        })
    }

    public onChangePassword() {
        firebase.changePassword({
            email: this.email,
            oldPassword: 'myOldPassword',
            newPassword: 'myNewPassword'
        }).then(() => {
            // called when password change was successful
        }).catch(err => {
            dialogs.alert(err);
        })
    }

    // Universal methods
    public onLogout() {
        firebase.logout()
            .then(res => {
                dialogs.alert("Logout succsessfull!");
            }).catch(err => {
                dialogs.alert(err);
            })
    }

    // Sending an "email confirmation" email can be done after the user logged in
    public onSendEmailVerification() {
        firebase.sendEmailVerification().then(() => {
            console.log("Email verification sent");
        }).catch(err => {
            console.log("Error sending email verification: " + err);
        })
    }

    // If you want to authenticate your user from your backend server you can obtain a Firebase auth token for the currently logged in user.
    public onGetAuthToken() {
        firebase.getAuthToken({
            // default false, not recommended to set to true by Firebase but exposed for {N} devs nonetheless :)
            forceRefresh: false
        }).then(token => {
            console.log("Auth token retrieved: " + token);
        }).catch(err => {
            console.log("Auth token retrieval error: " + err);
            dialogs.alert(err);
        })
    }

    // UI specific
    public onFormToggle() {
        this.isFormVisible = !this.isFormVisible;
    }

    private navigateWithContext(user: any, moduleName: string) {
        console.log(JSON.stringify(user));
        this.currentUser = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
        frame.topmost().navigate({
            moduleName: moduleName,
            context: { currentUser: this.currentUser },
            clearHistory: true
        });
    }
}
