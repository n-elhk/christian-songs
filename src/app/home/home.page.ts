import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../core/services/api/api.service';
import { NgFor, NgIf } from '@angular/common';
import { FilterPipe } from '../common/pipes/filter';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-searchbar [formControl]="control" />
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ng-container *ngIf="chantsName() | filter : control.value as options">
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
  public apiService = inject(ApiService);

  public control = new FormControl('', { nonNullable: true });

  public chantsName = signal(Array.from(this.apiService.songConfigs.keys()));
}
