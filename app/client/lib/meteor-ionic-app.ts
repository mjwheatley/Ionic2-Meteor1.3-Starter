import 'reflect-metadata';
import 'zone.js/dist/zone';
import {provide, Type, Provider, IterableDiffers, Component} from 'angular2/core';
import {METEOR_PROVIDERS} from 'angular2-meteor';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {IonicApp, IONIC_DIRECTIVES, ionicProviders, TapClick} from 'ionic-angular';

export function MeteorIonicApp(args: any = {}) {
    return function(cls) {
        // get annotations
        let annotations = Reflect.getMetadata('annotations', cls) || [];
        // set selector if undefined
        args.selector = args.selector || 'ion-app';
        // add ionic directives
        args.directives = args.directives ? args.directives.concat(IONIC_DIRECTIVES) : IONIC_DIRECTIVES;
        // create @Component
        annotations.push(new Component(args));
        // redefine with added annotations
        Reflect.defineMetadata('annotations', annotations, cls);
        // wait for meteor platform
        Meteor.startup(function() {
            // define array of bootstrap providers
            let providers = ionicProviders(args).concat(args.providers || [], METEOR_PROVIDERS);
            // bootstrap angular2
            bootstrap(cls, providers).then(appRef => {
                appRef.injector.get(TapClick);
                let app: IonicApp = appRef.injector.get(IonicApp);
                app.setProd(args.prodMode);
            });
        });

        return cls;
    }
}
