import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import normalizeCount from './../lib/normalize-count'
import loader from './../assets/loader.svg'
import Body from './../components/body'
import Button from './../components/button'
import SwitherButton from './../components/swither-button'

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

const Pic = styled.div`
  background-color: #ddd;
  border-radius: 100%;
  width: 82px;
  height: 82px;
  filter: drop-shadow(0px 0px 1px rgba(94, 94, 94, 0.5));
  background-image: url(${props => props.src});
  background-size: ${props => props.position[2]};
  background-position: ${props => props.position[0]}% ${props => props.position[1]}%;
`

const View = styled.div`
  position: relative;
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
  margin-top: 13px;
  white-space: nowrap;
  position: absolute;
  top: -55px;
  left: 15px;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const Urlname = styled.div`
  text-overflow: ellipsis;
  overflow-x: hidden;
  user-select: none;
  cursor: pointer;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  color: #FFFFFF;
  display: inline-block;
  margin-top: 5px;
  white-space: nowrap;
  position: absolute;
  top: -10px;
  left: 15px;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const DicksCount = styled.div`
  height: 32px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 46px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #FFFFFF;
  position: absolute;
  bottom: 20px;
  right: 20px;
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


const Search = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
      , [searchType, setSearchType] = useState('dick')
      , [symbols, setSymbols] = useState([])

  useEffect(() => {
    fetch(`${window.host}/find/-?${searchType === 'heart' ? 'isHeart=1' : ''}`)
      .then(data => data.json())
      .then(data => setSymbols(data))
  }, [])

  useEffect(() => {
    const timeId = setTimeout(() => {
      fetch(`${window.host}/find/${search || '-'}?${searchType === 'heart' ? 'isHeart=1' : ''}`)
        .then(data => data.json())
        .then(data => setSymbols(data))
    }, 1000)

    return () => clearTimeout(timeId)
  }, [search, searchType])

  return (
    <Body
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
      <SwitherButton value={searchType} onClick={type => setSearchType(type)} />
      <SearchBox value={search} onChange={({ target: { value } }) => setSearch(value)} placeholder='@username or title' />
      {
        symbols.map(symbol =>
          <Link
            key={symbol.username}
            to={`/${symbol.username}`}
            onClick={() => {
              window.pageAnimationRouter({ from: 0, to: 1 })
              window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
              })
            }}
            style={{ display: 'contents' }}>
            <SymbolWrapper>
              <Pic src={symbol.pic} position={symbol.picPosition} />
              <View>
                <Title style={{ width: `${window.innerWidth > 500 ? 500 : window.innerWidth - 150}px` }}>{symbol.title}</Title>
                <Urlname style={{ width: `${window.innerWidth > 500 ? 500 : window.innerWidth - 150}px` }}>@{symbol.username}</Urlname>
              </View>
              <DicksCount>{normalizeCount(symbol.dicks)[0][0]}</DicksCount>
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

export default Search
