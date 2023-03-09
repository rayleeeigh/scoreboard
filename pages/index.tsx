import { Box, Button, Flex, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { TimerSettings, useTimer } from 'react-timer-hook';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

export default function Home() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + (60 * 10));
  const [scoreHome, setScoreHome] = useState(0); 
  const [scoreGuest, setScoreGuest] = useState(0);
  const [teamName1, setTeamName1] = useState("")
  const [teamName2, setTeamName2] = useState("")
  const [timeoutHome, setTimeoutHome] = useState(0);
  const [timeoutGuest, setTimeoutGuest] = useState(0);
  const [foulHome, setFoulHome] = useState(0);
  const [foulGuest, setFoulGuest] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [shotClock, setShotClock] = useState(25);
  const [toggle, setToggle] = useState(true);
  const [quarterDisplay, setQuarterDisplay] = useState("1st")
  const [togglePlay, setTogglePlay] = useState(true)
  const [started, setStarted] = useState(false)
  const audioRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    seconds,
    minutes,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: time, onExpire: () => {
    play();
    quarterName(quarter);
    setQuarter(quarter+1);
  } });

  useEffect(() => {
    document.getElementById("commands").focus();
    restart(time, false);
    pause();
  }, [])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  function quarterName(quarter: number){
    if (quarter + 1 === 1) {
      setQuarterDisplay("1st")
    }
    else if (quarter + 1 === 2) {
      setQuarterDisplay("2nd")
    }
    else if (quarter + 1 === 3) {
      setQuarterDisplay("3rd")
    }
    else if (quarter + 1 === 4) {
      setQuarterDisplay("4th")
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

  function handleKeyDown(input : string) {  
    if (input[input.length-1] === ' '){
      if (togglePlay){
        if (started === false){
          start()
          setStarted(true)
        }
        else{
          resume();
        }
      }
      else{
        pause();
      }
      setTogglePlay(!togglePlay)
    }
    else if (input[input.length-1].toLowerCase() === 'q'){
      setShotClock(24)
    }
    else if (input[input.length-1].toLowerCase() === 'w'){
      setShotClock(14)
    }
    else if (input[input.length-1].toLowerCase() === '1'){
      setScoreHome(scoreHome+1)
    }
    else if (input[input.length-1].toLowerCase() === '2'){
      setScoreHome(scoreHome-1)
    }
    else if (input[input.length-1].toLowerCase() === '3'){
      setScoreGuest(scoreGuest+1)
    }
    else if (input[input.length-1].toLowerCase() === '4'){
      setScoreGuest(scoreGuest-1)
    }
    else if (input[input.length-1].toLowerCase() === '!'){
      restart(time, false);
      setShotClock(24)
    }
    else if (input[input.length-1].toLowerCase() === 'b'){
      setToggle(!toggle)
    }
  }
  

  return (
    <>
    <Flex justifyContent="center" alignItems="center">
      <Box textAlign="center" p="8" border="3px solid yellow">
        <Text fontSize="4vw">{teamName1}</Text>
        <Heading color="red" fontSize="500px">{scoreHome < 10 && scoreHome >=0 ? `0${scoreHome}`: scoreHome}</Heading>
        <Flex mt="2vh" justifyContent="center">
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreHome(scoreHome+1)}>+ 1</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreHome(scoreHome+2)}>+ 2</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreHome(scoreHome+3)}>+ 3</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreHome(scoreHome-1)}>- 1</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreHome(0)}>Reset</Button>
        </Flex>
        <Flex mt="2vh" justifyContent="space-between">
          <Flex alignItems="center" mr="1vw">
            <Text fontSize="24px" mr="1vw">Fouls: {foulHome}</Text>
            <Button size="xs" bg="transparent" border="solid 2px white" mr="4px" onClick={(e)=>setFoulHome(foulHome+1)}>+</Button>
            <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setFoulHome(foulHome-1)}>-</Button>
          </Flex>
          <Flex alignItems="center">
            <Text fontSize="24px">Timeouts: {timeoutHome}</Text>
            <Button size="xs" bg="transparent" border="solid 2px white" mr="4px" onClick={(e)=>setTimeoutHome(timeoutHome+1)}>+</Button>
            <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setTimeoutHome(timeoutHome-1)}>-</Button>
          </Flex>
        </Flex>
      </Box>
      <Box textAlign="center">
        <Heading color="yellow" fontSize="360px">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10? `0${seconds}`: seconds}</Heading>
        <Flex textAlign="center" justifyContent="center" alignItems="center">
          {toggle? <ArrowRightIcon boxSize={100}/> : <ArrowLeftIcon boxSize={100}/>}
          <Text ml="2vw" fontSize="100">{quarterDisplay}</Text>
        </Flex>
        <Heading color="yellow" fontSize="300px">{shotClock}</Heading>
        <Button size="xs" bg="transparent" border="solid 2px white" onClick={()=>setShotClock(24)}>Reset 24</Button>
        <Button size="xs" bg="transparent" border="solid 2px white" onClick={()=>setShotClock(14)}>Reset 14</Button>
      </Box>
      <Box textAlign="center" py="2vh" border="3px solid yellow" p="4">
        <Text fontSize="4vw">{teamName2}</Text>
        <Heading color="red" mt="4vh" fontSize="500px">{scoreGuest < 10 && scoreGuest >=0 ? `0${scoreGuest}`: scoreGuest}</Heading>
        <Flex mt="2vh" justifyContent="center">
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreGuest(scoreGuest+1)}>+ 1</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreGuest(scoreGuest+2)}>+ 2</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreGuest(scoreGuest+3)}>+ 3</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreGuest(scoreGuest-1)}>- 1</Button>
          <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setScoreGuest(0)}>Reset</Button>
        </Flex>
        <Flex mt="2vh" justifyContent="space-between">
          <Flex alignItems="center" mr="1vw">
            <Text fontSize="24px" mr="1vw">Fouls: {foulGuest}</Text>
            <Button size="xs" bg="transparent" border="solid 2px white" mr="4px" onClick={(e)=>setFoulGuest(foulGuest+1)}>+</Button>
            <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setFoulGuest(foulGuest-1)}>-</Button>
          </Flex>
          <Flex alignItems="center">
            <Text fontSize="24px">Timeouts: {timeoutGuest}</Text>
            <Button size="xs" bg="transparent" border="solid 2px white" mr="4px" onClick={(e)=>setTimeoutGuest(timeoutGuest+1)}>+</Button>
            <Button size="xs" bg="transparent" border="solid 2px white" onClick={(e)=>setTimeoutGuest(timeoutGuest-1)}>-</Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
    <Flex position="absolute" w="100vw" justifyContent="center" >
      <Input border="none" w="10px" textAlign="center" onChange={(e)=>setTeamName1(e.target.value)} type="text"/>
      <Input border="solid 1px yellow" id="commands" focus w="100px" textAlign="center" onChange={e=>{handleKeyDown(e.target.value); e.target.value=''}} type="text"/>
      <Input border="none" w="10px" textAlign="center" onChange={(e)=>setTeamName2(e.target.value)} type="text"/>
      <audio ref={audioRef} src='/audio/timeout.mp3' />
    </Flex>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text>Sure ka?</Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant='ghost' onClick={onClose}>
              No
            </Button>
            <Button colorScheme='blue' onClick={()=>{restart(time, false); onClose()}}>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}