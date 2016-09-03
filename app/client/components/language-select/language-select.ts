/**
 * Created by mjwheatley on 5/2/16.
 */
import {Component, NgZone} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Constants} from "../../../lib/Constants";

@Component({
    selector: 'language-select',
    templateUrl: '/client/components/language-select/language-select.html',
    pipes: [TranslatePipe]
})
export class LanguageSelectComponent {
    private language:String;
    private langCode:String;

    constructor(private zone:NgZone,
                private translate:TranslateService,
                private alertCtrl:AlertController) {
        this.setLanguage();
    }

    ngOnInit():void {
        Tracker.autorun(() => this.zone.run(() => {
            if (Session.get(Constants.SESSION.LANGUAGE)) {
                this.setLanguage();
            }
        }));
    }

    private selectLanguage() {
        let alert = this.alertCtrl.create({
            title: this.translate.instant("language-select.header"),
            inputs: [
                {type: 'radio', label: 'English', value: 'en', checked: (this.langCode === "en")},
                {type: 'radio', label: 'Español', value: 'es', checked: (this.langCode === "es")}
            ],
            buttons: [
                {
                    text: this.translate.instant("general.cancel")
                },
                {
                    text: this.translate.instant("general.ok"),
                    handler: data => {
                        Session.set(Constants.SESSION.LANGUAGE, data);
                        this.translate.use(data);
                        this.setLanguage();
                    }
                }
            ]
        });
        alert.present();
    }

    private setLanguage() {
        this.langCode = Session.get(Constants.SESSION.LANGUAGE);
        let language = "";
        if (this.langCode === "en") {
            language = "English"
        } else if (this.langCode === "es") {
            language = "Español";
        }
        this.language = language;
    }
}