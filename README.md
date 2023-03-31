# CookingApp

Still very much a work in progress, if you've somehow found your way here; 

"These aren't the droids you are looking for....."


npm install


Uses MongoDB for database & cloudinary for media uploads, and google for User Auth


Needs a .env file in config folder with: 

"PORT" to set which port, 

"DB_STRING" your connection to MongoDB, 

"CLOUD_NAME", 

"API_KEY", 

"API_SECRET" all from cloudinary


Create a google project in the cloud console, and get your client_id and client secret, and set your callback_url, then pop those into the config as well

"GOOGLE_CLIENT_ID",

"GOOGLE_CLIENT_SECRET",

"GOOGLE_CALLBACK_URL" 
