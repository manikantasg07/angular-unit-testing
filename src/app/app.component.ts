import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-unit-testing';
  subscribed=false;
  btnText="Subscribe"

  subscribe(){
    setTimeout(()=>{
       this.subscribed=true;
      this.btnText="Subscribed"
    },3000)
  }
}
