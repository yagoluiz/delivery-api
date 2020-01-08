#! /bin/bash

mongoimport --host mongo-db --db delivery --collection partners --type json --file /database/partners.json --jsonArray