import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TelemetryRecord } from '../../../domain/model/telemetry-record.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-telemetry-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './telemetry-form.html',
  styleUrls: ['./telemetry-form.css']
})
export class TelemetryFormComponent {
  @Input() record: TelemetryRecord = new TelemetryRecord();
  @Output() save = new EventEmitter<TelemetryRecord>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit(): void {
    this.save.emit(this.record);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
