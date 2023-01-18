import { Component , OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormServiceService } from '../Service/form-service.service';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent implements OnInit {
  userName : any
  logoutButton : boolean =true
  constructor(private formService : FormServiceService,
    private router: Router){
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.ngOnInit();
        }
     
      });

  }
  ngOnInit(): void {
    this.userName =localStorage.getItem("userName");

  }

  logout(){
    localStorage.clear();
    this.userName=null;
    this.router.navigateByUrl("/")
  }

  


}
