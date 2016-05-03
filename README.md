
#Getting Started
```
git clone https://github.com/mjwheatley/Ionic2-Meteor1.3-Starter.git

cd Ionic2-Meteor1.3-Starter/app/

mkdir public/stylesheets

npm install

npm start
```

`npm install` will load all the dependencies for angular2-meteor, ionic2, and dev dependencies for building the application.


`npm start` will run the scripts in the package.json to build and start the application.

The scripts in package.json help build the application by using "node-sass" to include the ionic-angular and ionicons node modules when compiling the scss files, "copyfiles" to copy the needed fonts to the applications public directory, and "nodemon" to watch for changes in scss files and rebuild on the fly.  Finally they will execute meteor run, passing in a settings.json, to build and start the meteor application.


#Ionic stylesheets
The build script will output platform specific css bundles into the public/stylesheets/ directory that we created.
The client/index.html includes links to these stylesheets.
The method setStyle() in client/app.ts file will set only one of the stylesheets to be active based on the platform style class that Ionic adds to the body tag.