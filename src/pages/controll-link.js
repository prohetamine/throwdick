import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import loader from './../assets/loader.svg'
import BigNumber from 'bignumber.js'
import Body from './../components/body'
import Button from './../components/button'

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
  background: rgba(255, 216, 216, 0.42);
  border-radius: 15px;
  margin-bottom: 15px;
  border: none;
  outline: none;
  text-align: center;
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

const BlockTitleSmile = styled.div`
  user-select: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: 26px;
  color: #FFFFFF;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 10px;
  text-shadow: 0px 0px 1px rgba(94, 94, 94, 0.5);
  max-width: 686px;
  width: calc(100% - 20px);
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

const colors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#AB00B8', '#7BAA02', '#C99200', '#00BD7D']

const randomColor = () => colors[parseInt(Math.random() * colors.length)]

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
      , [isLoad, setLoad] = useState(false)

  const [goalTitle, setGoalTitle] = useState('')
      , [goalCount, setGoalCount] = useState('')
      , [goalType, setGoalType] = useState('photo')
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
          setLoad(true)
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
        goals,
        title,
        pic,
        symbolType,
        symbolVisible,
        goalsAccess
      })
    })
      .then(data => data.json())
      .then(data => {
        const update = document.querySelector('.update')
        update.style.opacity = '1'
        update.style.bottom = '10px'
        update.innerHTML = 'Updated 👍'

        setTimeout(() => {
          update.style.bottom = '-100px'
        }, 2000)
      })
      .catch(data => {
        const update = document.querySelector('.update')
        update.style.opacity = '1'
        update.style.bottom = '10px'
        update.innerHTML = 'Updated error 😭'

        setTimeout(() => {
          update.style.bottom = '-100px'
        }, 2000)
      })
  }

  useEffect(() => {
    if (isLoad) {
      const timeId = setTimeout(() => {
        const controllLink = location.pathname.replace(/\/cl\//, '')

        fetch(`${window.host}/set-symbol/${controllLink}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            goals,
            title,
            pic,
            symbolType,
            symbolVisible,
            goalsAccess
          })
        })
          .then(data => data.json())
          .then(data => {
            const update = document.querySelector('.update')
            update.style.bottom = '10px'
            update.style.opacity = '1'
            update.innerHTML = 'Updated 👍'

            setTimeout(() => {
              update.style.bottom = '-100px'
            }, 2000)
          })
          .catch(data => {
            const update = document.querySelector('.update')
            update.style.bottom = '10px'
            update.style.opacity = '1'
            update.innerHTML = 'Updated error 😭'

            setTimeout(() => {
              update.style.bottom = '-100px'
            }, 2000)
          })
      }, 3000)

      return () => clearTimeout(timeId)
    }
  }, [isLoad, location, goals, title, pic, symbolType, symbolVisible, goalsAccess])

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
      <DescriptionWrapper>
        Fill out your profile, set goals and get into the search for the best positions!
      </DescriptionWrapper>
      <UserListLoad src={loader} />
      <BlockTitle>Symbol settings</BlockTitle>
      <BlockTitleSmile style={{ marginTop: '25px' }}>Title</BlockTitleSmile>
      <Input value={title} onChange={({ target: { value } }) => setTitle(value)} placeholder='Title' />
      <BlockTitleSmile>Picture</BlockTitleSmile>
      <Input value={pic} onChange={({ target: { value } }) => setPic(value)} placeholder='Picture url (use imgur.com or etc)' />
      <BlockTitleSmile>Required amount of {symbolType}s to access the content</BlockTitleSmile>
      <Input value={goalsAccess} onChange={({ target: { value } }) => setGoalAccess(value)} placeholder='Goal access' />
      <BlockTitleSmile>Type</BlockTitleSmile>
      <Wrapper>
        <BigButton style={{ marginRight: '20px' }} onClick={() => setSymbolType('dick')}>Dick {symbolType === 'dick' ? '✅' : '❌'}</BigButton>
        <BigButton onClick={() => setSymbolType('heart')}>Heart {symbolType === 'heart' ? '✅' : '❌'}</BigButton>
      </Wrapper>
      <BlockTitleSmile>Visible (profile display in search and link availability)</BlockTitleSmile>
      <Wrapper>
        <BigButton onClick={() => setSymbolVisible(s => !s)}>{symbolVisible ? '✅' : '❌'}</BigButton>
      </Wrapper>
      <BlockTitleSmile style={{ marginTop: '20px' }}></BlockTitleSmile>
      <Wrapper>
        <BigButton style={{ marginRight: '20px' }} onClick={() => saveSymbol()}>Update symbol</BigButton>
        <BigButton onClick={() => window.open(window.location.origin+'#/'+username)}>Open symbol</BigButton>
      </Wrapper>
      <BlockTitle>Create goal</BlockTitle>
      <BlockTitleSmile style={{ marginTop: '25px' }}>Title (visible to everyone)</BlockTitleSmile>
      <Input value={goalTitle} onChange={({ target: { value } }) => setGoalTitle(value)} placeholder='Title' />
      <BlockTitleSmile>The number of {symbolType}s to collect</BlockTitleSmile>
      <Input value={goalCount} onChange={({ target: { value } }) => setGoalCount(value)} placeholder={`${symbolType}s count`} />
      <BlockTitleSmile>Type content</BlockTitleSmile>
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
      <BlockTitleSmile>Add links or photos</BlockTitleSmile>
      <Wrapper>
        <BigButton onClick={() => setGoalContent(s => [...s, goalType === 'photo' ? '' : { name: '', url: '', color: '#f72626' }])}>Create {goalType} +</BigButton>
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
                    <BigButton style={{ marginLeft: '10px' }} onClick={() => setGoalContent(s => s.map((c, _i) => _i === i ? ({ ...c, color: randomColor() }) : c))}>{content.color} <div style={{ marginLeft: '10px', borderRadius: '10px', padding: '20px', background: content.color }}></div></BigButton>
                  </Wrapper>
                )
                : (
                  <Input value={content} onChange={({ target: { value } }) => setGoalContent(s => s.map((c, _i) => _i === i ? value : c))} placeholder='Pictrue url (use imgur.com or etc)' />
                )
            }
          </Wrapper>
        ))
      }
      <BlockTitleSmile style={{ marginTop: '20px' }}></BlockTitleSmile>
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
        >Push goal to list</BigButton>
        <BigButton
          onClick={() => {
            setGoalTitle('')
            setGoalCount('')
            setGoalType('photo')
            setGoalContent([])
          }}
          style={{ marginRight: '20px' }}
        >Clear goal</BigButton>
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
                        <GoalControll
                          onClick={() => setGoals(s => s.map(_goal => goal.date === _goal.date ? ({ ..._goal, pinned: !_goal.pinned }) : _goal))}
                        >{!!goal.pinned ? 'UNPINNED' : 'PINNED'}</GoalControll>
                        <GoalControll
                          onClick={
                            () => {
                              setGoalTitle(goal.title)
                              setGoalCount('')
                              setGoalType(goal.type)
                              setGoalContent(goal[goal.type])
                            }
                          }
                        >COPY</GoalControll>
                        <GoalControll
                          onClick={() => setGoals(s => s.filter(_goal => goal.date !== _goal.date))}
                        >REMOVE GOAL</GoalControll>
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
