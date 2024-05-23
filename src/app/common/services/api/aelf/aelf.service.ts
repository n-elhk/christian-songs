import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMass } from '../../../interfaces/mass';

@Injectable({
  providedIn: 'root',
})
export class AelfService {
  /** Injection of {@link HttpClient}. */
  private readonly httpClient = inject(HttpClient);

  /** environment of {@link environment.aelfUrl}. */
  private readonly aelfUrl = environment.aelfUrl;

  loadMass(date: string) {
    return this.httpClient
      .get<IMass>(`${this.aelfUrl}/messes/${date}/france`);
  }
}
