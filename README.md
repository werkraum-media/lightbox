# Description

Get a nice lightbox with different options

# Installation

`npm i lightboxcrpozo --save`

https://www.npmjs.com/package/lightbox-crpozo

```
import { SetupLightboxContainer } from 'lightbox-crpozo'

SetupLightboxContainer({
    interval_time: 5000,
    arrow_mode: true,
    effect_type: "fade"
});
```
Inside the demo folder is the index.html demo file.

# Usage

```
    // lightbox.js
    <div id="lightbox-container">
        <div class="row">
            <img class="col-md-6 lightbox-bootstrap" src="https://minimalistphotographyawards.com/wp-content/uploads/2019/07/Katzberg_Achim_play-the-barrel-organ-1024x682.jpg">
            <img class="col-md-6 lightbox-bootstrap" src="https://www.creativeboom.com/uploads/articles/3e/3e5f600afee7b2539913340e2b9ac558b59584de_810.jpg">
        </div>
    </div>
```

# Demo
<img src="demo/images/demo.PNG">
<img src="demo/images/demo2.PNG">


# Options

* *interval_time* - _number/false (false stops the looping)
* *arrow_mode* - _boolean (Defaults to true)
* *effect_type* - _fade/normal