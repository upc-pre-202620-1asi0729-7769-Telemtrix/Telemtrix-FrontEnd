import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  breadcrumbTitle = 'Dashboard';
  private routerSub?: Subscription;
  private langSub?: Subscription;

  private routeTitles: Record<string, string> = {
    '': 'option.home',
    'fleet': 'option.fleet',
    'incidents': 'option.incidents',
    'inspections': 'option.inspections',
    'maintenance': 'option.maintenance',
    'telemetry': 'option.telemetry',
    'access': 'option.access',
    'master-data': 'option.master-data'
  };

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects.split('/')[1] || '';
        this.updateBreadcrumb(url);
      });

    this.langSub = this.translate.onLangChange.subscribe(() => {
      const url = this.router.url.split('/')[1] || '';
      this.updateBreadcrumb(url);
    });

    const initialUrl = this.router.url.split('/')[1] || '';
    this.updateBreadcrumb(initialUrl);
  }

  private updateBreadcrumb(url: string): void {
    const key = this.routeTitles[url] || 'option.home';
    this.translate.get(key).subscribe(value => {
      this.breadcrumbTitle = value;
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.langSub?.unsubscribe();
  }
}
