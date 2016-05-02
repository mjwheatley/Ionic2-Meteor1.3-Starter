import {Page, NavController} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {WelcomeHeaderComponent} from '../../components/welcome-header/welcome-header';
import {LanguageSelectComponent} from "../../components/language-select/language-select";

@Page({
    templateUrl: '/client/pages/home/home.html',
    pipes: [TranslatePipe],
    directives: [WelcomeHeaderComponent, LanguageSelectComponent]
})
export class HomePage {
    constructor(private nav:NavController, private translate:TranslateService) {
    }

    private menuClick(){
        console.log("Clicked on the menu button.");
    }
}
