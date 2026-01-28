import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreditType, Solicitud, SolicitudResponse } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.scss']
})
export class SolicitudFormComponent implements OnInit, OnChanges {
  creditForm!: FormGroup;
  CreditType = CreditType;
  isLoading = false;

  @Input() editData: SolicitudResponse | null = null;
  @Output() formValuesChanged = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.creditForm.valueChanges.subscribe(values => {
      this.formValuesChanged.emit(values);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editData'] && this.editData) {
      this.creditForm?.patchValue({
        nombre: this.editData.customerName,
        monto: this.editData.amount,
        tipoCredito: this.editData.type
      });
    }
  }

  private initForm(): void {
    this.creditForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      monto: [0, [Validators.required, Validators.min(1)]],
      tipoCredito: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.creditForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.creditForm.valid) {
      this.isLoading = true;

      const solicitud: Solicitud = {
        customerName: this.creditForm.value.nombre,
        amount: this.creditForm.value.monto,
        type: this.creditForm.value.tipoCredito
      };

      const request = this.editData
        ? this.solicitudService.updateSolicitud(this.editData.id, solicitud)
        : this.solicitudService.enviarSolicitud(solicitud);

      request.subscribe({
        next: () => {
          this.isLoading = false;
          if (!this.editData) {
            this.creditForm.reset({ monto: 0, tipoCredito: '' });
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Error al procesar solicitud:', err);
        }
      });
    }
  }

  cancelEdit(): void {
    this.editData = null;
    this.creditForm.reset({ monto: 0, tipoCredito: '' });
    this.solicitudService.limpiarEstado();
  }
}
