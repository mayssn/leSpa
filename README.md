
# Le Spa Amman

## The client portal

Le Spa is one of the highest rated spas in Amman, Jordan.
The theme of the website honors Le Soa's logo which is a waterdrop.
The website itself features the following pages:

- Homepage: with soothing music, a water related gif and quote.
- About us: with text and photos.
- A photo carousel that appears when a photo is clicked.
- Our Services: list of services provided and their prices- divided by service type (body treatments, facial treatments and express treatments).
- Contact us: with the address, email and map of each branch (using Google Maps API).
- The 404 page.

## The landing page

![landing Page](./readme%20photos/home.gif)

## Our Services

![Services](./readme%20photos/services.gif)

## About us and Photo Carousel

When use hovers over a photo, the shadow becomes darker. If the photo is clicked, the photo carousel appears showing an expanded view of that photo along with the back and next buttons. Clicking on "Back" will show the previous photo. Clicking "Next" will show the next photo. If the first photo is expanded then it will not have a back button. If the last photo is expanded, then instead of Next , it will say :the End. Clicking on the End will return user to the About us Page.

![About us](./readme%20photos/about.gif)

## Contact Us

<img src="./readme%20photos/contact.png" alt="about us" width="600" >

## 404 Page

<img src="./readme%20photos/error404.png"  alt="404" width="600" >

# Admin Portal

All of the website's content is stored on MondoDb. The admin portal allows the admin (my mother) to sign in and edit all of the website's content.
This includes editing the quote, editing and deleting services and prices, adding new services and editing the about us section.

## Admin log in

Please keep in mind that the only account that can log in is my mother's account.

<img src="./readme%20photos/login.png"  alt="admin log in" width="600" >

## Admin log in error message

The error message is sent from the back end. If username or password do not match,
the error will say "Invalid username and/or password.<br />
<img src="./readme%20photos/login-password.png"  alt="admin log in error" width="600" >

If on the other hand, the error does not pertain to user name or password, the error will say "Unkown Error. Please contact Mayss" <br />
<img src="./readme%20photos/login-error.png"  alt="admin log in error" width="600" >

## Edit the quote.

<img src="./readme%20photos/editquote.png"  alt="edit quote" width="600" >

Note: Once the user submits the form, the update button is disabled to prevent double submission.

## Edit the about us page.

This page allows us to edit the about us page. But Mongodb doesn't allow for paragraphing. As such, if admin (aka my mother) wants to paragraph, she must type my name: Mayss. When the front end will fetches the text, it will then slice it up into different divs to create different paragraphs.<br />
<img src="./readme%20photos/edit-about.png"  alt="edit about us" width="600" >

## Add a new service

If we create a new service with any null values, it will create problems in the database. as such the submit button is disabled
unless all fields are filled. Furthermore, the update button is disabled after the first click to prevent a double submission.
Note, there is also a reset button that resets the form.

<img src="./readme%20photos/add-service-inactive.png"  alt="add service: inactive submit button" width="600" > <br />
<img src="./readme%20photos/add-service-active.png"  alt="add service: active submit button" width="600" >

## Edit/Delete Service

To prevent user from browsing through a long list of services, they must first select service type.
Furthermore, any fields are left empty then we will keep the original value to prevent any null/empty values.
Because of that, user does not need to fill all the fields in order to submit.
The submit button is however disabled after the first click to prevent double subission.
![edit service](./readme%20photos/edit-services.gif)

Note: each update has a confirmation message.

## Confirmation Pages

Confirmation for updating the quote:<br />

<img src="./readme%20photos/confirmation-quote.png"  alt="confirmation for quote update" width="600" >

Confirmation for updating "About Us":<br />
<img src="./readme%20photos/confirmation-about.png"  alt="confirmation for about us update" width="600" >

Confirmation for deleting a service:<br />
<img src="./readme%20photos/confirmation-delete-service.png"  alt="confirmation for service delete" width="600" >

Confirmation for updating a service:<br />

<img src="./readme%20photos/confirmation-update-service.png"  alt="confirmation for service update" width="600" >

Confirmation for adding a new service:<br />

<img src="./readme%20photos/confirmation-add-service.png"  alt="confirmation for service add" width="600" >
