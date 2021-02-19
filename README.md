# SetupRc-API-NestJs

This is a Nest.JS API built on Mongoose Database. This creates the CRUD and additional endpoints for the SetupRC Application.

## Project Setup

To start this up you will need the following enviroment variables:<br />

<ul>
<b>*</b> Indicates required
<li><b>*DATBASEURL:</b> This is the Database URL to your MongoDB/Atlas.</li>
<li><b>PORT:</b> This is the port the api will listen on</li>
<li><b>REDIS_ADDRESS:</b> This is the port the redis is on</li>
</ul>

## `npm run start`

This will start the API up in produciton mode, and no have watch mode enabled. Meaning if you make a change to a file you will need to kill the process and restart it again.

## `npm run start:dev`
This starts the api in watch mode. Meaning if you make a change in a file it will automatically recompile since we are using nodemon. If you change an enviroment variable (Like Database Connection), you will still need to restart the api.

## `npm run format`
This will format the project based off of the .prettier file, if there is no prettier file in the project it will be configured off of 

## `npm run build`
This will build the project using the nest compiler which is base off of nest-cli and tsconfig-build.json. After this is done you can use /dist folder for serving your api.

## `npm run test`
This runs the unit test using JEST.

## `npm run test:e2e`
This runs the unit test using JEST e2e.

