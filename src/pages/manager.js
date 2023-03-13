import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import loader from './../assets/loader.svg'
import Body from './../components/body'
import Button from './../components/button'

const SearchBox = styled.input`
  max-width: 666px;
  width: 100%;
  background: rgba(255, 216, 216, 0.42);
  border-radius: 15px;
  margin-bottom: 15px;
  margin-top: 92px;
  border: none;
  outline: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 32px;
  padding: 19.5px;
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

const SymbolWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  max-width: 686px;
  width: calc(100% - 20px);
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
  background: rgba(255, 216, 216, 0.42);
  border-radius: 15px;
  margin-bottom: 12px;
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const DescriptionWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  max-width: 686px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  height: 100%;
  padding: 19.5px;
  background: rgba(255, 216, 216, 0.42);
  border-radius: 15px;
  margin-bottom: 12px;
  margin-left: 10px;
  margin-right: 10px;
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

const Title = styled.div`
  text-overflow: ellipsis;
  overflow-x: hidden;
  user-select: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 32px;
  color: #FFFFFF;
  white-space: nowrap;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
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

const Manager = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
      , [symbols, setSymbols] = useState([])

  useEffect(() => {
    try {
      setSymbols(JSON.parse(window.localStorage.manager))
    } catch (e) {

    }
  }, [])

  const searchRegExp = new RegExp(search, 'gi')

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
        icon='search'
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
          navigate('/create')
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
        }}
        icon='create'
        style={{
          position: 'fixed',
          zIndex: 9999,
          top: '10px',
          right: '10px'
        }}
      />
      <SearchBox value={search} onChange={({ target: { value } }) => setSearch(value)} placeholder='@username or title' />
      {
        symbols.filter(s => search.length === 0 ? true : s.username.match(searchRegExp)).map(symbol =>
          <Link
            key={symbol.username+'-'+symbol.link}
            to={`${symbol.link}`}
            onClick={() => {
              window.pageAnimationRouter({ from: 0, to: 1 })
              window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
              })
            }}
            style={{ display: 'contents' }}
          >
            <SymbolWrapper>
              <Title style={{ width: `${window.innerWidth > 500 ? 500 : window.innerWidth - 150}px` }}>@{symbol.username}</Title>
            </SymbolWrapper>
          </Link>
        )
      }
      <UserListLoad src={loader} />
      <DescriptionWrapper
        onClick={() => {
          window.pageAnimationRouter({ from: 0, to: 1 })
          navigate('/create')
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
        }}
      >
        Didn 't find what you were looking for ? Add it in a few clicks!
      </DescriptionWrapper>
    </Body>
  )
}

export default Manager
