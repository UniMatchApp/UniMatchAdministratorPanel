import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../../../../../data/domain/models/Profile';

@Component({
  selector: 'app-profile-details',
  imports: [],
  templateUrl: './profile-details.component.html',
  standalone: true,
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent implements OnInit {

  @Input() profile: Profile | undefined;
  @Input() email: string | undefined;
  profileLocation: string = 'Dirección no disponible';

  async ngOnInit() {
    this.profileLocation =  await this.getAddressFromCoords();
  }

  get formattedBirthday(): string {
    if (!this.profile?.birthday) return 'Fecha no disponible';
    const date = new Date(this.profile.birthday);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }


  async getAddressFromCoords() {
    if (!this.profile?.location) {
      return;
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${(this.profile.location.latitude)}&lon=${(this.profile.location.longitude)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.display_name || 'Dirección no disponible';
    } catch (error) {
      console.error("Error fetching address:", error);
      return;
    }
  }
}
