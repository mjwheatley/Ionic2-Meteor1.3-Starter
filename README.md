
#Getting Started
`npm install` will load all the dependencies for angular2-meteor, ionic2, and dev dependencies for building the application.
`npm start` will run the scripts in the package.json to build and start the application.

The scripts in package.json help build the application by using "node-sass" and telling it to include the ionic-framework
and ionicons node modules when compiling the scss files, "copyfiles" to copy the needed fonts to the applications public 
directory, and "nodemon" to watch for changes in scss files and rebuild on the fly.  Finally they will execute meteor run,
passing in a settings.json, to build and start the meteor application.
