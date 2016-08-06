# static-http

Isn't it annoying to write a little `server.js` file everytime you're fooling around with HTML and JS?

Well you can just:

    npm install static-http
  
And navigate to your folder with `cd` and then:

    $ cd path-to/my-awesome-folder
    $ ls
    > awesome.html code.js style.css
    $ static-http `pwd`
    > [*] Static server running on port 3600, serving files from: path-to/my-awesome-folder
  
Now that you've got a static HTTP server running on port 3600, point your browser at `http://localhost:3600/awesome.html` and voilà!

### port

If you want to specify another port:

    $ static-http `pwd` --port 1234
  
Or:

    $ static-http `pwd` -p 1234
  
If there's something running on the port you chose, it will let you know.

    [ERROR] The specified port 3600 is already in use.
    Please, choose another port.
