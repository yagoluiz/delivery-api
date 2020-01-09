#! /bin/bash

mongoimport --host mongodb --db delivery --collection partners --type json --file /database/partners.json --jsonArray