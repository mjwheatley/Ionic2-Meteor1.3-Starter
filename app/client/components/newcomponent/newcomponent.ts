/**
 * Created by mjwheatley on 3/2/16.
 */
import {Component} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

//TODO change selector and templateUrl
@Component({
    selector: 'new-component',
    templateUrl: '/client/components/newcomponent/newcomponent.html',
    directives: [IONIC_DIRECTIVES],
    pipes: [TranslatePipe]
})
//TODO change class name to <ComponentName>Component
export class NewComponentComponent {
    constructor(private translate:TranslateService) {
    }
}