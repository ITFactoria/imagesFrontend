import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlide, IonSlides, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlide') slides: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5
  }

  loginUser = {
    email: "ruperto@mail",
    password: "123456"

  }

  signUpUser = {
    email: "",
    password: "",
    avatar: "",
    name: ""

  }


  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }


  constructor(
    private _userService: UserService, 
    private _navctrl: NavController,
    private _uiService: UiService) { }

  ngOnInit() { }

  async login(frmLogin: NgForm) {
    if (frmLogin.invalid) { return };
    
    let userOk = await this._userService.login(this.loginUser.email, this.loginUser.password);
    if (userOk){
      console.log("Usuario valiodo");
      this._navctrl.navigateRoot('main/tabs/tab1', {animated: true})
    }
    else{
      console.log("Usuario NOOOO valiodo");
      this._uiService.presentInfoAlert("Email o password invalidos");
    }

  }

  async signUp(frmSignUp: NgForm) {
    console.log("SignUp");

    if (frmSignUp.invalid) { return };
    
    let userOk = await this._userService.signUp(this.signUpUser);
    if (userOk){
      console.log("Usuario valiodo");
      this._navctrl.navigateRoot('main/tabs/tab1', {animated: true})
    }
    else{
      console.log("Usuario NOOOO valiodo");
      this._uiService.presentInfoAlert("Email o password invalidos");
    }



  }

  seleccionarAvatar(avatar) {
    this.avatars.forEach(avatar => avatar.seleccionado = false);
    avatar.seleccionado = true;
  }

  showLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);


  }
  showSignUp() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);


  }


}
