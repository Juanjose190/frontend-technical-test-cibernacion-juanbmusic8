import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Solicitud, SolicitudResponse } from '../models/solicitud.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/credits`;

  
  private readonly solicitudesSignal = signal<SolicitudResponse[]>([]);
  private readonly lastResponseSignal = signal<SolicitudResponse | null>(null);

  public readonly solicitudes = computed(() => this.solicitudesSignal());
  public readonly lastResponse = computed(() => this.lastResponseSignal());

  constructor() {
    this.fetchSolicitudes();
  }

  fetchSolicitudes(): void {
    this.http.get<SolicitudResponse[]>(this.apiUrl).subscribe(data => {
      this.solicitudesSignal.set(data);
    });
  }

  enviarSolicitud(solicitud: Solicitud): Observable<SolicitudResponse> {
    return this.http.post<SolicitudResponse>(this.apiUrl, solicitud).pipe(
      tap(response => {
        this.lastResponseSignal.set(response);
        this.fetchSolicitudes();
      })
    );
  }

  updateSolicitud(id: number, solicitud: Solicitud): Observable<SolicitudResponse> {
    return this.http.put<SolicitudResponse>(`${this.apiUrl}/${id}`, solicitud).pipe(
      tap(response => {
        this.lastResponseSignal.set(response);
        this.fetchSolicitudes();
      })
    );
  }

  deleteSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        if (this.lastResponseSignal()?.id === id) {
          this.lastResponseSignal.set(null);
        }
        this.fetchSolicitudes();
      })
    );
  }

  resetState(): void {
    this.lastResponseSignal.set(null);
  }
}
