# Nodejs-Angular-Bootstrapper
this is bootstrap structure for nodejs + angular architecture with local,facebook and google authentication integrated.

# Demo

Deploy to your Heroku account for a demo:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Note: Deploy from main repository view to avoid missing app.json error.

# Getting Started

Alright now the fun begins. First clone or download the repo to your computer. 

1. Clone the repository ```git clone git@github.com:DroidNinja/Nodejs-Angular-Bootstrapper.git```.
1. Go into the repository ```cd Nodejs-Angular-Bootstrapper/```.
1. Install dependencies with NPM ```npm install```. This will copy development.json5, and production.json5 from respective sample files in the config/env folder and run the grunt copy task to copy frontend lib files to their destination.
1. Plug in your private and public keys for working with FB and Google into ```/config/env/development.json5``` and/or ```/config/env/production.json5```.
1. Wire up the database connection found in ```/config/env/development.json5``` and/or ```/config/env/production.json5```.
1. Run in production mode with: ```pm2 start pm2-ecosystem.json --env production``` (Run ```sudo npm install -g pm2``` if it's not installed.), or
1. Run in development mode with grunt: ```grunt```
1. Make something awesome!

Now go and open up your browser at [http://localhost:3000](http://localhost:3000)


## Prerequisites
- Node.js - Download and Install Node.js. You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
- MySQL - Download and Install MySQL - Make sure it's running on the default port (3306).

### Tool Prerequisites
- NPM - Node.js package manager, should be installed when you install node.js. NPM (Node Package Manager) will look at the `package.json` file in the root of the project and download all of the necessary dependencies and put them in a folder called ```node_modules```

- Bower - Web package manager, installing Bower is simple when you have npm:
``` npm install -g bower ```

### NPM Modules Used
- [Passport](http://passportjs.org/) - Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more. 
- [Express](http://expressjs.com/) - Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications.
- [Sequelize](http://sequelizejs.com/) - The Sequelize library provides easy access to MySQL, MariaDB, SQLite or PostgreSQL databases by mapping database entries to objects and vice versa. To put it in a nutshell, it's an ORM (Object-Relational-Mapper). The library is written entirely in JavaScript and can be used in the Node.JS environment. 

### Javascript Tools Used
- [Grunt](http://gruntjs.com/) - In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a Grunt can do most of that mundane work for you—and your team—with basically zero effort.

- [Bower](http://bower.io/) - Bower is a package manager for the web. It offers a generic, unopinionated solution to the problem of front-end package management, while exposing the package dependency model via an API that can be consumed by a more opinionated build stack. There are no system wide dependencies, no dependencies are shared between different apps, and the dependency tree is flat.

### Front-End Tools Used
- [Angular.js](http://angularjs.org) - AngularJS is an open-source JavaScript framework, maintained by Google, that assists with running single-page applications. Its goal is to augment browser-based applications with model–view–controller (MVC) capability, in an effort to make both development and testing easier.
- [Twitter Bootstrap](http://getbootstrap.com/) - Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development.
- [UI Bootstrap](http://angular-ui.github.io/bootstrap/) - Bootstrap components written in pure AngularJS by the AngularUI Team

# Forked From

[Mean Stack Relational](https://github.com/jpotts18/mean-stack-relational/)
