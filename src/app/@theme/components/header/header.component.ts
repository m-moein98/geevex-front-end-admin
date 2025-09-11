import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '../../../pages/admin/admin-service';
import { LoginComponent } from '../../../pages/admin/login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'default',
    },
    {
      value: 'dark',
      name: 'dark',
    },
    {
      value: 'cosmic',
      name: 'cosmic',
    },
    {
      value: 'corporate',
      name: 'corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'change password' }, { title: 'logout' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private dialogService: NbDialogService,
    private userService: AdminService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    window.addEventListener("storage", () => {
      this.user = JSON.parse(localStorage.getItem("user"));
    }, false);
    this.currentTheme = this.themeService.currentTheme;
    this.menuService.onItemClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ item: { title } }) => {
        if (title === 'logout') {
          this.logout();
        } else if (title === 'change password') {
          this.dialogService.open(ChangePasswordComponent, {
            context: {},
          });
        }
      });
    this.userService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: any) => this.user = user);
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  open() {
    if (this.user) return
    this.dialogService.open(LoginComponent, {
      context: {},
    });
  }
  logout() {
    localStorage.clear();
    window.dispatchEvent(new Event('storage'));
    this.router.navigate(['/pages/admin/login'])
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
