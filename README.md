# Parallax
A simple little JS parallax library.

## Installation
You can either download and include the script as usual, or link to the version I'm hosting for myself:

```<script src="https://cdn.hypnoticowl.com/parallax.min.js"></script>```

## Usage
When the page is loaded, add the parallax layers and initialize like so:

```
<script>
  window.onload = () => {
    Parallax.add({ id: "background", url: "/path/to/background.png", width: 1920, height: 1080, z: 10 });
    Parallax.add({ id: "middle",     url: "/path/to/middle.png",     width: 1920, height: 1080, z: 20 });
    Parallax.add({ id: "foreground", url: "/path/to/foreground.png", width: 1920, height: 1080, z: 50 });
    Parallax.init("#containerID");
  };
</script>
```

The minimum needed is the `id`, `url`, `width`, and `height`. The `z` value is essentially a speed percentage (i.e. ```z: 10``` means it moves at 10% scroll speed).

## Customization
There's a bunch of filters and transformations that can be applied to the layers:

| Option     | Description                        | Default      |
|------------|------------------------------------|--------------|
| id*        | Layer ID                           |              |
| url*       | Path to Image File                 |              |
| height*    | Layer Height                       |              |
| width*     | Layer Width                        |              |
| repeat     | Background Tiling                  | `no-repeat`  |
| x          | Horizontal Offset                  | `0`          |
| y          | Vertical Offset                    | `0`          |
| z          | Scroll Speed                       | `100`        |
| sX         | Horizontal Scroll Speed Multiplier | `1`          |
| sY         | Vertical Scroll Speed Multiplier   | `1`          |
| opacity    | Layer Opacity                      | `100`        |
| scale      | Layer Scale                        | `1`          |
| rotation   | Layer Rotation                     | `0`          |
| contrast   | Filter Contrast                    | `100`        |
| brightness | Filter Brightness                  | `100`        |
| saturation | Filter Saturation                  | `100`        |
| hue        | Filter Hue Shift                   | `0`          |
| blur       | Filter Blur                        | `0`          |
| grayscale  | Filter Grayscale                   | `0`          |
| invert     | Filter Invert                      | `0`          |
| sepia      | Filter Sepia                       | `0`          |

*Mandatory fields

## Methods

| Function        | Description                                                |
|-----------------|------------------------------------------------------------|
| add(options)    | Add new layer (Options listed above)                       |
| init(container) | Initialize the Parallax effect with the container selector |
| destroy()       | Remove and destroy the Parallax effect                     |

## Events

| Event    | Description                            |
|----------|----------------------------------------|
| onAdd    | Called after adding a layer            |
| onInit   | Called after initializing              |
| onResize | Called after resizing, before onScroll |
| onScroll | Called after position updates          |
