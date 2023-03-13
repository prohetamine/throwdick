import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Icon = ({ isActive }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.1321 11.1109C24.3036 9.93932 24.3036 8.03983 23.1321 6.86825C21.9605 5.69668 20.061 5.69668 18.8894 6.86825L16.061 9.69668C14.8894 10.8683 14.8894 12.7677 16.061 13.9393C17.2326 15.1109 19.1321 15.1109 20.3036 13.9393L23.1321 11.1109Z" fill={!isActive ? 'white' : 'black'} stroke={isActive ? 'white' : 'black'} strokeWidth="2" />
      <path d="M13.9397 20.3033C15.1113 19.1317 15.1113 17.2322 13.9397 16.0607C12.7681 14.8891 10.8686 14.8891 9.69704 16.0607L6.86861 18.8891C5.69704 20.0607 5.69704 21.9602 6.86861 23.1317C8.04018 24.3033 9.93968 24.3033 11.1113 23.1317L13.9397 20.3033Z" fill={!isActive ? 'white' : 'black'} stroke={isActive ? 'white' : 'black'} strokeWidth="2" />
      <path d="M18.1827 13.2322C18.5732 12.8417 18.5732 12.2085 18.1827 11.818C17.7922 11.4275 17.159 11.4275 16.7685 11.818L11.8187 16.7678C11.4282 17.1583 11.4282 17.7915 11.8187 18.182C12.2093 18.5725 12.8424 18.5725 13.2329 18.182L18.1827 13.2322Z" fill={isActive ? 'white' : 'black'} stroke={isActive ? 'white' : 'black'} />
    </svg>
  )
}

const WrapperAnimation = styled(motion.div)`
  position: fixed;
  z-index: 9999;
  top: 10px;
  right: 10px;
`

const Button = styled(motion.div)`
  user-select: none;
  width: 46px;
  height: 46px;
  overflow: hidden;
  position: relative;
  border-radius: 100px;
  background-color: #fff;
  cursor: pointer;
  filter: drop-shadow(0px 0px 1px rgba(94, 94, 94, 0.5));
`

const Wrapper = styled(motion.div)`
  height: 46px;
  right: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`

const CopyText = styled(motion.div)`
  width: 45px;
  height: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
  margin-right: 12px;
`

const CopyButton = (props) => {
  const ref = useRef()
  const [isActive, setActive] = useState(false)
  const [isCopy, setCopy] = useState(false)

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
        ref={ref}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setActive(true)}
        onHoverEnd={() => setActive(false)}
        animate={{
          background: isActive ? '#000' : '#fff',
          width: isCopy ? '124px' : '46px'
        }}
      >
        <CopyToClipboard
          text={window.location.href.replace(/\/#/, '')}
          onCopy={() => {
            setCopy(true)

            setTimeout(() => {
              setCopy(false)
            }, 500)
          }}
        >
          <Wrapper
            animate={{
              x: isCopy ? '-5px' : '3px'
            }}
          >
            <CopyText
              animate={{
                color: isActive ? '#fff' : '#000'
              }}
            >
              COPY
            </CopyText>
            <Icon isActive={isActive} />
          </Wrapper>
        </CopyToClipboard>
      </Button>
    </WrapperAnimation>
  )
}

export default CopyButton
