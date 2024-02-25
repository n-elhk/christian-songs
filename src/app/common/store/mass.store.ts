import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { IMass, ReadingEnum } from '../interfaces/mass';
import { computed, inject } from '@angular/core';
import { AelfService } from '../services/api/aelf/aelf.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { reverseDate } from '../helpers/zero-pad';

type MassesState = {
  selectedDate: string;
  masses: Record<string, IMass | undefined>;
  isLoading: boolean;
};

const initialState: MassesState = {
  selectedDate: reverseDate(),
  masses: {},
  isLoading: false,
};

export const MassesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ masses, selectedDate }) => ({
    currentMass: computed(() => masses()[selectedDate()]),
    readings: computed(() => {
      const mass = masses()[selectedDate()];

      if (mass) {
        return mass.messes[0].lectures.filter(lecture =>
          [
            ReadingEnum.lECTURE_1,
            ReadingEnum.lECTURE_2,
            ReadingEnum.PSAUME,
          ].includes(lecture.type)
        );
      }
      return [];
    }),
    evangile: computed(() => {
      const mass = masses()[selectedDate()];

      if (mass) {
        return mass.messes[0].lectures.find(
          lecture => ReadingEnum.EVANGILE === lecture.type
        );
      }
      return undefined;
    }),
  })),
  withMethods((store, aelfService = inject(AelfService)) => ({
    loadMasses: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return aelfService.loadMass(store.selectedDate()).pipe(
            tapResponse({
              next: masses =>
                patchState(store, {
                  masses: { ...store.masses(), [store.selectedDate()]: masses },
                }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadMasses();
    },
  })
);
