import {MeteorComponent} from 'angular2-meteor';
import {App, IonicApp, Platform} from 'ionic-framework/index';
import {Component, NgZone, provide} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

/*********/
/* Pages */
import {HomePage} from './pages/home/home';

declare var Session;

@App({
    templateUrl: '/client/app.html',
    config: { // http://ionicframework.com/docs/v2/api/config/Config/
        //mode: 'md',
        //pageTransition: 'ios',
        //swipeBackEnabled: false,
        //tabbarPlacement: 'top'
    },
    providers: [
        HTTP_PROVIDERS,
        provide(TranslateLoader, {
            useFactory: (http:Http) => new TranslateStaticLoader(http, '/i18n', '.json'),
            deps: [Http]
        }),
        TranslateService
    ],
    pipes: [TranslatePipe]
})
class MyApp extends MeteorComponent {
    // Set the root (or first) page
    rootPage:any;
    pages:Array<{icon?: string, title: string, component: any}>;
    appName:string;
    //user:Meteor.User;

    constructor(private app:IonicApp,
                private platform:Platform,
                private zone:NgZone,
                private translate:TranslateService) {
        super();
        this.translate = translate;
        this.initializeApp();

        // set the root (or first) page
        //if (Meteor.user()) {
            this.rootPage = HomePage;
        //} else {
        //    this.rootPage = LoginPage;
        //}

        // set the nav menu title to the application name from settings.json
        this.appName = Meteor.settings.public.appName;

        // set our app's pages
        this.pages = [
            {icon: "home", title: 'home.title', component: HomePage},
        ];

        Tracker.autorun(() => zone.run(() => {
            // Use this to update component variables based on reactive sources.
            // (i.e. Monogo collections or Session variables)
        }));
    }

    initializeApp() {
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


            this.initializeTranslateServiceConfig();
        });
    }

    initializeTranslateServiceConfig() {
        var prefix = '/i18n/';
        var suffix = '.json';

        var userLang = navigator.language.split('-')[0];
        userLang = /(en|es)/gi.test(userLang) ? userLang : 'en';

        this.translate.setDefaultLang('en');
        let langPref = Session.get('language');
        if (langPref) {
            userLang = langPref;
        }
        Session.set('language', userLang);
        this.translate.use(userLang);
    }

    openPage(page) {
        let setRoot = false;
        if (page.component === HomePage) {
            setRoot = true;
        }
        this.navigate({page: page.component, setRoot: setRoot});
    }

    logout():void {
        Meteor.logout();
        //this.navigate({page: LoginPage, setRoot: true});
    }

    navigate(location:{page:any, setRoot:boolean}):void {
        // close the menu when clicking a link from the menu
        // getComponent selector is the component id attribute
        this.app.getComponent('leftMenu').close();
        // navigate to the new page if it is not the current page
        let nav = this.app.getComponent('nav');
        if (location.setRoot) {
            //nav.setRoot(location.page);
            nav.popToRoot();
        } else {
            nav.push(location.page);
        }
    }
}