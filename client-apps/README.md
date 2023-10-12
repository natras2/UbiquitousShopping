# UbiquitousShopping: Client apps logic & UI 

This subfolder contains the implementing source code for the Client applications involved by our project. 

We are addressing specifically two subject:
- Customer
- Sales assistant

For the only reason of simplicity while delivering the demo, the deployment involves the shared access to a single application for both Customers and Sales assistants: in a Production environment may be worth of consideration a separate deployment for the two application, to ensure data encapsulation.

The application has been developed as a Progressive Web App and it has been written in React. It is delivered using GH Pages, through a dedicated branch that contains the code of the application, build for deployment. 

The process of deployment to GH Pages is triggered as follows: 
```
npm run build
gh-pages -d build
```

The web app is hosted at [ubishop.it](https://www.ubishop.it).
