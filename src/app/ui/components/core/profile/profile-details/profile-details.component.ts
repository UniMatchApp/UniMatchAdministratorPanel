import {Component, Input, OnInit} from '@angular/core';
import {ReportRow} from '../../../../screens/core/reports/reports.component';
import {Profile} from '../../../../../data/domain/models/Profile';
//import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile-details',
  imports: [],
  templateUrl: './profile-details.component.html',
  standalone: true,
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent implements OnInit {

  @Input() profile: Profile | null = null;
  @Input() email: String | undefined;
  @Input() name: String | undefined;


  constructor(/*private http: HttpClient*/) {}

  ngOnInit(): void {
    /*if (this.profile?.location) {
      const { latitude, longitude } = this.profile.location; // Obtener latitud y longitud
      this.getLocation(latitude, longitude);  // Llamar a la función de geocodificación
    }*/
  }

  get formattedBirthday(): string {
    if (!this.profile?.birthday) return 'Fecha no disponible';
    const date = new Date(this.profile.birthday);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

/*getLocation(lat: number, lon: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    this.http.get<any>(url).subscribe(
      (data) => {
        this.locationName = data.display_name || 'Ubicación no disponible';
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error);
        this.locationName = 'Ubicación no disponible';
      }
    );
  }*/

}
