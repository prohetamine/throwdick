import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const IconBack = ({ isActive }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.6037 10.0277L10.0277 18.6037C9.37247 19.2589 9.17506 20.1238 9.58676 20.5355C9.99846 20.9472 10.8634 20.7498 11.5186 20.0946L20.0946 11.5186C20.7498 10.8634 20.9472 9.99848 20.5355 9.58678C20.1238 9.17508 19.2589 9.37249 18.6037 10.0277Z" fill={isActive ? 'white' : 'black'} />
      <path d="M10.0277 11.3963L18.6037 19.9723C19.2589 20.6275 20.1238 20.8249 20.5355 20.4132C20.9472 20.0015 20.7498 19.1366 20.0946 18.4814L11.5186 9.90541C10.8634 9.25018 9.99844 9.05277 9.58674 9.46447C9.17504 9.87617 9.37245 10.7411 10.0277 11.3963Z" fill={isActive ? 'white' : 'black'} />
    </svg>
  )
}

const IconCreate = ({ isActive }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.0644 14.0323H8.93611C8.00948 14.0323 7.2583 14.5043 7.2583 15.0865C7.2583 15.6687 8.00948 16.1407 8.93611 16.1407H21.0644C21.991 16.1407 22.7422 15.6687 22.7422 15.0865C22.7422 14.5043 21.991 14.0323 21.0644 14.0323Z" fill={isActive ? 'white' : 'black'} />
      <path d="M14.0327 8.93587V21.0641C14.0327 21.9908 14.5047 22.7419 15.0869 22.7419C15.6692 22.7419 16.1412 21.9908 16.1412 21.0641V8.93587C16.1412 8.00924 15.6692 7.25807 15.0869 7.25807C14.5047 7.25807 14.0327 8.00924 14.0327 8.93587Z" fill={isActive ? 'white' : 'black'} />
    </svg>
  )
}

const IconSearch = ({ isActive }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.0032 16.746L7.61459 22.1346C7.20289 22.5463 7.20289 23.2138 7.61459 23.6255C8.0263 24.0372 8.6938 24.0372 9.1055 23.6255L14.4941 18.2369C14.9058 17.8252 14.9058 17.1577 14.4941 16.746C14.0824 16.3343 13.4149 16.3343 13.0032 16.746Z" fill={isActive ? 'white' : 'black'} />
      <path d="M17.7731 18.3443C20.7321 18.3443 23.1308 15.9456 23.1308 12.9866C23.1308 10.0277 20.7321 7.62902 17.7731 7.62902C14.8142 7.62902 12.4155 10.0277 12.4155 12.9866C12.4155 15.9456 14.8142 18.3443 17.7731 18.3443Z" stroke={isActive ? 'white' : 'black'} strokeWidth="2"/>
    </svg>
  )
}

const IconCopy = ({ isActive }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.1321 11.1109C24.3036 9.93932 24.3036 8.03983 23.1321 6.86825C21.9605 5.69668 20.061 5.69668 18.8894 6.86825L16.061 9.69668C14.8894 10.8683 14.8894 12.7677 16.061 13.9393C17.2326 15.1109 19.1321 15.1109 20.3036 13.9393L23.1321 11.1109Z" fill={!isActive ? 'white' : 'black'} stroke={isActive ? 'white' : 'black'} strokeWidth="2" />
      <path d="M13.9397 20.3033C15.1113 19.1317 15.1113 17.2322 13.9397 16.0607C12.7681 14.8891 10.8686 14.8891 9.69704 16.0607L6.86861 18.8891C5.69704 20.0607 5.69704 21.9602 6.86861 23.1317C8.04018 24.3033 9.93968 24.3033 11.1113 23.1317L13.9397 20.3033Z" fill={!isActive ? 'white' : 'black'} stroke={isActive ? 'white' : 'black'} strokeWidth="2" />
      <path d="M18.1827 13.2322C18.5732 12.8417 18.5732 12.2085 18.1827 11.818C17.7922 11.4275 17.159 11.4275 16.7685 11.818L11.8187 16.7678C11.4282 17.1583 11.4282 17.7915 11.8187 18.182C12.2093 18.5725 12.8424 18.5725 13.2329 18.182L18.1827 13.2322Z" fill={isActive ? 'white' : 'black'} stroke={isActive ? 'white' : 'black'} />
    </svg>
  )
}

const WrapperAnimation = styled(motion.div)``

const Body = styled(motion.div)`
  user-select: none;
  width: 46px;
  height: 46px;
  border-radius: 100%;
  background-color: #fff;
  width: 46px;
  height: 46px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0px 0px 1px rgba(94, 94, 94, 0.5));
`

const Button = ({ icon, onClick, style }) => {
  const ref = useRef()
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) { return }

    const handlerTouchStart = () => {
      setActive(true)
    }
    const handlerTouchEnd = () => {
      setActive(false)
      onClick()
    }

    node.addEventListener('touchstart', handlerTouchStart)
    node.addEventListener('touchend', handlerTouchEnd)
    node.addEventListener('mousedown', handlerTouchStart)
    node.addEventListener('mouseup', handlerTouchEnd)

    return () => {
      node.removeEventListener('touchstart', handlerTouchStart)
      node.removeEventListener('touchend', handlerTouchEnd)
      node.removeEventListener('mousedown', handlerTouchStart)
      node.removeEventListener('mouseup', handlerTouchEnd)
    }
  }, [ref.current])

  return (
    <WrapperAnimation
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { ease: 'easeOut', delay: 1 },
      }}
    >
      <Body
        style={style}
        ref={ref}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setActive(true)}
        onHoverEnd={() => setActive(false)}
        animate={{
          opacity: 1,
          background: isActive ? '#000' : '#fff'
        }}
      >
        {
          icon === 'back'
            ? (
              <IconBack isActive={isActive} />
            )
            : null
        }
        {
          icon === 'create'
            ? (
              <IconCreate isActive={isActive} />
            )
            : null
        }
        {
          icon === 'search'
            ? (
              <IconSearch isActive={isActive} />
            )
            : null
        }
        {
          icon === 'copy'
            ? (
              <IconCopy isActive={isActive} />
            )
            : null
        }
      </Body>
    </WrapperAnimation>
  )
}

export default Button
