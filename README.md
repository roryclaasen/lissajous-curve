# Lissajous Curve Table

> [roryclaasen.github.io/lissajous-curve](https://roryclaasen.github.io/lissajous-curve)

My attempt at a Lissajous Curve Table

## Contents

- [Options](#options)
- [Branches](#branches)
- [License](#license)

## Options

- [Size](#size)
- [Speed](#speed)
- Appearance
  - [Appearance.Color](#appearancecolor)
  - [Appearance.Background](#appearancebackground)
  - [Appearance.Lines](#appearancelines)
  - [Appearance.Points](#appearancepoints)
  - [Appearance.Point_Weight](#appearancepoint_weight)

### Size

| Type   | Default | Min  | Max   |
|:------:|:-------:|:----:|:-----:|
| Number | `120`   | `10` | `300` |

The Size of each ring

### Speed

| Type   | Default | Min | Max   |
|:------:|:-------:|:---:|:-----:|
| Number | `15`    | `1` | `100` |

The speed of the circles

### Appearance.Color

| Type  | Default   |
|:-----:|:---------:|
| Color | `#ffffff` |

Color of the drawing

### Appearance.Background

| Type  | Default   |
|:-----:|:---------:|
| Color | `#000000` |

Background color of the window

### Appearance.Lines

| Type    | Default |
|:-------:|:-------:|
| Boolean | `true`  |

Draw guide lines

### Appearance.Points

| Type    | Default |
|:-------:|:-------:|
| Boolean | `true`  |

Draw Points on the curves

### Appearance.Point_Weight

| Type   | Default | Min | Max  |
|:------:|:-------:|:---:|:----:|
| Number | `6`     | `1` | `20` |

The size of the points being drawn

## Branches

| Branch | Travis CI | Server |
|:-------|:----------|:-------|
| [Master](https://github.com/roryclaasen/lissajous-curve/tree/master) | [![Build Status][CI-master]](https://travis-ci.com/roryclaasen/lissajous-curve) | [GitHub Pages](https://roryclaasen.github.io/lissajous-curve) |

## License

This project is licensed under the MIT License - see the [license file](LICENSE) for details

[CI-master]: https://travis-ci.com/roryclaasen/lissajous-curve.svg?branch=master "Travis CI"
