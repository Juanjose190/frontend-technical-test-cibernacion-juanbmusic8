import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Solicitud, SolicitudResponse } from '../models/solicitud.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/credits`;

  
  private solicitudesState = signal<SolicitudResponse[]>([]);
  private lastResponseState = signal<SolicitudResponse | null>(null);
  private loadingState = signal<boolean>(false);


  public readonly solicitudes = this.solicitudesState.asReadonly();
  public readonly lastResponse = this.lastResponseState.asReadonly();
  public readonly isLoading = this.loadingState.asReadonly();


  public readonly totalSolicitudes = computed(() => this.solicitudesState().length);

  constructor() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.loadingState.set(true);
    this.http.get<SolicitudResponse[]>(this.baseUrl)
      .pipe(
        finalize(() => this.loadingState.set(false))
      )
      .subscribe({
        next: (data) => this.solicitudesState.set(data),
        error: (err) => console.error('Error fetching applications:', err)
      });
  }

  enviarSolicitud(solicitud: Solicitud): Observable<SolicitudResponse> {
    return this.http.post<SolicitudResponse>(this.baseUrl, solicitud).pipe(
      tap(response => {
        this.lastResponseState.set(response);
        this.actualizarListaLocal(response);
      }),
      catchError(err => {
        console.error('Error creating application:', err);
        throw err;
      })
    );
  }

  updateSolicitud(id: number, solicitud: Solicitud): Observable<SolicitudResponse> {
    return this.http.put<SolicitudResponse>(`${this.baseUrl}/${id}`, solicitud).pipe(
      tap(response => {
        this.lastResponseState.set(response);
        this.solicitudesState.update(list => list.map(s => s.id === id ? response : s));
      })
    );
  }

  deleteSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.solicitudesState.update(list => list.filter(s => s.id !== id));
        if (this.lastResponseState()?.id === id) {
          this.limpiarEstado();
        }
      })
    );
  }

  limpiarEstado(): void {
    this.lastResponseState.set(null);
  }

  private actualizarListaLocal(nueva: SolicitudResponse): void {
    
    this.solicitudesState.update(list => [...list, nueva]);
  }
}
