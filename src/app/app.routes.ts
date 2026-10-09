import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/presentation/components/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./fleet-management/presentation/views/vehicle-list/vehicle-list')
          .then(m => m.VehicleListComponent)
      },
      {
        path: 'fleet',
        loadComponent: () => import('./fleet-management/presentation/views/vehicle-list/vehicle-list')
          .then(m => m.VehicleListComponent)
      },
      {
        path: 'incidents',
        loadComponent: () => import('./incident-management/presentation/views/incident-list/incident-list')
          .then(m => m.IncidentListComponent)
      },
      {
        path: 'inspections',
        loadComponent: () => import('./inspection-management/presentation/views/inspection-list/inspection-list')
          .then(m => m.InspectionListComponent)
      },
      {
        path: 'maintenance',
        loadComponent: () => import('./maintenance-management/presentation/views/maintenance-list/maintenance-list')
          .then(m => m.MaintenanceListComponent)
      },
      {
        path: 'telemetry',
        loadComponent: () => import('./vehicle-operations/presentation/views/telemetry-list/telemetry-list')
          .then(m => m.TelemetryListComponent)
      },

      {
        path: 'access',
        loadComponent: () => import('./shared/presentation/views/placeholder/placeholder')
          .then(m => m.PlaceholderComponent),
        data: { title: 'Acceso y roles' }
      },
      {
        path: 'master-data',
        loadComponent: () => import('./shared/presentation/views/placeholder/placeholder')
          .then(m => m.PlaceholderComponent),
        data: { title: 'Tablas maestras' }
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
