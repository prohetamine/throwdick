import TWEEN from '@tweenjs/tween.js'

import Meta1 from './../assets/meta-1.svg'
import Meta2 from './../assets/meta-2.svg'
import Meta3 from './../assets/meta-3.svg'
import Meta4 from './../assets/meta-4.svg'
import Meta5 from './../assets/meta-5.svg'
import Meta6 from './../assets/meta-6.svg'
import Meta7 from './../assets/meta-7.svg'
import Meta8 from './../assets/meta-8.svg'
import Meta9 from './../assets/meta-9.svg'
import Meta10 from './../assets/meta-10.svg'
import Meta11 from './../assets/meta-11.svg'
import Meta12 from './../assets/meta-12.svg'
import Meta13 from './../assets/meta-13.svg'
import Meta14 from './../assets/meta-14.svg'

const metas = [
  {
    title: 'meta1',
    image: Meta1,
    x: 240,
    y: 180
  },
  {
    title: 'meta2',
    image: Meta2,
    x: 373,
    y: 470
  },
  {
    title: 'meta3',
    image: Meta3,
    x: 600,
    y: 200
  },
  {
    title: 'meta4',
    image: Meta4,
    x: 900,
    y: 240
  },
  {
    title: 'meta5',
    image: Meta5,
    x: 300,
    y: 790
  },
  {
    title: 'meta6',
    image: Meta6,
    x: 990,
    y: 500
  },
  {
    title: 'meta7',
    image: Meta7,
    x: 800,
    y: 790
  },
  {
    title: 'meta8',
    image: Meta8,
    x: 1330,
    y: 600
  },
  {
    title: 'meta9',
    image: Meta9,
    x: 1170,
    y: 920
  },
  {
    title: 'meta10',
    image: Meta10,
    x: 1340,
    y: 250
  },
  {
    title: 'meta11',
    image: Meta11,
    x: 1740,
    y: 250
  },
  {
    title: 'meta12',
    image: Meta12,
    x: 1740,
    y: 600
  },
  {
    title: 'meta13',
    image: Meta13,
    x: 1500,
    y: 980
  },
  {
    title: 'meta14',
    image: Meta14,
    x: 1299,
    y: 1350
  },
  {
    title: 'meta15',
    image: Meta1,
    x: 1899,
    y: 999
  },
  {
    title: 'meta16',
    image: Meta2,
    x: 290,
    y: 1150
  },
  {
    title: 'meta17',
    image: Meta3,
    x: 1630,
    y: 1410
  },
  {
    title: 'meta18',
    image: Meta4,
    x: 830,
    y: 1170
  },
  {
    title: 'meta19',
    image: Meta5,
    x: 1900,
    y: 1300
  },
  {
    title: 'meta20',
    image: Meta6,
    x: 1000,
    y: 1450
  },
  {
    title: 'meta21',
    image: Meta7,
    x: 520,
    y: 1530
  },
  {
    title: 'meta22',
    image: Meta11,
    x: 200,
    y: 1730
  },
  {
    title: 'meta23',
    image: Meta12,
    x: 680,
    y: 1780
  },
  {
    title: 'meta24',
    image: Meta13,
    x: 1780,
    y: 1700
  },
  {
    title: 'meta25',
    image: Meta2,
    x: 1180,
    y: 1780
  },
  {
    title: 'meta26',
    image: Meta3,
    x: 2080,
    y: 280
  }
]

const canvas = document.createElement('canvas')
canvas.width = 2200
canvas.height = 2000

const parent = document.querySelector('#canvas-background')
parent.appendChild(canvas)

const ctx = canvas.getContext('2d')

window.TWEEN = TWEEN

window.tween = new TWEEN.Tween({ s: 1, r: 0, a: 1 }).to({ s: 0.3, r: 0.5, a: -0.3 }, 1000).easing(TWEEN.Easing.Back.InOut)
window.tween2 = new TWEEN.Tween({ s: 0.3, r: 0.5, a: -0.3 }).to({ s: 1, r: 0, a: 1 }, 1000).easing(TWEEN.Easing.Back.InOut)

let intervalId = null

window.animateBackground = () => {
  if (window.animateBackgroundBlocker === undefined) {
    window.animateBackgroundBlocker = false
  }

  if (window.animateBackgroundBlocker) {
    return
  }

  window.animateBackgroundBlocker = true
  intervalId = setInterval(() => {
    TWEEN.update()
  }, 10)

  setTimeout(() => {
    window.tween.start()
  }, 100)
}

window.tween.onComplete(() => {
  window.tween2.start()
})

window.tween2.onComplete(() => {
  if (intervalId) {
    clearInterval(intervalId)
    window.animateBackgroundBlocker = false
  }
})

window.metaObjects = metas.map(meta => {
  const img = new Image()
  img.src = meta.image

  return ({ ...meta, image: img })
})

const drawing = ({ s, r, a }) => {
  ctx.clearRect(0, 0, 2200, 2000)

  window.metaObjects.map(({ x, y, image }) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(s, s)
    ctx.globalAlpha = a > 0 ? a : 0
    ctx.rotate(r)
    ctx.drawImage(image, -(image.width / 2), -(image.height / 2), image.width, image.height)
    ctx.restore()
  })
}

window.tween.onUpdate(drawing)
window.tween2.onUpdate(drawing)


/*

const config = {
  type: Phaser.CANVAS,
  transparent: true,
  parent: 'canvas-background',
  width: 2200,
  height: 2000,
  mode: Phaser.Scale.FIT,
  scene: {
    preload: function () {
      metas.map(meta => {
        this.load.image(meta.title, meta.image)
      })
    },
    create: function () {
      window.metaObjects = metas.map(
        meta =>
          this.add.image(meta.x, meta.y, meta.title).setOrigin(0.5, 0.5)
      )

      const tween = this.tweens.addCounter({
          from: 0,
          to: 100,
          ease: 'Back.easeInOut',
          duration: 1000,
          onUpdate: function (tween) {
            window.metaObjects.forEach(meta => {
              meta.setAngle(tween.getValue())
              meta.setScale(1 - (tween.getValue() / 100))
              meta.setAlpha(1 - (tween.getValue() / 100))
            })
          }
      })
      tween.stop()

      const tween2 = this.tweens.addCounter({
          from: 100,
          to: 0,
          ease: 'Back.easeInOut',
          duration: 1000,
          onUpdate: function (tween) {
            window.metaObjects.forEach(meta => {
              meta.setAngle(tween.getValue())
              meta.setScale(1 - (tween.getValue() / 100))
              meta.setAlpha(1 - (tween.getValue() / 100))
            })
          }
      })
      tween2.stop()

      window.animateBackground = () => {
        if (window.animateBackgroundBlocker === undefined) {
          window.animateBackgroundBlocker = false
        }

        if (window.animateBackgroundBlocker) {
          return
        }

        window.animateBackgroundBlocker = true
        tween.restart()
        setTimeout(() => {
          tween2.restart()
          setTimeout(() => {
            window.animateBackgroundBlocker = false
          }, 1200)
        }, 1000)
      }
    }
  }
}

window.game = new Phaser.Game(config)
*/
