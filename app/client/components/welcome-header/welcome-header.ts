/**
 * Created by mjwheatley on 3/2/16.
 */
import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'welcome-header',
    templateUrl: '/client/components/welcome-header/welcome-header.html',
    pipes: [TranslatePipe]
})
export class WelcomeHeaderComponent {
    constructor(private translate:TranslateService) {
    }
}