## Geolocation app:

# Api's used
>  https://restcountries.com -> returns country stats
>  https://geocode.xyz -> Gets country name using gps coodinates
>  https://flagsapi.com -> Returns flag image using country code
>  JavaScript's inbuilt geolocation object

# App outline
>  When you click where am I button:
1) The whereAmI function is triggered
2) The getPostion function is called to retrieve geolocation using the navigator object.
3) After the coordinates of your location are retrieved they are used to make an api call to the geocode.xyz Api to get the name of the country and return it to the whereAmI function.
4) Next the name comes as a promise and it is chained to the next stage using the then method built into javascript.
5) The Response json is parced to a js object then returned as a promise
6) Next this promise is chained to the next then method where the country is extracted and used as an input for the restcountries api. 
7) The returned data is used in the render function to render a country's statistics.
8) The returned data the coutry code is extracted and used to fetch a flag image from the flagapi.com api
9) neighbour country is extracted from the returned data and used to render the first neighbor