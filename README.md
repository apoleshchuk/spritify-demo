Simple build retinafy sprites via grunt task

Usage:

    grunt spritify:path/to/dir/

Sample:

    git clone https://github.com/apoleshchuk/spritify-demo.git
    npm install
    grunt spritify:demo/

Stylus sample:

    $7up = json("demo/sprite__7up.json", { hash: true })
    .icon
        image("demo/sprite__7up.png", unit($7up.properties.width, px), unit($7up.properties.height, px))
        for $name, $data in $7up.coordinates
            &_{$name}
                background-position: unit($data.x, px) unit($data.y, px)
                width: unit($data.width, px)
                height: unit($data.height, px)