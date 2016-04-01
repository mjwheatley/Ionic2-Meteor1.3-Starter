import {Page, NavController} from 'ionic-framework/index';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {WelcomeHeaderComponent} from '../../components/welcome-header/welcome-header';

@Page({
    templateUrl: '/client/pages/home/home.html',
    pipes: [TranslatePipe],
    directives: [WelcomeHeaderComponent]
})
export class HomePage {
    constructor(private nav:NavController,
                private translate:TranslateService
    ) {
        this.nav = nav;
        this.translate = translate;
    }

    menuClick(){
        console.log("Clicked on the menu button.");
    }
}
