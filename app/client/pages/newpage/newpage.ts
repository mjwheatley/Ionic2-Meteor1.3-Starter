import {Page, NavController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

//TODO change templateUrl
@Page({
    templateUrl: '/client/pages/newpage/newpage.html',
    pipes: [TranslatePipe]
})
//TODO change class name
export class NewPagePage extends MeteorComponent {
    private user:Meteor.User;

    constructor(private nav:NavController,
                private translate:TranslateService) {
        super();
    }

    ngOnInit():void {
        this.autorun(() => {
            this.user = Meteor.user();
        });
    }
}