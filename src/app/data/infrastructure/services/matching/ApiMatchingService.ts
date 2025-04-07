import {MatchingService} from '../../../application/services/MatchingService';
import {HttpClient} from '@angular/common/http';
import {MatchingController} from '../../../controller/MatchingController';
import {firstValueFrom} from 'rxjs';


export class ApiMatchingService extends MatchingService {

  private matchingController;

  constructor(private http: HttpClient) {
    super();
    this.matchingController = new MatchingController(http);
  }

  async getTotalMatchesNumber(): Promise<number> {
    try {
      const response = await firstValueFrom(this.matchingController.getMatchesNumber());
      return response;
    } catch (error) {
      console.error('Error en getTotalMatchesNumber:', error);
      throw new Error('Error al obtener el número total de coincidencias');
    }
  }
}
