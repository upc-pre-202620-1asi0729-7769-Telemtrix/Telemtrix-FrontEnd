import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { VehicleApiEndpoint } from '../../../infrastructure/vehicle-api-endpoint';
import { Vehicle } from '../../../domain/model/vehicle.entity';
import { DialogComponent } from '../../../../shared/presentation/components/dialog/dialog';
import { VehicleFormComponent } from '../../components/vehicle-form/vehicle-form';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, DialogComponent, VehicleFormComponent],
  templateUrl: './vehicle-list.html',
  styleUrls: ['./vehicle-list.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  searchTerm = '';
  statusFilter = 'ALL';

  showDialog = false;
  editingVehicle: Vehicle = new Vehicle();

  constructor(private vehicleApi: VehicleApiEndpoint) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleApi.getAll().subscribe(data => {
      this.vehicles = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredVehicles = this.vehicles.filter(v => {
      const matchesSearch = !this.searchTerm ||
        v.plate.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        v.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'ALL' || v.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  openCreateDialog(): void {
    this.editingVehicle = new Vehicle();
    this.showDialog = true;
  }

  openEditDialog(vehicle: Vehicle): void {
    this.editingVehicle = { ...vehicle };
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.editingVehicle = new Vehicle();
  }

  saveVehicle(vehicle: Vehicle): void {
    if (vehicle.id === 0) {
      this.vehicleApi.create(vehicle).subscribe(() => {
        this.loadVehicles();
        this.closeDialog();
      });
    } else {
      this.vehicleApi.update(vehicle.id, vehicle).subscribe(() => {
        this.loadVehicles();
        this.closeDialog();
      });
    }
  }

  deleteVehicle(id: number): void {
    if (confirm('¿Estás seguro de eliminar este vehículo?')) {
      this.vehicleApi.delete(id).subscribe(() => this.loadVehicles());
    }
  }
}
