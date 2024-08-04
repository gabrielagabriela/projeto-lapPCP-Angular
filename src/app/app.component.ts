import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'labpcp-angular';

  showToolbar = true;

  constructor(private router: Router){
    this.router.events.subscribe(retorno => {
      if(retorno instanceof NavigationEnd){
        this.showToolbar = !this.router.url.includes('login')
      }
    })
  }
}
