import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user.model';

@Component({
  selector: 'app-side-header',
  templateUrl: './side-header.component.html',
  styleUrls: ['./side-header.component.css'],
})
export class SideHeaderComponent implements OnInit {
  user: IUser | null = null;

  constructor(private userSvc: UserService) {}

  ngOnInit() {
    this.userSvc.getUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  signOut() {
    this.userSvc.signOut();
  }
}
