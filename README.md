# FCC File Metadata Microservice
Microservice to accept a file and return JSON string with the file size

### Usage

`npm install` to install dependencies.

`npm start` to start server.

Uploading a file returns a JSON string containing the file name and size in bytes.

#### Environment variables

`MAX_FILE_SIZE` to set (you guessed it) max file size in bytes. Default is 1MB if not set.
Note: There is some text under the upload form that says max upload size is 1MB which you might consider changing also.

`SAVE_FILES` - Set this to save files to /uploads. Otherwise, default behavior is to save to memory (and discard after returning file info)

`PORT` to set port. Default is 8080.