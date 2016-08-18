import 'reflect-metadata';
import 'zone.js/dist/zone';
import {provide, Type, Provider, IterableDiffers, Component, PLATFORM_DIRECTIVES, enableProdMode} from '@angular/core';
import {METEOR_PROVIDERS} from 'angular2-meteor';
import {IONIC_DIRECTIVES, ionicProviders, ionicBootstrap} from 'ionic-angular';
declare var Reflect;

export function MeteorIonicApp(args:any) {
    return function(cls) {
        // get annotations
        let annotations = Reflect.getMetadata('annotations', cls) || [];
        // set selector if undefined
        args.selector = args.selector || 'ion-app';
        // if no template was provided, default so it has a root <ion-nav>
        if (!args.templateUrl && !args.template) {
            args.template = '<ion-nav></ion-nav>';
        }
        // create @Component
        annotations.push(new Component(args));
        // redefine with added annotations
        Reflect.defineMetadata('annotations', annotations, cls);
        // wait for meteor platform
        Meteor.startup(function() {
            // define array of bootstrap providers
            var providers = ionicProviders(args.providers).concat(args.providers || [], METEOR_PROVIDERS);
            // auto add Ionic directives
            let directives = args.directives ? args.directives.concat(IONIC_DIRECTIVES) : IONIC_DIRECTIVES;
            // automatically provide all of Ionic's directives to every component
            providers.push(provide(PLATFORM_DIRECTIVES, { useValue: [directives], multi: true }));
            if (args.prodMode) {
                enableProdMode();
            }
            ionicBootstrap(cls, providers, args.config);
            return cls;
        });

        return cls;
    }
}
