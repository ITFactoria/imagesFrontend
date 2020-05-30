import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { UiService } from 'src/app/services/ui.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user : IUser;

  constructor(private _userService : UserService, private _uIService : UiService) {}

  ngOnInit(){
      this.user = this._userService.getUser();
      console.log("TAB3 USER: ", this.user)
  }

  async updateUser(frmUpdate : NgForm){
    if(frmUpdate.invalid) return;
    
    console.log("TAB3: UPDATEUSER ", this.user);

    let respUpdate = await this._userService.updateUser(this.user);
    if( !respUpdate ){
      console.log("UPD MAMONA ");
      this._uIService.presentToast("Actualizacion no exitosa")


    }
    else{
      console.log("UPD EXITOSA")
      this._uIService.presentToast("Actualizacion exitosa")

    }

  }

  

  logout(){}


}
