import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    IonTabBar,
    IonTabs,
    IonTabButton,
    IonIcon,
    IonApp,
} from '@ionic/angular/standalone';
import { musicalNotes } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        IonApp,
        IonTabButton,
        IonTabBar,
        IonIcon,
        IonTabs,

    ]
})
export class AppComponent {
    constructor() {
        addIcons({
            musicalNotes
        });
    }
}
