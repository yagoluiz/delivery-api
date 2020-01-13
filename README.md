# Delivery API

Beverage Delivery API, responsible for reporting or nearest point of delivery via geolocation.

## Data information

Data is stored in **MongoDB** database using geolocation.

If desired, the collection for initial data is present in the **database folder**, **partners.json** file.

In the same folder, the **geojson.json** file presents the geolocation of collection partners for viewing on [geojson.io](http://geojson.io/) site.

## Instructions for run project

### npm

For run project and integration testing the database must be run.

- Run application:

`npm start`

or

`npm run dev` (nodemon)

- Test application:

`npm test`

### Container

- Docker Compose:

`docker-compose up -d`

### Endpoints

The **endpoints.http** file has the API endpoints.

In VS Code, install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension to run the tests.

Otherwise, execute the endpoints on the desired tool.
