import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditStatus, SolicitudResponse } from '../../models/solicitud.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-status-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="response" class="status-container" [@fadeInScale]>
      <div class="status-card" [ngClass]="response.status.toLowerCase()">
        <div class="icon-circle">
          <span *ngIf="response.status === CreditStatus.APPROVED">✓</span>
          <span *ngIf="response.status === CreditStatus.REJECTED">✕</span>
        </div>
        
        <h2>{{ response.status === CreditStatus.APPROVED ? '¡Aprobada!' : 'Solicitud Rechazada' }}</h2>
        
        <p class="message">
          {{ response.mensajeExito || response.motivoRechazo }}
        </p>
        
        <div class="details">
          <span>ID: {{ response.id }}</span>
          <span>Fecha: {{ response.createdAt | date:'short' }}</span>
        </div>

        <button (click)="onClose()" class="btn-close">Entendido</button>
      </div>
    </div>
  `,
  styles: [`
    .status-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .status-card {
      background: white;
      padding: 40px;
      border-radius: 24px;
      text-align: center;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 20px 50px rgba(0,0,0,0.2);
    }

    .icon-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2.5rem;
      font-weight: bold;
      margin: 0 auto 20px;
      color: white;
    }

    .approved .icon-circle { background: #2ecc71; }
    .rejected .icon-circle { background: #e74c3c; }

    h2 {
      margin-bottom: 15px;
      color: #2c3e50;
    }

    .message {
      color: #7f8c8d;
      margin-bottom: 25px;
      line-height: 1.5;
    }

    .details {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: #bdc3c7;
      margin-bottom: 30px;
      border-top: 1px solid #eee;
      padding-top: 15px;
    }

    .btn-close {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 8px;
      background: #34495e;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    .btn-close:hover {
      background: #2c3e50;
    }
  `],
  animations: [
    trigger('fadeInScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class StatusDisplayComponent {
  @Input() response: SolicitudResponse | null = null;
  CreditStatus = CreditStatus;

  onClose() {
    this.response = null;
    // Podríamos añadir un output aquí si el padre necesita resetear algo
  }
}
