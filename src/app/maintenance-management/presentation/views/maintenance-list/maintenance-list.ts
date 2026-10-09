import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MaintenanceApiEndpoint } from '../../../infrastructure/maintenance-api-endpoint';
import { MaintenanceOrder } from '../../../domain/model/maintenance-order.entity';
import { DialogComponent } from '../../../../shared/presentation/components/dialog/dialog';
import { MaintenanceFormComponent } from '../../components/maintenance-form/maintenance-form';

@Component({
  selector: 'app-maintenance-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    DialogComponent,
    MaintenanceFormComponent
  ],
  templateUrl: './maintenance-list.html',
  styleUrls: ['./maintenance-list.css']
})
export class MaintenanceListComponent implements OnInit {
  orders: MaintenanceOrder[] = [];
  filteredOrders: MaintenanceOrder[] = [];
  searchTerm = '';
  statusFilter = 'ALL';
  showDialog = false;
  editingOrder: MaintenanceOrder = new MaintenanceOrder();

  constructor(private maintenanceApi: MaintenanceApiEndpoint) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.maintenanceApi.getAll().subscribe(data => {
      this.orders = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredOrders = this.orders.filter(o => {
      const matchesSearch = !this.searchTerm ||
        o.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.vehicleId.toString().includes(this.searchTerm);
      const matchesStatus = this.statusFilter === 'ALL' || o.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  openCreate(): void {
    const newOrder = new MaintenanceOrder();
    newOrder.scheduledDate = new Date();
    this.editingOrder = newOrder;
    this.showDialog = true;
  }

  openEdit(order: MaintenanceOrder): void {
    this.editingOrder = JSON.parse(JSON.stringify(order));
    this.showDialog = true;
  }

  close(): void {
    this.showDialog = false;
  }

  save(order: MaintenanceOrder): void {
    if (order.id === 0) {
      this.maintenanceApi.create(order).subscribe(() => {
        this.load();
        this.close();
      });
    } else {
      this.maintenanceApi.update(order.id, order).subscribe(() => {
        this.load();
        this.close();
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Eliminar esta orden de mantenimiento?')) {
      this.maintenanceApi.delete(id).subscribe(() => this.load());
    }
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'PENDING': 'Pendiente',
      'IN_PROGRESS': 'En Progreso',
      'COMPLETED': 'Completado'
    };
    return labels[status] || status;
  }

  getTypeLabel(type: string): string {
    return type === 'PREVENTIVE' ? 'Preventivo' : 'Correctivo';
  }
}
