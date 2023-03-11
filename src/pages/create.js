import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import loader from './../assets/loader.svg'

import Body from './../components/body'
import Button from './../components/button'

const DescriptionWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  max-width: 686px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  background: rgba(255, 216, 216, 0.42);
  border-radius: 15px;
  margin-bottom: 12px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 92px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 32px;
  color: #FFFFFF;
  backdrop-filter: blur(10px);
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
  box-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const Input = styled.input`
  max-width: 666px;
  width: 100%;
  min-height: 71px;
  max-height: 71px;
  height: 100%;
  background: rgba(255, 216, 216, 0.42);
  border-radius: 15px;
  margin-bottom: 15px;
  border: none;
  outline: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 32px;
  padding-left: 17px;
  padding-right: 17px;
  box-sizing: border-box;
  color: #FFFFFF;
  margin-left: 10px;
  margin-right: 10px;
  width: calc(100% - 20px);

  &::-webkit-input-placeholder {
    color: #fff;
  }

  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const BigButton = styled.div`
  min-height: 71px;
  max-height: 71px;
  height: 100%;
  background: rgba(255, 216, 216, 0.42);
  border-radius: 15px;
  margin-bottom: 15px;
  border: none;
  outline: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 32px;
  padding-left: 17px;
  padding-right: 17px;
  box-sizing: border-box;
  color: #FFFFFF;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &::-webkit-input-placeholder {
    color: #fff;
  }
  user-select: none;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const UserListLoad = styled.img`
  min-width: 106px;
  max-width: 106px;
  min-height: 26px;
  max-height: 26px;
  margin-top: 12px;
  margin-bottom: 24px;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

const Create = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')

  const create = username => {
    fetch(`${window.host}/create/${username}`)
      .then(data => data.text())
      .then(data => {
        if (window.localStorage.manager) {
          window.localStorage.manager = JSON.stringify([
            ...JSON.parse(window.localStorage.manager),
            {
              username,
              link: data
            }
          ])
        } else {
          window.localStorage.manager = JSON.stringify([{
            username,
            link: data
          }])
        }

        window.pageAnimationRouter({ from: 0, to: 1 })
        navigate(data)
      })
  }

  return (
    <Body
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Button
        onClick={() => {
          window.pageAnimationRouter({ from: 1, to: 0 })
          navigate('/search')
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
        }}
        icon='back'
        style={{
          position: 'fixed',
          zIndex: 9999,
          top: '10px',
          left: '10px'
        }}
      />
      <Button
        onClick={() => {
          window.pageAnimationRouter({ from: 0, to: 1 })
          navigate('/manager')
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
        }}
        icon='manager'
        style={{
          position: 'fixed',
          zIndex: 9999,
          top: '10px',
          right: '10px'
        }}
      />
      <DescriptionWrapper>
        Username is a link to the symbol page, it cannot be changed after creation
      </DescriptionWrapper>
      <UserListLoad src={loader} />
      <Input value={username} placeholder='username' onChange={({ target: { value } }) => setUsername(value)} />
      <BigButton onClick={() => create(username)}>Create symbol</BigButton>
    </Body>
  )
}

export default Create
