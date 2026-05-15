# robert-walulya-itofficer-assessment
IT Officer assessment

Stafff can submit, view, and track support requests, while admin can update ticket statuses.

Technologies Used

For Backend

1. Java v17 as my Programming language
2. Spring Boot as my Backend framework
3. Spring Data JPA as my Database

For my Frontend

1. React.js as my Frontend framework
2. JavaScript as my Programming language

For my Database

1. MySQL as my Relational database




How to Run the Project

1. clone the project file from https://github.com/robertrobs/robert-walulya-itofficer-assessment.git

2. Set Up the Database
	Ensure MySQL is running on your machine. The application will automatically create the database and tables on first run.

3. Configure the Backend to connect to db
	Open `./src/main/resources/application.properties` and update your MySQL credentials.

4. Run the Backend
	The backend will start at: http://localhost:8080

5. Run the Frontend
	Open a new terminal
	cd frontend
	npm install
	npm start
	The frontend will start at: http://localhost:3000


API EndPoints 
1. // POST /api/tickets this will create tickets into the database
2. // GET /api/tickets this will return all the tickets from the database
3. // GET /api/tickets/email/{email} this returns all tickets of a given user identified by the email address given
4. // PUT /api/tickets/{id}/status, this is for updating the ticket status



Assumptions Made

1.	No authentication — The system does not implement login or user accounts. Any user can submit tickets and can update statuses.
2.	Email as user identifier — Users identify themselves by email when checking their submitted tickets via the "My Tickets" page.
3.	Single database instance — The application assumes MySQL is running locally on port `3306`.

