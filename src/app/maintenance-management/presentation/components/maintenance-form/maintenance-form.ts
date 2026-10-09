import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaintenanceOrder } from '../../../domain/model/maintenance-order.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-maintenance-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './maintenance-form.html',
  styleUrls: ['./maintenance-form.css']
})
export class MaintenanceFormComponent {
  @Input() order: MaintenanceOrder = new MaintenanceOrder();
  @Output() save = new EventEmitter<MaintenanceOrder>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit(): void {
    this.save.emit(this.order);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
