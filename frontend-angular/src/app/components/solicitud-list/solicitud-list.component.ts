import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../services/solicitud.service';
import { SolicitudResponse, CreditStatus } from '../../models/solicitud.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-solicitud-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './solicitud-list.component.html',
    styleUrls: ['./solicitud-list.component.scss']
})
export class SolicitudListComponent implements OnInit {
    solicitudes$: Observable<SolicitudResponse[]>;
    CreditStatus = CreditStatus;

    @Output() edit = new EventEmitter<SolicitudResponse>();

    constructor(private solicitudService: SolicitudService) {
        this.solicitudes$ = this.solicitudService.solicitudes$;
    }

    ngOnInit(): void {
        this.solicitudService.cargarSolicitudes();
    }

    onDelete(id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar esta gestión?')) {
            this.solicitudService.deleteSolicitud(id).subscribe({
                next: () => alert('Gestión eliminada correctamente'),
                error: () => alert('Ocurrió un error al eliminar la gestión')
            });
        }
    }

    onEdit(solicitud: SolicitudResponse): void {
        this.edit.emit(solicitud);
    }
}
