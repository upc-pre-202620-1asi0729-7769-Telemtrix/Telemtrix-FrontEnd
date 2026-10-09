import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inspection, InspectionItem } from '../../../domain/model/inspection.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-inspection-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './inspection-form.html',
  styleUrls: ['./inspection-form.css']
})
export class InspectionFormComponent implements OnInit {
  @Input() inspection: Inspection = new Inspection();
  @Output() save = new EventEmitter<Inspection>();
  @Output() cancel = new EventEmitter<void>();

  defaultItems: InspectionItem[] = [
    { name: 'Frenos', status: 'OK' },
    { name: 'Luces', status: 'OK' },
    { name: 'Llantas', status: 'OK' },
    { name: 'Aceite', status: 'OK' },
    { name: 'Refrigerante', status: 'OK' }
  ];

  ngOnInit(): void {
    if (!this.inspection.items || this.inspection.items.length === 0) {
      this.inspection.items = JSON.parse(JSON.stringify(this.defaultItems));
    }
  }

  onSubmit(): void {
    this.save.emit(this.inspection);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
