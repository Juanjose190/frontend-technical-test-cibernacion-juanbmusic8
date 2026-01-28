import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditType, CreditStatus, SolicitudResponse } from '../../models/solicitud.model';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnChanges {
  @Input() nombre: string = '';
  @Input() monto: number = 0;
  @Input() tipoCredito: CreditType = CreditType.PERSONAL;
  @Input() status: CreditStatus = CreditStatus.PENDING;
  @Input() requestId?: number;
  @Input() date?: string;
  @Input() message?: string;

  isFlipped: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    // Voltear la tarjeta automáticamente cuando el estado deja de ser PENDING
    if (changes['status'] &&
      !changes['status'].firstChange &&
      changes['status'].currentValue !== CreditStatus.PENDING) {

      // Pequeño delay para que el usuario vea el cambio antes del giro
      setTimeout(() => {
        this.isFlipped = true;
      }, 300);
    } else if (changes['status'] && changes['status'].currentValue === CreditStatus.PENDING) {
      this.isFlipped = false;
    }
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}
