import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;

  @Output() onCloseSidebar: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) {}

  public closeSidebar(): void {
    this.onCloseSidebar.emit();
  }

  public navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
