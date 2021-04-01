# Electron Shortcuts
An electron-based app inspired by iOS' "Shortcuts" that helps you send HTTP requests

## Use cases
The main use case of this app is to use webhooks to automate things. In my case I wanted to be able to switch on/off my ceiling lamp from my PC, so I used [IFTTT](https://ifttt.com) to connect it to a webhook, then set up two Shortcuts to sent requests to the on/off endpoints.

Some other use cases could be:
- Sending messages on Discord via a webhook
- Sending a request to a server to see its current status
- Connecting to other IoT devices
- Connecting to a RPi or other home server to perform an automation

## How to use
I have so far not put an enormous effort into making this app super user friendly but the process of adding/using shortcuts is pretty straight forward.

To add shortcuts, click the little pen icon at the bottom right of the app window. This will open up file explorer with the 'shortcuts.json' file highlighted. Open the file with your text editor of choice (preferably with JSON syntax highlighting, like VS Code) and add your shortcuts to the array. Shortcuts must follow the following format:

- `name` (required): The name/title of your shortcut to be displayed in the app
- `color` (required): The background color of the shortcut button in the app. Any css color string will do, eg. "red" or "#3959cd"
- `icon` (required): The icon to be displayed above the title. This uses FontAwesome free, so you can search for icons [here](https://fontawesome.com/icons) and pick any of the free ones that you like, eg. "sun" or "ice-cream" (company logos won't work)
- `http` (required): An object that may contain the following things:
  - `url` (required): The URL to the website. Should begin with `https://` or `http://`
  - `options` (optional): An object with the options of the HTTP request. Uses [this API](https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_http_request_url_options_callback). Example: `{ method: 'POST', port: 443 }`
  - `data` (optional): Request body/data. Won't be sent if request method is GET. When sending JSON, it might be necessary to add a content-type header in options

When you're done adding your shortcuts, simply click the little sync button next to the pen icon and the app will load your new shortcuts.

## Request status
When a request is sent, the status will be displayed as a little colored circle in the bottom right of the shortcut button. It shows the following:
- Green: Request was successful and returned a status code that starts with 2, eg. 200 OK
- Yellow: Request was successful, but returned a status code that didn't start with 2, eg. 301 Moved Permanently
- Red: Request failed

If you have a custom endpoint set up you can use this to give certain responses depending on some factor. For example, a RPi can return a yellow light if the oven is on or a green light if it's turned off.

Happy hacking!
