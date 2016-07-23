import {Page, NavController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {WelcomeHeaderComponent} from '../../components/welcome-header/welcome-header';
import {LanguageSelectComponent} from "../../components/language-select/language-select";

@Page({
    templateUrl: '/client/pages/home/home.html',
    pipes: [TranslatePipe],
    directives: [WelcomeHeaderComponent, LanguageSelectComponent] // !important! required to get custom component to show up
})
export class HomePage extends MeteorComponent {
    private user:Meteor.User;

    constructor(private nav:NavController, private translate:TranslateService) {
        super();
    }

    ngOnInit():void {
        this.autorun(() => {
            this.user = Meteor.user();
        });
    }
}
