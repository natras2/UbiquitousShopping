# UbiquitousShopping: Web server and API endpoints

This subfolder contains the implementing source code for the backend microservices and API endpoints involved by our project.

Specifically, the application is divided in 8 subfolders, one for the database configuration file, one for the model files and six for the microservice (in brackets) we've identified:

- `/auth` (Authentication service)
- `/shopping` (Shopping service)
- `/account` (Account management service)
- `/checkout` (Checkout service)
- `/store` (Store management service)

This division is meant at confining as much as possible the scope of interoperating functions within the same microservice. 

Of course, some of the defined operations work and are used across the different microservices. 
For example, the authentication function that validates the client's JWT, which is defined under **/auth** and used by almost any API endpoint.

The backend infrastructure is written in Node.js, and uses the Express.js framework. 
It is delivered to Google Cloud through a CI/CD mechanism, triggered by GH Actions any time an edit to the source code is pushed to this subfolder.
The source code is build to deployment, deployed as an Artifact to Google Cloud Artifact Registry and then runned by Google Cloud Run.

The API endpoints are accessible at [api.ubishop.it](https://api.ubishop.it). 

An OpenAPI Specification of the endpoints can be found [here](https://github.com/natras2/UbiquitousShopping/blob/main/documentation/3.SoftwareArchitecture/endpoints/openapi.json).
