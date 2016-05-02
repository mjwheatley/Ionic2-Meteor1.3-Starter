/**
 * Created by mjwheatley on 3/2/16.
 */
import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'welcome-header',
    templateUrl: '/client/components/welcome-header/welcome-header.html',
    directives: [IONIC_DIRECTIVES],
    pipes: [TranslatePipe]
})
export class WelcomeHeaderComponent {
    constructor(private translate:TranslateService) {
    }
}