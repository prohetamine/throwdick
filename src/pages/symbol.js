import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useLocation, useNavigate } from 'react-router-dom';

import DicksCounter from './../components/dicks-counter'
import Body from './../components/body'
import CopyButton from './../components/copy-button'
import Button from './../components/button'

const View = styled.a`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 20px;
`

const Pic = styled.div`
  user-select: none;
  border-radius: 100%;
  min-width: 30vh;
  min-height: 30vh;
  max-width: 30vh;
  max-height: 30vh;

  @media(max-height: 772px) {
    min-width: 25vh;
    min-height: 25vh;
    max-width: 25vh;
    max-height: 25vh;
  }

  @media(max-height: 714px) {
    min-width: 20vh;
    min-height: 20vh;
    max-width: 20vh;
    max-height: 20vh;
  }

  @media(max-height: 606px) {
    min-width: 18vh;
    min-height: 18vh;
    max-width: 18vh;
    max-height: 18vh;
  }

  filter: drop-shadow(0px 0px 1px rgba(94, 94, 94, 0.5));
  box-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);

  background-image: url(${props => props.src});
  background-size: ${props => props.position[2]};
  background-position: ${props => props.position[0]}% ${props => props.position[1]}%;
`

const Title = styled.div`
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  text-align: center;
  user-select: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 32px;
  color: #FFFFFF;
  margin-top: 13px;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const Urlname = styled.div`
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  text-align: center;
  user-select: none;
  cursor: pointer;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  color: #FFFFFF;
  display: inline-block;
  margin-top: 3px;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const BlockTitle = styled.div`
  user-select: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 32px;
  color: #FFFFFF;
  margin-top: 25px;
  margin-bottom: 10px;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
  max-width: 686px;
  width: calc(100% - 20px);
`

const ContentTitle = styled.div`
  user-select: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 26px;
  color: #FFFFFF;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
  max-width: 686px;
  width: calc(100% - 20px);
`

const GoalWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 686px;
  width: calc(100% - 20px);
  padding: 20px 20px 10px 20px;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
  background: rgba(255, 216, 216, 0.42);
  border-radius: 15px;
  margin-bottom: 12px;
  margin-left: 10px;
  margin-right: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
`

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  width: 100%;
`

const GoalPin = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  padding: 10px 20px;
  border-radius: 15px;
  background: #fff;
  user-select: none;
  margin-bottom: 10px;
  margin-right: 10px;
`

const LinkPin = (() => {
  const Body = styled.a`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 15px;
    background: ${props => props.color};
    user-select: none;
    color: #fff;
    outline: none;
    text-decoration: none;
    margin-right: 10px;
    margin-bottom: 10px;
  `

  return ({ url, color, title }) => {
    const [dicks, setDicks] = useState(false)

    useEffect(() => {
      if (url.match(/throwdick/)) {
        const _url = new URL(url)
        const symbolName = _url.hash.replace(/#\//,'')

        fetch(`${window.host}/add-dicks-for/${symbolName}?c=0`)
          .then(data => data.json())
          .then(data => setDicks(data[0]))
      }
    }, [url])

    return dicks ? (
      <Body target='_blank' href={url} color={color}>{title} ({dicks})</Body>
    ) : (
      <Body target='_blank' href={url} color={color}>{title}</Body>
    )
  }
})()

const PhotoPin = styled.div`
  border-radius: 15px;
  user-select: none;
  color: #fff;
  outline: none;
  text-decoration: none;
  width: ${props => props.isOnce ? '100%' : 'calc(50% - 5px)'};
  height: 350px;
  cursor: pointer;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: 50% 50%;
`

const GoalProgressPin = (() => {
  const Body = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    padding: 10px 20px;
    border-radius: 15px;
    background: #fff;
    user-select: none;
    margin-bottom: 10px;
  `

  return ({ request, current, symbolType }) => {
    const remains = (new BigNumber(request)).minus(current).toFormat().split(',').join(' ')

    const isRemained = remains.match('-')

    if (isRemained) {
      window.location.reload()
    }

    return (
      <Body>{isRemained ? `Available for viewing` : `Will become visible via: ${remains} ${symbolType}`}</Body>
    )
  }
})()

