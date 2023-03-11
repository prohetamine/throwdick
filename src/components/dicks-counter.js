import BigNumber from 'bignumber.js'
import React, { useRef, useState, useEffect, forwardRef } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import normalizeCount from './../lib/normalize-count'
import dick from './../assets/dick.svg'
import heart from './../assets/heart.svg'
import heartAnimation0 from './../assets/heart-animation-0.svg'
import heartAnimation1 from './../assets/heart-animation-1.svg'
import heartAnimation2 from './../assets/heart-animation-2.svg'
import heartAnimation3 from './../assets/heart-animation-3.svg'
import heartAnimation4 from './../assets/heart-animation-4.svg'
import heartAnimation5 from './../assets/heart-animation-5.svg'
import heartAnimation6 from './../assets/heart-animation-6.svg'
import heartAnimation7 from './../assets/heart-animation-7.svg'
import heartAnimation8 from './../assets/heart-animation-8.svg'
import dickAnimation0 from './../assets/dick-animation-0.svg'
import dickAnimation1 from './../assets/dick-animation-1.svg'
import dickAnimation2 from './../assets/dick-animation-2.svg'
import dickAnimation3 from './../assets/dick-animation-3.svg'
import dickAnimation4 from './../assets/dick-animation-4.svg'
import dickAnimation5 from './../assets/dick-animation-5.svg'
import dickAnimation6 from './../assets/dick-animation-6.svg'
import dickAnimation7 from './../assets/dick-animation-7.svg'
import dickAnimation8 from './../assets/dick-animation-8.svg'

const DicksBody = styled(motion.div)`
  position: absolute;
  user-select: none;
`

const DicksAnimation = forwardRef((props, ref) => {
  return (
    <DicksBody
      {...props}
      ref={ref}
      style={{
        x: '0px',
        y: '-70px'
      }}
    >
      <img src={dickAnimation0} />
    </DicksBody>
  )
})

const HeartsAnimation = forwardRef((props, ref) => {
  return (
    <DicksBody
      {...props}
      ref={ref}
      style={{
        x: '0px',
        y: '-70px'
      }}
    >
      <img src={heartAnimation0} />
    </DicksBody>
  )
})

const dickAnimations = [
  dickAnimation1,
  dickAnimation2,
  dickAnimation3,
  dickAnimation4,
  dickAnimation5,
  dickAnimation6,
  dickAnimation7,
  dickAnimation8
]

const heartAnimations = [
  heartAnimation1,
  heartAnimation2,
  heartAnimation3,
  heartAnimation4,
  heartAnimation5,
  heartAnimation6,
  heartAnimation7,
  heartAnimation8
]

const pushDick = (ref, x = 1) => {
  const node = ref.current

  if (!node) { return }

  for (let i = 0; i < x; i++) {
    setTimeout(() => {
      const random = parseInt(Math.random() * dickAnimations.length)
      const image = dickAnimations[random]

      const animate = new Image()
      animate.style = 'position: absolute; left: 0px; top: 0px;opacity: 0'
      animate.src = image+'?r='+Math.random()
      animate.onload = () => {
        setTimeout(() => {
          animate.remove()
        }, 1000)

        setTimeout(() => {
          animate.style.opacity = 1
        }, 20)
        node.appendChild(animate)
      }
    }, i * 500)
  }
}

const pushHeart = (ref, x = 1) => {
  const node = ref.current

  if (!node) { return }

  for (let i = 0; i < x; i++) {
    setTimeout(() => {
      const random = parseInt(Math.random() * heartAnimations.length)
      const image = heartAnimations[random]

      const animate = new Image()
      animate.style = 'position: absolute; left: 0px; top: 0px;opacity: 0'
      animate.src = image+'?r='+Math.random()
      animate.onload = () => {
        setTimeout(() => {
          animate.remove()
        }, 1000)

        setTimeout(() => {
          animate.style.opacity = 1
        }, 20)
        node.appendChild(animate)
      }
    }, i * 500)
  }
}

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
`

const Count = styled(motion.div)`
  user-select: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 46px;
  line-height: 54px;
  color: #FFFFFF;
  margin-top: 0px;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const SmallCount = styled(motion.div)`
  user-select: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  height: 18px;
  color: #FFFFFF;
  margin-top: 0px;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const X = styled(motion.div)`
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 35px;
  color: #FFFFFF;
  margin-top: 2px;
  user-select: none;
  opacity: 0;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const SendButton = styled(motion.div)`
  min-width: 261px;
  min-height: 261px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  box-shadow: 0px 3px 9px 5px rgba(194, 95, 95, 0.25);
  backdrop-filter: blur(10px);
`

const SendButtonHidden = styled(motion.div)`
  position: absolute;
  min-width: 261px;
  min-height: 261px;
  border-radius: 100%;
  z-index: 99999;
  cursor: pointer;
`

const Icon = styled.img`
  user-select: none;
  margin-top: 35px;
  width: 59px;
  height: 87px;
`

const DicksCounter = ({ onDick, dickCount, disabled, symbolType }) => {
  const ref = useRef()
  const [clicked, setClicked] = useState(false)
      , [dCount, setDCount] = useState(dickCount)
      , [countX, setCountX] = useState(0)
      , [x, setX] = useState(1)

  useEffect(() => {
    setDCount(dickCount)
  }, [dickCount])

  useEffect(() => {
    if (countX > 20 && countX < 50) {
      setX(2)
    }

    if (countX > 50 && countX < 150) {
      setX(3)
    }

    if (countX > 150 && countX < 300) {
      setX(4)
    }

    if (countX > 300 && countX < 500) {
      setX(5)
    }

    if (countX > 500) {
      setX(8)
    }

    const timeId = setTimeout(() => {
      setX(1)
      setCountX(0)
    }, 500)

    return () => clearTimeout(timeId)
  }, [countX])

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false)
      }, 100)
    }
  }, [clicked])

  const _dCount = normalizeCount((new BigNumber(dCount)).toFormat().split(',').join(''))

  return (
    <Body>
      <Count
        animate={clicked ? { scale: 1 } : { scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 1000 }}
      >
      {
        _dCount[0]
      }
      </Count>
      <SmallCount
        animate={clicked ? { scale: 1 } : { scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 1000 }}
      >
      {
        _dCount[1]
      }
      </SmallCount>
      <SendButton whileTap={{ scale: 0.95 }}>
        <Icon src={symbolType === 'dick' ? dick : heart} />
        <X animate={{ opacity: x > 1 ? 1 : 0 }}>x{x}</X>
        {
          symbolType === 'dick'
            ? (
              <DicksAnimation ref={ref} />
            )
            : (
              <HeartsAnimation ref={ref} />
            )
        }
        <SendButtonHidden
          onClick={() => {
            if (disabled) {
              return
            }
            onDick(x)
            symbolType === 'dick' ? pushDick(ref, x) : pushHeart(ref, x)
            setClicked(true)
            setCountX(s => s + 1)
            setDCount(s => (new BigNumber(s)).plus(x).toFormat().split(',').join(''))
          }}
        />
      </SendButton>
    </Body>
  )
}

export default DicksCounter
