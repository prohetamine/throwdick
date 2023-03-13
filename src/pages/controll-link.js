import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import loader from './../assets/loader.svg'
import BigNumber from 'bignumber.js'

import Body from './../components/body'
import Button from './../components/button'
import CopyButton from './../components/copy-button'

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

const Wrapper = styled.div`
  max-width: 666px;
  display: flex;
  box-sizing: border-box;
  margin-left: 10px;
  margin-right: 10px;
  width: calc(100% - 20px);
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
  margin-left: 10px;
  margin-right: 10px;
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

const GoalControll = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  padding: 10px 20px;
  border-radius: 15px;
  background: #000;
  color: #fff;
  user-select: none;
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
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

        fetch(`${window.host}/get-dicks-for/${symbolName}`)
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

const PhotoPin = styled.img`
  border-radius: 15px;
  user-select: none;
  color: #fff;
  outline: none;
  text-decoration: none;
  width: ${props => props.isOnce ? '100%' : 'calc(50% - 5px)'};
  cursor: pointer;
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
    margin-right: 10px;
  `

  return ({ request, current, symbolType }) => {
    const remains = (new BigNumber(request)).minus(current).toFormat().split(',').join(' ')

    const isRemained = remains.match('-')

    return (
      <Body>{isRemained ? `Available for viewing` : `Will become visible via: ${remains} ${symbolType}`}</Body>
    )
  }
})()

const ControllLink = () => {
  const navigate = useNavigate()
      , location = useLocation()

  const [title, setTitle] = useState('')
      , [pic, setPic] = useState('')
      , [goals, setGoals] = useState([])
      , [username, setUsername] = useState('')
      , [symbolType, setSymbolType] = useState('dick')
      , [symbolVisible, setSymbolVisible] = useState(true)
      , [dickCount, setDickCount] = useState(null)
      , [goalsAccess, setGoalAccess] = useState('')

  const [goalTitle, setGoalTitle] = useState('')
      , [goalCount, setGoalCount] = useState('')
      , [goalType, setGoalType] = useState('link')
      , [goalContent, setGoalContent] = useState([])

  useEffect(() => {
    const controllLink = location.pathname.replace(/\/cl\//, '')

    fetch(`${window.host}/get-symbol/${controllLink}`)
      .then(data => data.json())
      .then(data => {
        if (data) {
          setPic(data.pic)
          setSymbolType(data.symbolType)
          setTitle(data.title)
          setGoals(data.goals)
          setUsername(data.username)
          setDickCount(data.dicks)
          setSymbolVisible(data.symbolVisible)
          setGoalAccess(data.goalsAccess)
        } else {
          window.pageAnimationRouter({ from: 0, to: 1 })
          navigate('/create')
        }
      })
  }, [location])

  const saveSymbol = () => {
    const controllLink = location.pathname.replace(/\/cl\//, '')

    fetch(`${window.host}/set-symbol/${controllLink}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        goals: goals,
        title,
        pic,
        symbolType,
        symbolVisible,
        goalsAccess
      })
    })
      .then(data => data.json())
      .then(data => console.log(data))
  }

  const progressGoals = goals.filter(g => !g.show).sort((a, b) => (new BigNumber(a.count)).minus(new BigNumber(b.count))).sort((a, b) => b.date - a.date).sort((a, b) => !!b.pinned - !!a.pinned)

  return dickCount ? (
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
      <CopyButton />
      <DescriptionWrapper>
        This is a permanent link to your symbol, only with it you will be able to access editing again, save it so as not to lose it
      </DescriptionWrapper>
      <UserListLoad src={loader} />
      <BlockTitle>Profile</BlockTitle>
      <Input value={title} onChange={({ target: { value } }) => setTitle(value)} placeholder='Title' />
      <Input value={pic} onChange={({ target: { value } }) => setPic(value)} placeholder='Picture url' />
      <Input value={goalsAccess} onChange={({ target: { value } }) => setGoalAccess(value)} placeholder='Goal access' />
      <Wrapper>
        <BigButton style={{ marginRight: '20px' }} onClick={() => setSymbolType('dick')}>Dick {symbolType === 'dick' ? '✅' : '❌'}</BigButton>
        <BigButton onClick={() => setSymbolType('heart')}>Heart {symbolType === 'heart' ? '✅' : '❌'}</BigButton>
      </Wrapper>
      <Wrapper>
        <BigButton onClick={() => setSymbolVisible(s => !s)}>Visible profile {symbolVisible ? '✅' : '❌'}</BigButton>
      </Wrapper>
      <Wrapper>
        <BigButton style={{ marginRight: '20px' }} onClick={() => saveSymbol()}>Update symbol</BigButton>
        <BigButton onClick={() => window.open(window.location.origin+'#/'+username)}>Open symbol</BigButton>
      </Wrapper>
      <BlockTitle>Goal</BlockTitle>
      <Input value={goalTitle} onChange={({ target: { value } }) => setGoalTitle(value)} placeholder='Title' />
      <Input value={goalCount} onChange={({ target: { value } }) => setGoalCount(value)} placeholder={`${symbolType}s count`} />
      <Wrapper>
        <BigButton
          onClick={() => {
            setGoalType('photo')
            setGoalContent([])
          }}
          style={{ marginRight: '20px' }}
        >Photo {goalType === 'photo' ? '✅' : '❌'}</BigButton>
        <BigButton
          onClick={() => {
            setGoalType('link')
            setGoalContent([])
          }}
        >Link {goalType === 'link' ? '✅' : '❌'}</BigButton>
      </Wrapper>
      <Wrapper>
        <BigButton onClick={() => setGoalContent(s => [...s, goalType === 'photo' ? '' : { name: '', url: '', color: '#fa0' }])}>Create {goalType} +</BigButton>
      </Wrapper>
      {
        goalContent.map((content, i) => (
          <Wrapper
            key={i}
          >
            {
              typeof(content) !== 'string'
                ? (
                  <Wrapper
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Input value={content.name} onChange={({ target: { value } }) => setGoalContent(s => s.map((c, _i) => _i === i ? ({ ...c, name: value }) : c))} placeholder='Name' />
                    <Input value={content.url} onChange={({ target: { value } }) => setGoalContent(s => s.map((c, _i) => _i === i ? ({ ...c, url: value }) : c))} placeholder='URL' />
                    <Input value={content.color} onChange={({ target: { value } }) => setGoalContent(s => s.map((c, _i) => _i === i ? ({ ...c, color: value }) : c))} placeholder='Color' />
                  </Wrapper>
                )
                : (
                  <Input value={content} onChange={({ target: { value } }) => setGoalContent(s => s.map((c, _i) => _i === i ? value : c))} placeholder='Pictrue url' />
                )
            }
          </Wrapper>
        ))
      }
      <Wrapper>
        <BigButton
          onClick={() => {
            setGoals(
              s => [
                ...s,
                {
                  date: new Date() - 0,
                  title: goalTitle || 'Empty',
                  count: (new BigNumber(dickCount).plus(goalCount || 0)).toFormat().split(',').join(''),
                  type: goalType,
                  [goalType]: goalContent.filter(c => goalType ==='link' ? (c.name && c.url && c.color) : c)
                }
              ]
            )
          }}
          style={{ marginRight: '20px' }}
        >Add goal</BigButton>
        <BigButton
          onClick={() => {
            setGoalTitle('')
            setGoalCount('')
            setGoalType('link')
            setGoalContent([])
          }}
        >Clear goal</BigButton>
      </Wrapper>
      <Wrapper>
        <BigButton style={{ marginRight: '20px' }} onClick={() => saveSymbol()}>Update goals</BigButton>
        <BigButton onClick={() => window.open(window.location.origin+'#/'+username)}>Open symbol</BigButton>
      </Wrapper>
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
                        <GoalProgressPin request={goal.count} current={dickCount} symbolType={symbolType} />
                        <GoalControll onClick={() => setGoals(s => s.map(_goal => goal.date === _goal.date ? ({ ..._goal, pinned: !_goal.pinned }) : _goal))}>{!!goal.pinned ? 'UNPINNED' : 'PINNED'}</GoalControll>
                        <GoalControll onClick={() => setGoals(s => s.filter(_goal => goal.date !== _goal.date))}>REMOVE GOAL</GoalControll>
                      </>
                    )
                }
              </ContentWrapper>
            </GoalWrapper>
          ))
      }
    </Body>
  ) : (null)
}

export default ControllLink
