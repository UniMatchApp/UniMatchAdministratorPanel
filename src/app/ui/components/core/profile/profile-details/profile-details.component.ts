import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../../../../../data/domain/models/Profile';
import {User} from '../../../../../data/domain/models/User';

@Component({
  selector: 'app-profile-details',
  imports: [],
  templateUrl: './profile-details.component.html',
  standalone: true,
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent implements OnInit {

  @Input() profile: Profile | undefined;
  @Input() user: User | undefined;
  address: string = "Dirección no disponible";

  async ngOnInit() {
    await this.getAddressFromCoords();
  }

  get formattedBirthday(): string {
    if (!this.profile?.birthday) return 'Fecha no disponible';
    const date = new Date(this.profile.birthday);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  formatUserId(userId?: string): string {
    if (!userId || userId.length < 6) return userId ?? "N/A"; // Si es muy corto, lo devuelve tal cual
    return `${userId.slice(0, 4)} **** ${userId.slice(-2)}`;
  }



  async getAddressFromCoords() {
    if (!this.profile?.location) {
      return;
    }


    const url = `https://api.opencagedata.com/geocode/v1/json?q=${this.profile.location.latitude},${this.profile.location.longitude}&key=8706d481b436496a91ee3977d7d3b9e8`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("Response from OpenCage:", data);
      this.address = data.results?.[0]?.formatted || 'Dirección no disponible';
    } catch (error) {
      console.error("Error fetching address:", error);
      return;
    }
  }

}
