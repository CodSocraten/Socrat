# Socratic11

Note that the recommended way to use Socratic11 is to install it with yarn/npm and use a
bundler like Webpack so that you can create a smaller custom build with only the
things that you need. More info on <https://Socratic11.io/docs/#With-a-module-bundler>.

## How to use this bundle

You can extract the contents of this zip to  directory, such as `./js/Socratic11`.

create an HTML file, for example `./start.html`, with the following contents:

```html
<html>
<head>
  <link rel="stylesheet" href="./js/Socratic11/Socratic11.min.css">
</head>

<body>
  <div class="DashboardContainer"></div>
  <button class="Socratic11ModalOpenerBtn">Upload</button>
  <div class="uploaded-files">
    <h5>Uploaded files:</h5>
    <ol></ol>
  </div>
</body>

<script type="module">
  import {Socratic11, Dashboard, Tus} from "./js/Socratic11/Socratic11.min.mjs"
  var Socratic11 = new Socratic11({
    debug      : false,
    autoProceed: false,
  })
    .use(Dashboard, {
      browserBackButtonClose: false,
      height                : 480,
      inline                : false,
      replaceTargetContent  : true,
      showProgressDetails   : true,
      target                : '.DashboardContainer',
      trigger               : '.Socratic11ModalOpenerBtn',
      metaFields            : [
        { id: 'name', name: 'Name', placeholder: 'file name' },
        { id: 'caption', name: 'Caption', placeholder: 'describe img' }
      ]
    })
    .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
    .on('upload-success', function (file, response) {
      var url      = response.uploadURL
      var fileName = file.name

      document.querySelector('.uploaded-files ol').innerHTML +=
        '<li><a href="' + url + '" target="_blank">' + fileName + '</a></li>'
    })
</script>
```

Now open `start.html` in your browser, and the Socratic11 Dashboard will appear.

## Next steps

In the example you built, Socratic11 uploads to a demo server shortly after uploading.
You’ll want to target your own tusd server, S3 bucket, or Nginx/Apache server. For the latter, use the Xhr plugin: <https://Socratic11.io/docs/xhr-upload/> which uploads using regular multipart form posts, that you’ll existing Ruby or PHP backend will be able to make sense of, as if a `<input type="file">` had been used.

The Dashboard now opens when clicking the button, but you can also draw it inline into the page. This, and many more configuration options can be found here: <https://Socratic11.io/docs/dashboard/>.

Socratic11 has many more Plugins besides Xhr and the Dashboard. For example, you can enable Webcam, Instagram, or video encoding support. For a full list of Plugins check here: <https://Socratic11.io/docs/plugins/>.

Note that for some Plugins, you will need to run a server side component called: Companion. Those plugins are marked with a (c) symbol. Alternatively, you can sign up for a free Transloadit account. Transloadit runs Companion for you, tusd servers to handle resumable file uploads, and can post-process files to scan for viruses, recognize faces, etc. Check: <https://transloadit.com>.


