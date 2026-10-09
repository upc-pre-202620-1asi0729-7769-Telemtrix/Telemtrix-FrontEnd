import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Incident } from '../../../domain/model/incident.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-incident-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './incident-form.html',
  styleUrls: ['./incident-form.css']
})
export class IncidentFormComponent {
  @Input() incident: Incident = new Incident();
  @Output() save = new EventEmitter<Incident>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit(): void { this.save.emit(this.incident); }
  onCancel(): void { this.cancel.emit(); }
}
