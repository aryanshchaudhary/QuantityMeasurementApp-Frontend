import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { SignupComponent } from './features/auth/signup/signup';
import { DashboardComponent } from './features/measurement/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth-guard';
import { HistoryComponent } from './features/history/history';

export const routes: Routes = [

  // ✅ DEFAULT → DASHBOARD (GUEST MODE)
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // AUTH
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // DASHBOARD (PUBLIC)
  {
    path: 'dashboard',
    component: DashboardComponent
  },

  // HISTORY (PROTECTED)
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },

  // ✅ FALLBACK
  { path: '**', redirectTo: 'dashboard' }
];
