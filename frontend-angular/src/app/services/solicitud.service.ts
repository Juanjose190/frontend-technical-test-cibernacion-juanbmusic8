// src/app/services/solicitud.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Solicitud, SolicitudResponse } from '../models/solicitud.model';

@Injectable({
    providedIn: 'root'
})
export class SolicitudService {
    private readonly baseUrl = 'http://localhost:8080/api/credits';
    private solicitudesSubject = new BehaviorSubject<SolicitudResponse[]>([]);
    public solicitudes$ = this.solicitudesSubject.asObservable();

    private lastResponseSubject = new BehaviorSubject<SolicitudResponse | null>(null);
    public lastResponse$ = this.lastResponseSubject.asObservable();

    constructor(private http: HttpClient) {
        this.cargarSolicitudes();
    }

    cargarSolicitudes(): void {
        this.http.get<SolicitudResponse[]>(this.baseUrl).subscribe(
            data => this.solicitudesSubject.next(data)
        );
    }

    enviarSolicitud(solicitud: Solicitud): Observable<SolicitudResponse> {
        return this.http.post<SolicitudResponse>(this.baseUrl, solicitud).pipe(
            tap(response => {
                this.lastResponseSubject.next(response);
                this.cargarSolicitudes();
            })
        );
    }

    getSolicitudes(): Observable<SolicitudResponse[]> {
        return this.http.get<SolicitudResponse[]>(this.baseUrl).pipe(
            tap(data => this.solicitudesSubject.next(data))
        );
    }

    // ✅ AHORA SÍ CORREGIDO - Con paréntesis
    updateSolicitud(id: number, solicitud: Solicitud): Observable<SolicitudResponse> {
        return this.http.put<SolicitudResponse>(`${this.baseUrl}/${id}`, solicitud).pipe(
            tap(response => {
                this.lastResponseSubject.next(response);
                this.cargarSolicitudes();
            })
        );
    }

    // ✅ AHORA SÍ CORREGIDO - Con paréntesis
    deleteSolicitud(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
            tap(() => {
                this.cargarSolicitudes();
                if (this.lastResponseSubject.value?.id === id) {
                    this.lastResponseSubject.next(null);
                }
            })
        );
    }

    limpiarEstado(): void {
        this.lastResponseSubject.next(null);
    }
}