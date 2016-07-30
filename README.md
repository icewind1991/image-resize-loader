# image-resize-loader

Automatically resize loaded images

## Installation

`npm install --save-dev loader-utils jimp image-resize-loader`

## Usage

`image-resize-loader` will automatically resize any image that has a `?width=x` query string

```js
loaders: [
    {
        test: /.*\.(png|jpg)(\?.+)?$/i,
        loaders: [
            'file',
            'image-converter'
        ]
    },
    ...
]
```
