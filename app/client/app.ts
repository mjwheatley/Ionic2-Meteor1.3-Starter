import {MeteorComponent} from 'angular2-meteor';
import {App, Platform} from 'ionic-angular';
import {Component, NgZone, provide, ViewChild} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {MeteorIonicApp} from "./lib/_meteor-ionic-app";
import {Constants} from "../lib/Constants";

/*********/
/* Pages */
import {HomePage} from './pages/home/home';

declare var Meteor;
declare var device;

@MeteorIonicApp({
    templateUrl: '/client/app.html',
    providers: [
        HTTP_PROVIDERS,
        provide(TranslateLoader, {
            useFactory: (http:Http) => new TranslateStaticLoader(http, '/i18n', '.json'),
            deps: [Http]
        }),
        TranslateService
    ],
    //config: { // http://ionicframework.com/docs/v2/api/config/Config/
    //    //mode: Constants.STYLE.MD,
    //    //pageTransition: Constants.STYLE.IOS,
    //    //swipeBackEnabled: false,
    //    //tabbarPlacement: 'top'
    //},
    pipes: [TranslatePipe]
})
class MyApp extends MeteorComponent {
    // Set the root (or first) page
    private rootPage:any = HomePage;
    private pages:Array<IPage>;
    private appName:string;
    private user:Meteor.User;

    @ViewChild('leftMenu') leftMenu:any;
    @ViewChild('content') nav:any;

    constructor(private app:App,
                private platform:Platform,
                private zone:NgZone,
                private translate:TranslateService) {
        super();
        this.initializeApp();
    }

    ngOnInit():void {

        // set the nav menu title to the application name from settings.json
        this.appName = Meteor.settings.public.appName;

        // set our app's pages
        // title references a key in the language JSON to be translated by the translate pipe in the HTML
        this.pages = [
            {icon: "home", title: "home.title", component: HomePage, rootPage: true},
        ];

        Tracker.autorun(() => this.zone.run(() => {
            // Use this to update component variables based on reactive sources.
            // (i.e. Monogo collections or Session variables)

            // User will be null upon initialization
            this.user = Meteor.user();
            console.log("user: ", this.user);

            // Meteor.user() is a reactive variable.
            if (Meteor.user()) {
                // Do something when user is present after initialization or after log in.
            }
        }));

        Tracker.autorun(() => this.zone.run(() => {
            if (Session.get(Constants.SESSION.PLATFORM_READY)) {
                this.platformReady();
            }
        }));
    }

    private initializeApp() {
        this.platform.ready().then(() => {
            // The platform is now ready. Note: if this callback fails to fire, follow
            // the Troubleshooting guide for a number of possible solutions:
            //
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //
            // First, let's hide the keyboard accessory bar (only works natively) since
            // that's a better default:
            //
            // Keyboard.setAccessoryBarVisible(false);
            //
            // For example, we might change the StatusBar color. This one below is
            // good for dark backgrounds and light text:
            // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)

            Session.set(Constants.SESSION.PLATFORM_READY, true);
        });
    }

    private platformReady():void {
        this.initializeTranslateServiceConfig();
        this.setStyle();
    }

    private initializeTranslateServiceConfig() {
        var prefix = '/i18n/';
        var suffix = '.json';

        var userLang = navigator.language.split('-')[0];
        userLang = /(en|es)/gi.test(userLang) ? userLang : 'en';

        this.translate.setDefaultLang('en');
        let langPref = Session.get(Constants.SESSION.LANGUAGE);
        if (langPref) {
            userLang = langPref;
        }
        Session.set(Constants.SESSION.LANGUAGE, userLang);
        this.translate.use(userLang);
    }

    private openPage(page:IPage) {
        this.navigate({page: page.component, setRoot: page.rootPage});
    }

    private logout():void {
        this.user = null;
        Meteor.logout();
        //this.navigate({page: LoginPage, setRoot: true});
    }

    private navigate(location:{page:any, setRoot:boolean}):void {
        // close the menu when clicking a link from the menu
        // getComponent selector is the component id attribute
        this.leftMenu.close().then(() => {
            if (location.setRoot) {
                this.nav.setRoot(location.page);
            } else {
                if (location.page) {
                    // navigate to the new page if it is not the current page
                    let viewCtrl = this.nav.getActive();
                    if (viewCtrl.componentType !== location.page) {
                        this.nav.push(location.page);
                    }
                }
            }
        });
    }

    private setStyle():void {
        // Change value of the meta tag
        var links:any = document.getElementsByTagName("link");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (link.getAttribute("rel").indexOf("style") != -1 && link.getAttribute("title")) {
                link.disabled = true;
                if (link.getAttribute("title") === this.getBodyStyle())
                    link.disabled = false;
            }
        }
    }

    private getBodyStyle():string {
        var bodyTag:any = document.getElementsByTagName("body")[0];
        var bodyClass = bodyTag.className;
        var classArray = bodyClass.split(" ");
        var bodyStyle = classArray[0];
        return bodyStyle;
    }
}

interface IPage {
    icon?:string,
    title:string,
    component:any,
    rootPage:boolean
}