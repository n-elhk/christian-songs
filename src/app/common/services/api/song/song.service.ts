import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';
import { SongFile } from '../../../interfaces/song';

class SongConfig {
  constructor(
    public autor: string,
    public fileName: string,
    public lyrics: string,
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class SongService {
  /** Injection of {@link HttpClient}. */
  private readonly httpClient = inject(HttpClient);

  /** Injection of {@link NgZone}. */
  private readonly zone = inject(NgZone);

  readonly songConfigs = new Map<string, SongConfig>();

  public getSong(songName: string): Observable<string> {
    const songConfig = this.songConfigs.get(songName);

    if (!songConfig) {
      return throwError(() => 'No song available');
    }

    if (songConfig.lyrics) {
      return of(songConfig.lyrics);
    }

    const uri = encodeURIComponent(`/${songConfig.fileName}`);

    return this.httpClient
      .get<SongFile>(
        `https://gitlab.com/api/v4/projects/35860066/repository/files/chants${uri}?ref=main`,
      )
      .pipe(
        map((result) => {
          const base64Bytes = Uint8Array.from(atob(result.content), (c) =>
            c.charCodeAt(0),
          );

          // Créer un décodeur UTF-8
          const decoder = new TextDecoder('utf-8');

          // Décoder les bytes en une chaîne
          const decodedString = decoder.decode(base64Bytes);

          const regex = /(\d+\.|R\.)\n/g;
          const spacedText =
            decodedString.replace(
              regex,
              (match, captureGroup) => captureGroup,
            ) + '\n';

          songConfig.lyrics = spacedText;

          return songConfig.lyrics;
        }),
      );
  }

  public getSongs(): Observable<string> {
    return this.httpClient
      .get(
        `https://docs.google.com/spreadsheets/d/199T2yuP-GQ-tjfMmsagWFQgXMJSJGiBWrM_v_lESg3U/gviz/tq?tqx=out:csv&sheet=chants`,
        {
          responseType: 'arraybuffer',
          observe: 'body',
        },
      )
      .pipe(
        map((buffer) => {
          const enc = new TextDecoder('utf-8');
          return enc.decode(buffer);
        }),
      );
  }

  public initializeSong(): Observable<void> {
    return this.getSongs().pipe(
      map((chaine) => {
        this.zone.runOutsideAngular(() => {
          const regex = /,(?=[\w\d\s])/g;
          const resultat = chaine.replace(regex, (_) => ' ');

          // Supprimez les guillemets doubles autour des éléments
          const chaineSansGuillemets = resultat.replace(/"/g, '');

          // Divisez la chaîne en lignes
          const lignes = chaineSansGuillemets.split('\n');

          /**  First line is 'name','autor','filename'. */
          lignes.shift();

          // Stockez les valeurs divisées dans un tableau
          lignes.forEach((line, i) => {
            const column = line.split(',');
            this.songConfigs.set(
              column[0],
              new SongConfig(column[1], column[2], ''),
            );
          });
        });
      }),
    );
  }
}
