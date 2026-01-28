import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { SolicitudFormComponent } from './components/solicitud-form/solicitud-form.component';
import { SolicitudListComponent } from './components/solicitud-list/solicitud-list.component';
import { StatusDisplayComponent } from './components/status-display/status-display.component';
import { SolicitudService } from './services/solicitud.service';
import { CreditStatus, CreditType, SolicitudResponse } from './models/solicitud.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CreditCardComponent,
    SolicitudFormComponent,
    SolicitudListComponent,
    StatusDisplayComponent
  ],
  template: `
    <main class="dashboard-root" [class.dark-theme]="isDarkMode" [class.light-theme]="!isDarkMode">
      <!-- Navigation -->
      <nav class="dash-nav">
        <div class="logo">Bank<span>Pro</span></div>
        <div class="nav-links">
          <span class="active">Solicitudes</span>
        </div>
        <div class="theme-switcher" (click)="toggleTheme()" [title]="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
          <div class="switch-track">
            <div class="switch-knob">
              <span *ngIf="!isDarkMode">☀️</span>
              <span *ngIf="isDarkMode">🌙</span>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Workspace -->
      <div class="workspace-main">
        <aside class="config-panel">
          <app-solicitud-form
            [editData]="editData"
            (formValuesChanged)="updatePreview($event)"
          ></app-solicitud-form>
        </aside>

        <main class="preview-hero">
          <div class="hero-content">
            <div class="badge-status" [ngClass]="currentStatus">
              {{ currentStatus === 'PENDING' ? 'Borrador Real-time' : 'Estado: ' + currentStatus }}
            </div>
            <h1>Configurador de Crédito</h1>
            <p>Ajusta los detalles y visualiza los cambios instantáneamente</p>
            
            <div class="card-protagonist-wrapper">
              <app-credit-card
                [nombre]="formValues.nombre"
                [monto]="formValues.monto"
                [tipoCredito]="formValues.tipoCredito"
                [status]="currentStatus"
                [requestId]="lastResponse?.id"
                [date]="lastResponse?.createdAt"
                [message]="lastResponse?.mensajeExito || lastResponse?.motivoRechazo"
              ></app-credit-card>
            </div>
          </div>
        </main>
      </div>

      <!-- History -->
      <section class="historical-section">
        <app-solicitud-list (edit)="onEdit($event)"></app-solicitud-list>
      </section>

      <app-status-display *ngIf="showModal" [response]="lastResponse"></app-status-display>
      
      <footer class="dash-footer">
        <p>Hecho con ❤️ por <strong>Juanjobb</strong></p>
        <span class="copyright">&copy; 2026 BankPro International.</span>
      </footer>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      font-family: 'Inter', system-ui, sans-serif;
    }

    .dashboard-root {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      
      /* Base variables (Light Mode) - REFINED CONTRAST */
      --bg-main: #f1f5f9;
      --bg-panel: #ffffff;
      --bg-hero: radial-gradient(circle at center, #ffffff 0%, #cbd5e1 150%);
      --text-main: #020617; /* Darker Slate for better readability */
      --text-muted: #475569; /* Slate 600 for labels in light mode */
      --accent: #10b981;
      --border: #cbd5e1;
      --card-shadow: 0 10px 30px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.05);

      &.dark-theme {
        --bg-main: #0a0c10;
        --bg-panel: #11141b;
        --bg-hero: radial-gradient(circle at center, #1a1e26 0%, #0a0c10 100%);
        --text-main: #ffffff;
        --text-muted: #94a3b8;
        --accent: #10b981;
        --border: rgba(255, 255, 255, 0.08);
        --card-shadow: 0 40px 80px rgba(0,0,0,0.6);
      }

      background-color: var(--bg-main);
      color: var(--text-main);
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .dash-nav {
      padding: 15px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-panel);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: all 0.3s;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: -1px;
      color: var(--text-main);
      span { color: var(--accent); }
    }

    .nav-links {
      display: flex;
      gap: 30px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      span { cursor: pointer; transition: color 0.2s; }
      span:hover { color: var(--text-main); }
      span.active { color: var(--accent); }
    }

    .theme-switcher {
      cursor: pointer;
      .switch-track {
        width: 54px;
        height: 28px;
        background: var(--border);
        border-radius: 20px;
        position: relative;
      }
      .switch-knob {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 24px;
        height: 24px;
        background: var(--bg-panel);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
    }
    .dark-theme .switch-knob { transform: translateX(26px); }

    .workspace-main {
      display: grid;
      grid-template-columns: 400px 1fr;
      flex: 1;
      min-height: calc(100vh - 60px);
    }

    .config-panel {
      background: var(--bg-panel);
      border-right: 1px solid var(--border);
      display: flex;
      justify-content: center;
      transition: background-color 0.3s, border-color 0.3s;
    }

    .preview-hero {
      background: var(--bg-hero);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 60px;
      transition: background 0.3s;
    }

    .hero-content {
      text-align: center;
      width: 100%;
      max-width: 800px;
      h1 { font-size: 2.8rem; font-weight: 900; margin: 15px 0 10px; letter-spacing: -2px; }
      p { color: var(--text-muted); font-size: 1.1rem; margin-bottom: 50px; }
    }

    .badge-status {
      display: inline-block;
      font-size: 0.65rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      padding: 6px 16px;
      border-radius: 99px;
      background: var(--border);
      color: var(--text-muted);
      &.APPROVED { background: rgba(16, 185, 129, 0.1); color: var(--accent); }
      &.REJECTED { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
    }

    .card-protagonist-wrapper {
      perspective: 2000px;
      filter: drop-shadow(var(--card-shadow));
      transition: filter 0.5s;
      ::ng-deep app-credit-card {
        transform: scale(1.15);
        display: inline-block;
      }
    }

    .historical-section {
      padding: 80px 40px;
      background: var(--bg-main);
      display: flex;
      justify-content: center;
      app-solicitud-list { max-width: 1200px; width: 100%; }
    }

    .dash-footer {
      padding: 60px 40px;
      text-align: center;
      background: var(--bg-panel);
      border-top: 1px solid var(--border);
      p { margin: 0 0 8px; font-size: 1.1rem; }
      .copyright { color: var(--text-muted); font-size: 0.75rem; font-weight: 500; }
    }

    @media (max-width: 1100px) {
      .workspace-main { grid-template-columns: 1fr; }
      .config-panel { border-right: none; border-bottom: 1px solid var(--border); }
    }
  `]
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  formValues = {
    nombre: '',
    monto: 0,
    tipoCredito: CreditType.PERSONAL
  };

  currentStatus: CreditStatus = CreditStatus.PENDING;
  lastResponse: SolicitudResponse | null = null;
  editData: SolicitudResponse | null = null;
  showModal = false;

  constructor(private solicitudService: SolicitudService) {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
  }

  ngOnInit(): void {
    this.solicitudService.lastResponse$.subscribe((response) => {
      if (response) {
        this.lastResponse = response;
        this.currentStatus = response.status;
        this.showModal = true;
        this.editData = null;
      } else {
        this.lastResponse = null;
        this.currentStatus = CreditStatus.PENDING;
        this.showModal = false;
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  updatePreview(values: any): void {
    this.formValues = values;
    if (!this.lastResponse) {
      this.currentStatus = CreditStatus.PENDING;
    }
  }

  onEdit(solicitud: SolicitudResponse): void {
    this.editData = solicitud;
    this.formValues = {
      nombre: solicitud.customerName,
      monto: solicitud.amount,
      tipoCredito: solicitud.type
    };
    // Reset to draft state during edit
    this.currentStatus = CreditStatus.PENDING;
    this.lastResponse = null;

    this.showModal = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
