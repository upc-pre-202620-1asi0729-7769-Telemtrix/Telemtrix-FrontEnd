import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { InspectionApiEndpoint } from '../../../infrastructure/inspection-api-endpoint';
import { Inspection } from '../../../domain/model/inspection.entity';
import { DialogComponent } from '../../../../shared/presentation/components/dialog/dialog';
import { InspectionFormComponent } from '../../components/inspection-form/inspection-form';

@Component({
  selector: 'app-inspection-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    DialogComponent,
    InspectionFormComponent
  ],
  templateUrl: './inspection-list.html',
  styleUrls: ['./inspection-list.css']
})
export class InspectionListComponent implements OnInit {
  inspections: Inspection[] = [];
  filteredInspections: Inspection[] = [];
  searchTerm = '';
  showDialog = false;
  editingInspection: Inspection = new Inspection();

  constructor(private inspectionApi: InspectionApiEndpoint) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.inspectionApi.getAll().subscribe(data => {
      this.inspections = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredInspections = this.inspections.filter(i => {
      return !this.searchTerm ||
        i.vehicleId.toString().includes(this.searchTerm) ||
        i.inspectorId.toString().includes(this.searchTerm);
    });
  }

  openCreate(): void {
    const newInspection = new Inspection();
    newInspection.date = new Date();
    this.editingInspection = newInspection;
    this.showDialog = true;
  }

  openEdit(inspection: Inspection): void {
    this.editingInspection = JSON.parse(JSON.stringify(inspection));
    this.showDialog = true;
  }

  close(): void {
    this.showDialog = false;
  }

  save(inspection: Inspection): void {
    if (inspection.id === 0) {
      this.inspectionApi.create(inspection).subscribe(() => {
        this.load();
        this.close();
      });
    } else {
      this.inspectionApi.update(inspection.id, inspection).subscribe(() => {
        this.load();
        this.close();
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Eliminar esta inspección?')) {
      this.inspectionApi.delete(id).subscribe(() => this.load());
    }
  }

  getPassedCount(inspection: Inspection): number {
    return inspection.items.filter(i => i.status === 'OK').length;
  }
}
