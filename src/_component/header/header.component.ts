// Default Modules
import { Component, OnInit } from '@angular/core';

// Generated Services
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {}

  /**
   * @description Logout User
   */
  logout(): any {
    this.userService.logout();
  }
}
