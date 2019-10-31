# Team Alpha Alumni App 2.0

![team alpha alumni app home screenshot](./images/alum-home-screenshot.png)

**Table Of Contents**
- [Project description](#project-description)
- [Installation](#installation)
- [Build](#build)
- [Support](#support)
- [Change log](#change-log)
- [Roadmap](#roadmap)
- [Project Status](#project-status)

#### Project description:
Displays members of Awesome Inc's Team Alpha Alumni members in their current location and other relevant information such as company, position, and contact information.

New version of [old Team Alpha Alumni App](https://github.com/skyebrownh/ta-alum-app)

*languages and frameworks:*
- node.js
- [express](https://expressjs.com/)
- [pug](https://pugjs.org/api/getting-started.html)
- css
- [docker](https://www.docker.com)
- [mapboxgl js](https://www.mapbox.com/)

## Installation

**Requirements/Dependencies:**

*Docker:*

Docker must be installed and running on your host machine to build and run properly. Visit [here](https://docs.docker.com/get-started/) to get setup on your OS.

*Locally:*

Node.js/NPM must be installed to run the app locally ([nodemon](https://nodemon.io/) makes things easier too). Visit [here](https://nodejs.org/en/) to download node/npm.

**Mac OSX and Unix/Linux:**

*Docker:*
  - Pull the image locally: 
    
    `docker image pull skyebrownh/ta-alum-app2:1.1`
  
  - Run a container from the image: 
  
    `docker container run -p 3000:3000 -d --name alumapp skyebrownh/ta-alum-app2:1.1`

*Locally:*
  - Clone this repo: 
    
    `git clone git@github.com:skyebrownh/ta-alum-app-2.git` or `git clone https://github.com/skyebrownh/ta-alum-app-2.git`
  - Run from a command line: 
    
    `npm install`
    
    `npm start`

Visit `localhost:3000` to view your running app

**Necessary Code Switches**

*Docker:*

You can view the [Dockerfile](./Dockerfile) configuration as a reference and run different containerized environments based on this image. Here is the full [docker container reference](https://docs.docker.com/engine/reference/commandline/container/) to get started.

*Locally:*

Nodemon can be interchanged with node in `npm start` script within [package.json](./package.json) for development preferences

## Build
*(contributors only):*
  - After making changes, build a new docker image from your modified code: 
    
    `docker image build -t <your docker id>/ta-alum-app2:<tag> .`
  - Run a container from your new image to test: 
    
    `docker container run -p 3000:3000 -d --name alumapp <your docker id>/ta-alum-app2:<tag>`
  - Login to [DockerHub](https://hub.docker.com/)
  - Then publish to DockerHub: 
    
    `docker push <your docker id>/ta-alum-app2:<tag>`

## Support
If you have any questions you can contact the author. Contact Information is provided at the end of this document.

## Change Log

*Release v1.0.0*
- MVP:
  - landing page complete
  - mapboxgl js CDN used to render map

*Release v1.1.0*
- Bug fix:
  - Changed `nodemon` to `node` within package.json
  - *alternatively, I could have added nodemon as a dev dependency in package.json for it to be installed within the docker container*

## Roadmap
- Configure custom map style with markers, clusters, etc.
- setup [mongodb](https://www.mongodb.com/) database that interacts with the map to display members at their locations and with their relevant information

## Project Status
This project is currently in progress and being updated regularly.

*Author Info:*
- Skye Brown
  - Twitter: @skyebrownh
  - Email: skye.brownh@gmail.com

*Acknowledgements:*
- [Awesome Inc](awesomeinc.org)