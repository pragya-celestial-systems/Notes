# Notes
It's a fullstack project which is created using MERN stack. The project is mainly designed to view, create, update or delete notes.

All The features of the app are listed below - 

## Features
- User can create, view, update or delete the notes.
- User can set the different color for the different notes.
- The deleted notes will not be deleted permanently. They will be moved to the trash folder.
- User can restore or delete the note permanently from the trash folder.

### Notes API
This API handles CRUD operations for all the notes. The API endpoints are listed below -
### **/api**
- **get** - Fetch all the notes.
- **post** - Add a new note
- **delete/:noteId** - Delete a particular note temporarily.
- **patch/:noteId** - Update a note

### Trash Notes API
This API handles CRUD operations for the deleted notes. 
The API endpoints are listed below -
### **/api/trash**
- **get** - Fetch all the deleted notes that are deleted by using the above API's delete method.
- **post** - Add a new note in the trash. This moves the note from the trash collection to the all notes collection.
- **delete/:noteId** - Delete a particular note permanently.


## Installation
You can install and run the app on your system by following the steps below - 

### Clone the repository.
   
      ``` git clone https://github.com/pragya-celestial-systems/Notes.git```

### Steps to setup the server

1. Install the dependencies
     
      ``` npm run build:backend ```

2. Run the server.

      ``` npm run start:backend ```

### Steps to setup the client

1. Install the dependencies
     
      ``` npm run build:frontend ```

2. Run the server. 

      ``` npm run start:frontend ```



 
