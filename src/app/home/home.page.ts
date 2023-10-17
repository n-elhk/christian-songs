import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  toSignal
} from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../core/services/api/api.service';
import { NgFor, NgIf } from '@angular/common';
import { FilterPipe } from '../common/pipes/filter';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-searchbar [formControl]="control" />
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ng-container *ngIf="chantsName() | filter : searchTerm() as options">
        <ion-item
          [routerLink]="['../song', option]"
          *ngFor="let option of options.result"
        >
          {{ option }}
        </ion-item>
      </ng-container>
    </ion-content>
  `,
  styles: [
    `
      :host {
        ion-searchbar {
          padding-block: 15px;
        }
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    FilterPipe,
    RouterLink,
    IonicModule,
    ReactiveFormsModule,
  ],
})
export class HomePage {
  private readonly apiService = inject(ApiService);

  public readonly control = new FormControl('', { nonNullable: true });

  private readonly searchTerm$ = this.control.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
  );

  public readonly searchTerm = toSignal(this.searchTerm$,  { initialValue: '' });

  public readonly chantsName = signal(Array.from(this.apiService.songConfigs.keys()));
}
