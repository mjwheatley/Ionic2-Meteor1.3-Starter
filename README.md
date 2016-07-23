#Updated to Ionic2 Beta 10

###Please review the [Ionic2 changelog](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md)

###Meteor 1.3.2.1
###Ionic2 Beta 10
###Angular rc3

#Getting Started
```
git clone https://github.com/mjwheatley/Ionic2-Meteor1.3-Starter.git

cd Ionic2-Meteor1.3-Starter/app/

npm install

npm start
```

`npm install` will load all the dependencies for angular2-meteor, ionic2, and dev dependencies for building the application.


`npm start` will run the scripts in the package.json to build and start the application.

The scripts in package.json help build the application by using "node-sass" to include the ionic-angular and ionicons node modules when compiling the scss files, "copyfiles" to copy the needed fonts to the applications public directory, and "nodemon" to watch for changes in scss files and rebuild on the fly.  Finally they will execute meteor run, passing in a settings.json, to build and start the meteor application.

#Meteor Settings
This application is dependant on a settings.json file containing a key/value pair for the application name.
The line of code is in ngOnInit() of the app.ts file.

```
// set the nav menu title to the application name from settings.json
this.appName = Meteor.settings.public.appName;
```

If you use `meteor run` to start the application you must also include `--settings ../config/development/settings.json` to get the application to run correctly.

#Ionic stylesheets
The build script will output platform specific css bundles into the public/stylesheets/ directory that we created.
The client/index.html includes links to these stylesheets.
The method setStyle() in client/app.ts file will set only one of the stylesheets to be active based on the platform style class that Ionic adds to the body tag.

#Mobile platforms
To run this application on a mobile device you will need to edit the package.json file.
Change the `meteor` script to the following:

```
"meteor": "meteor run ios-device --settings settings.json",
```

Then start the application the same as usual.

```
npm start
```

