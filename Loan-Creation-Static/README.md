# Velzon
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Static Loan CBSV2 deployment steps and necessary help commands

## TABLE OF CONTENTS.
   ## CBSV2Loan Webapp UI Links
   ## Common Commands
   ## Build Commands
   ## Dev Deployment Steps   


## HostLoan Webapp UI Links
   1) Dev - http://172.17.17.216:2255/  

## Common Commands
  - Run `npm install` to install all packages and dependencies
  - Run `npm start` to build angular libraries and start the application locally.
    > The above command exectutes the following commands - ng build doc-viewer && ng serve --port 4210 -o
  - Or Run `ng build doc-viewer` to build library manually.
  - Or Run `ng serve` to run application manually.
  - Run `npm audit` to find out package vulnerabilities and fix them on a monthly basis.

## Build Commands
  - For DEV build, run `ng build`
  - For PROD build, run `ng build --production` 

## Dev Deployment Steps
   
   1) Run `npm run build` to build the project (command is added in package.json scripts).
   2) The build artifacts will be stored in the `dist/` directory.
   3) Copy the contents of `dist/cbs-loan` folder.
   54) Remote connect to 172.17.17.216,
      Credentials
      - username: MEMSYNE\emtdrpm
      - password: $indi@/8
   5) After successfully login, open IIS and stop `cbs_loan_static` website.
   6) Go to `E:\cbs_loan_static`.
   7) Copy Paste the contents of dist folder into the above mentioned directory.   
   8) Go to IIS and restart `cbs_loan_static` website.
   9) Open browser and open url to see changes- http://172.17.17.216:2255/
   