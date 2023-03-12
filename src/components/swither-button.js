import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const HeartIcon = ({ isActive, onClick }) => {
  return (
    <svg onClick={onClick} width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.0002 18.9883C23.0002 16.4289 20.9576 14.89 18.4383 14.89C15.9191 14.89 13.8765 16.9648 13.8765 19.5243V19.5243C13.8765 20.2865 14.0515 21.0385 14.3881 21.7223L14.5498 22.051C14.8592 22.6796 15.2675 23.2545 15.7589 23.7538L22.8378 30.945C22.9271 31.0357 23.0733 31.0357 23.1626 30.945L30.2415 23.7538C30.733 23.2545 31.1412 22.6796 31.4506 22.051L31.6123 21.7223C31.9489 21.0385 32.124 20.2865 32.124 19.5243V19.5243C32.124 16.9648 30.0814 14.89 27.5621 14.89C25.0428 14.89 23.0002 16.4289 23.0002 18.9883Z" fill={isActive ? 'white' : 'black'} />
    </svg>
  )
}

const DickIcon = ({ isActive, onClick }) => {
  return (
    <svg onClick={onClick} width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.1687 12C21.2601 12 19.7128 13.5473 19.7128 15.4559V26.1665C19.643 26.1628 19.5728 26.1609 19.5021 26.1609C17.3374 26.1609 15.5825 27.9158 15.5825 30.0805C15.5825 32.2452 17.3374 34 19.5021 34C21.0299 34 22.3535 33.1259 23.0001 31.8504C23.6468 33.1259 24.9704 34 26.4982 34C28.6629 34 30.4178 32.2452 30.4178 30.0805C30.4178 27.9581 28.7309 26.2297 26.6247 26.1629V15.4559C26.6247 13.5473 25.0774 12 23.1687 12Z" fill={isActive ? 'white' : 'black'} />
    </svg>
  )
}

const WrapperAnimation = styled(motion.div)`
  position: fixed;
  z-index: 9999;
  top: 10px;
  left: 10px;
`

const Button = styled(motion.div)`
  user-select: none;
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 3px;
  width: 111px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 100px;
  cursor: pointer;
  filter: drop-shadow(0px 0px 1px rgba(94, 94, 94, 0.5));
`

const Cursor = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 46px;
  height: 46px;
  background: #fff;
  border-radius: 100px;
  flex: none;
  order: 0;
  flex-grow: 0;
`

const Wrapper = styled(motion.div)`
  height: 46px;
  gap: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`


const CopyButton = ({ onClick, value }) => {
  const [isActive, setActive] = useState(false)

  return (
    <WrapperAnimation
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { ease: 'easeOut', delay: 1 },
      }}
    >
      <Button
        onHoverStart={() => setActive(true)}
        onHoverEnd={() => setActive(false)}
      >
        <Cursor
          animate={{
            background: isActive ? '#000' : '#fff',
            scale: isActive ? 0.9 : 1,
            x: value === 'dick'
                  ? '0px'
                  : '49px',
            transition: { ease: 'easeOut' }
          }}
        />
        <Wrapper>
          <DickIcon onClick={() => onClick('dick')} isActive={value === 'dick' && isActive} />
          <HeartIcon onClick={() => onClick('heart')} isActive={value === 'heart' && isActive} />
        </Wrapper>
      </Button>
    </WrapperAnimation>
  )
}

export default CopyButton