const Symbol = (props) => {
  const location = useLocation()
  const navigate = useNavigate()

  const symbolName = location.pathname.replace(/\//, '')

  const [symbol, setSymbol] = useState(null)

  const [dickCount, setDickCount] = useState('1')
      , [_, setLocalDickCount] = useState(1)

  useEffect(() => {
    const timeId = setTimeout(() => {
      fetch(`${window.host}/symbol/${symbolName}`)
        .then(e => e.json())
        .then(data => {
          if (data) {
            setSymbol(data)
            setDickCount(data.dicks)
          } else {
            window.pageAnimationRouter({ from: 0, to: 1 })
            navigate('/create')
          }
        })
    }, 1000)

    return () => clearTimeout(timeId)
  }, [symbolName])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocalDickCount(s => {
        if (s !== 0) {
          fetch(`${window.host}/add-dicks-for/${symbolName}?c=${s}`)
            .then(data => data.json())
            .then(data => setDickCount(data[0]))
        }

        return 0
      })
    }, 5000)

    return () => clearInterval(intervalId)
  }, [symbolName])

  const showGoals = symbol && symbol.goals
                      .filter(g => g.show)
                      .sort((a, b) => b.date - a.date)

  const progressGoals = symbol && symbol.goals.filter(g => !g.show).sort((a, b) => (new BigNumber(a.count)).minus(new BigNumber(b.count)))

  return symbol ? (
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
      <CopyButton />
      <View>
        <Pic src={symbol.pic} position={symbol.picPosition} />
        <Title style={{ width: `${window.innerWidth > 500 ? 500 : window.innerWidth - 150}px` }}>{symbol.title}</Title>
        <Urlname style={{ width: `${window.innerWidth > 500 ? 500 : window.innerWidth - 150}px` }}>@{symbol.username}</Urlname>
      </View>
      <DicksCounter
        symbolType={symbol.symbolType}
        dickCount={dickCount}
        onDick={x => {
          setLocalDickCount(s => s + x)
        }}
      />
      {
        progressGoals.length > 0
          ? (
            <BlockTitle>Goals</BlockTitle>
          )
          : (
            null
          )
      }
      {
          progressGoals.map(goal => (
            <GoalWrapper key={goal.title+'-'+goal.date}>
              <ContentTitle>{goal.title}</ContentTitle>
              <ContentWrapper>
                {
                  goal.show
                    ? (
                      goal[goal.type].map((data, i) => (
                        goal.type === 'link'
                          ? (
                            <LinkPin
                              key={i}
                              url={data.url}
                              color={data.color}
                              title={data.name}
                            />
                          )
                          : (
                            <PhotoPin
                              key={i}
                              onClick={() => window.open(data, '_blank')}
                              style={{
                                marginRight: i % 2 === 0 ? '10px' : '0px',
                                marginBottom: '10px'
                              }}
                              isOnce={goal[goal.type].length === 1}
                              src={data}
                            />
                          )
                      ))
                    )
                    : (
                      <>
                        <GoalPin>Pined {goal[goal.type].length} {goal.type}{goal[goal.type].length > 1 ? 's': ''}</GoalPin>
                        <GoalProgressPin request={goal.count} current={dickCount} symbolType={symbol.symbolType} />
                      </>
                    )
                }
              </ContentWrapper>
            </GoalWrapper>
          ))
      }
      {
        showGoals.length > 0
          ? (
            <BlockTitle>Activated</BlockTitle>
          )
          : (
            null
          )
      }
      {
          showGoals.map(goal => (
            <GoalWrapper key={goal.title+'-'+goal.date}>
              <ContentTitle>{goal.title}</ContentTitle>
              <ContentWrapper>
                {
                  goal.show
                    ? (
                      goal[goal.type].map((data, i) => (
                        goal.type === 'link'
                          ? (
                            <LinkPin
                              key={i}
                              url={data.url}
                              color={data.color}
                              title={data.name}
                            />
                          )
                          : (
                            <PhotoPin
                              key={i}
                              onClick={() => window.open(data, '_blank')}
                              style={{
                                marginRight: i % 2 === 0 ? goal[goal.type].length === 1 ? '0px' : '10px' : '0px',
                                marginBottom: '10px'
                              }}
                              isOnce={goal[goal.type].length === 1}
                              src={data}
                            />
                          )
                      ))
                    )
                    : (
                      <>
                        <GoalPin>Pined {goal[goal.type].length} {goal.type}{goal[goal.type].length > 1 ? 's': ''}</GoalPin>
                        <GoalProgressPin request={goal.count} current={dickCount} symbolType={symbol.symbolType} />
                      </>
                    )
                }
              </ContentWrapper>
            </GoalWrapper>
          ))
      }
    </Body>
  ) : null
}

export default Symbol
