
## Sona React Native Challenge
My approach for this challenge was to ensure that domain logic is isolated from
the display logic for the app. In this scenario I have isolated it using hooks
to encapsulate the url behaviours. The views then use these hooks to access the
url list and assosciated functions for manipulating it and verifying the urls.

In a more complex scenario we could refactor this further by having the hook
call out to a separate service that encapsulates the more complex workflows.
The hook makes use of zustand to subscribe to data changes and update the store. The
zustand store has been sliced by domain to reduce the domains scope access.

### Requirements
To run the app on your device you should install the `expo go` app from
the appropriate app store.

### How to run
To run the app using expo go run:

`npm run start`

Then scan the QR code with your mobile phone to open the app in expo go.

Alternatively you can run in the simulator by selecting either `a` or `i` from
the options presented once expo has finished initialising. This will open expo
on the simulator device.

### How to use
You can scan urls using the camera view on the `scan` page. You will be prompted
to discard or save the url if a valid url can be found in the cameras view.

On the management screen you can long press on an item to open it in the web browser. 
To delete items you can swipe from right to left on an item to remove it from the list.

### Tests
I have unfortunately not had time to fully implement a test suite for this
challenge. However, my standard approach is to do boundary layer testing using
`react native testing library` to test the screens in a manner that a user would.
This typically means you mock out less items to reduce how brittle the tests
are to changes in the domain layer, and instead approach them like a user would, with
no knowledge of the domain layer. 

There is scope to add unit tests to the store however, since this is performing some
mapping logic, but there is an argument this could be handled via the user style 
testing of the UI instead.

### Next steps
The next steps for this project would be:
- Isolate the common components to a component library e.g. title text, body text, popup etc...
- Encapsulate more of the common styles beyond colour, for example font sizes, to align with the component library design
