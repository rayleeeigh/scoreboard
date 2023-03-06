import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { TimerSettings, useTimer } from 'react-timer-hook';

export default function Home() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  const [scoreHome, setScoreHome] = useState(0);
  const [scoreGuest, setScoreGuest] = useState(0);
  const [timeoutHome, setTimeoutHome] = useState(0);
  const [timeoutGuest, setTimeoutGuest] = useState(0);
  const [foulHome, setFoulHome] = useState(0);
  const [foulGuest, setFoulGuest] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [shotClock, setShotClock] = useState(25);
  const audioRef = useRef();
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: time, onExpire: () => setQuarter(quarter+1) });

  useEffect(() => {
    restart(time, false);
    pause();
  }, [])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  useEffect(()=>{
    if (shotClock > 0){
      setShotClock(shotClock-1)
    }
    if (shotClock - 1 === 0){
      pause();
      play();
    }
  }, [seconds])
  

  return (
    <>
    <Box mb="2vh" color="black" textAlign="center" bg="yellow" w="100vw">
      Welcome to Ibabao Proper Youth Organization
    </Box>
    <Box textAlign="center">
      <Heading size="md">Time Remaining</Heading>
      <Heading size="2xl">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10? `0${seconds}`: seconds}</Heading>
    </Box>
    <Flex justifyContent="space-evenly" my="10vh" alignItems="center">
      <Box textAlign="center" py="2vh" border="3px solid black" p="20">
        <Input border="none" textAlign="center" fontSize="2xl" type="text"/>
        <Heading mt="4vh" size="4xl">{scoreHome < 10 ? `0${scoreHome}`: scoreHome}</Heading>
        <Flex mt="2vh" justifyContent="space-evenly">
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreHome(scoreHome+1)}>+ 1</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreHome(scoreHome+2)}>+ 2</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreHome(scoreHome+3)}>+ 3</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreHome(0)}>Reset</Button>
        </Flex>
        <Flex mt="2vh" justifyContent="space-between">
          <Flex>
            <Heading size="md" mr="1vw">Fouls: {foulHome}</Heading>
            <Button size="xs" bg="transparent" border="solid 2px white" mr="4px" onClick={(e)=>setFoulHome(foulHome+1)}>+</Button>
            <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setFoulHome(foulHome-1)}>-</Button>
          </Flex>
          <Flex>
            <Heading size="md">Timeouts: {timeoutHome}</Heading>
            <Button size="xs" bg="transparent" border="solid 2px white" mr="4px" onClick={(e)=>setTimeoutHome(timeoutHome+1)}>+</Button>
            <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setTimeoutHome(timeoutHome-1)}>-</Button>
          </Flex>
        </Flex>
      </Box>
      <Box textAlign="center">
        <Heading>Quarter</Heading>
        <Heading>{quarter}</Heading>
        <Heading mt="12vh">Shot Clock</Heading>
        <Heading size="4xl">{shotClock}</Heading>
        <Button size="xs" mt="4vh" bg="transparent" border="solid 2px white" onClick={()=>setShotClock(24)}>Reset</Button>
      </Box>
      <Box textAlign="center" py="2vh" border="3px solid black" p="20">
        <Input border="none" textAlign="center" fontSize="2xl" type="text"/>
        <Heading mt="4vh" size="4xl">{scoreGuest < 10 ? `0${scoreGuest}`: scoreGuest}</Heading>
        <Flex mt="2vh" justifyContent="space-evenly">
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreGuest(scoreGuest+1)}>+ 1</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreGuest(scoreGuest+2)}>+ 2</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreGuest(scoreGuest+3)}>+ 3</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreGuest(0)}>Reset</Button>
        </Flex>
        <Flex mt="2vh" justifyContent="space-between">
          <Flex>
            <Heading size="md" mr="1vw">Fouls: {foulGuest}</Heading>
            <Button size="xs" bg="transparent" border="solid 2px white" mr="4px" onClick={(e)=>setFoulGuest(foulGuest+1)}>+</Button>
            <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setFoulGuest(foulGuest-1)}>-</Button>
          </Flex>
          <Flex>
            <Heading size="md">Timeouts: {timeoutGuest}</Heading>
            <Button size="xs" bg="transparent" border="solid 2px white" mr="4px" onClick={(e)=>setTimeoutGuest(timeoutGuest+1)}>+</Button>
            <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setTimeoutGuest(timeoutGuest-1)}>-</Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
    <Flex w="100vw" justifyContent="center" >
      <Button size="xs" bg="transparent" border="solid 2px white" onClick={start}>Start</Button>
      <Button size="xs" bg="transparent" border="solid 2px white" onClick={pause}>Pause</Button>
      <Button size="xs" bg="transparent" border="solid 2px white" onClick={resume}>Resume</Button>
      <Button size="xs" bg="transparent" border="solid 2px white" onClick={()=>{restart(time, false);}}>Restart</Button>
      <Button size="xs" bg="transparent" border="solid 2px white" onClick={play}>Play Buzzer</Button>
      <audio ref={audioRef} src='/audio/timeout.mp3' />
    </Flex>
    </>
  )
}