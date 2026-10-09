import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { IncidentApiEndpoint } from '../../../infrastructure/incident-api-endpoint';
import { Incident } from '../../../domain/model/incident.entity';
import { DialogComponent } from '../../../../shared/presentation/components/dialog/dialog';
import { IncidentFormComponent } from '../../components/incident-form/incident-form';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, DialogComponent, IncidentFormComponent],
  templateUrl: './incident-list.html',
  styleUrls: ['./incident-list.css']
})
export class IncidentListComponent implements OnInit {
  incidents: Incident[] = [];
  showDialog = false;
  editingIncident: Incident = new Incident();

  constructor(private incidentApi: IncidentApiEndpoint) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.incidentApi.getAll().subscribe(data => this.incidents = data);
  }

  openCreate(): void {
    this.editingIncident = new Incident();
    this.showDialog = true;
  }

  openEdit(i: Incident): void {
    this.editingIncident = { ...i };
    this.showDialog = true;
  }

  close(): void { this.showDialog = false; }

  save(incident: Incident): void {
    if (incident.id === 0) {
      this.incidentApi.create(incident).subscribe(() => { this.load(); this.close(); });
    } else {
      this.incidentApi.update(incident.id, incident).subscribe(() => { this.load(); this.close(); });
    }
  }

  delete(id: number): void {
    if (confirm('¿Eliminar esta incidencia?')) {
      this.incidentApi.delete(id).subscribe(() => this.load());
    }
  }
}
