/**
 * Created by mjwheatley on 3/2/16.
 */
import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

//TODO change selector and templateUrl
@Component({
    selector: 'new-component',
    templateUrl: '/client/components/newcomponent/newcomponent.html',
    pipes: [TranslatePipe]
})
//TODO change class name to <ComponentName>Component
export class NewComponentComponent {
    constructor(private translate:TranslateService) {
    }
}