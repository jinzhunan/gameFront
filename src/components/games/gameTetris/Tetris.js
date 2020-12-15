import React, { useState,useEffect, useRef } from 'react';
import {useSelector, useDispatch } from 'react-redux'


import { createStage, checkCollision } from './gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from './hooks/useInterval';
import { usePlayer } from './hooks/usePlayer';
import { useStage } from './hooks/useStage';
import { useGameStatus } from './hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// api
import { setTetrisScore, getTetrisScores} from '../../../api/ApiData'
import { setUsers} from '../../../actions/users'
import {Button, ButtonGroup } from '@material-ui/core'

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [TopScores, setTopScores] = useState(null);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const controlRef = useRef()

  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect( () => {
    const userInfo = async() =>{ 
      setTopScores(await getTetrisScores())
      if(users.jwt){
        dispatch(setUsers(users.jwt));
      }}
      userInfo()
      console.log(window.innerWidth)
      if(window.innerWidth < 700){
        window.scrollTo(0,10000)
      }
  }, [])



  // console.log('re-render');

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = async () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);

    setTopScores(await getTetrisScores())
    if(window.innerWidth < 700){
      const move = controlRef.current.offsetHeight + controlRef.current.offsetTop - window.innerHeight

      window.scrollTo(0,move)
    }
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setTetrisScore(users.userName, score)

        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.

    // setDropTime(null);
      drop();

  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
          <div>
          <Stage stage={stage} />

            <ButtonGroup ref={controlRef} fullWidth>
              <Button color="secondary" variant="contained" style={{margin: '5px'}} onClick={()=> !gameOver && movePlayer(-1)}>left</Button>
              <Button color="secondary" variant="contained" style={{margin: '5px'}} onClick={()=> !gameOver && playerRotate(stage, 1)}>rotate</Button>
              <Button color="secondary" variant="contained" style={{margin: '5px'}} onClick={()=> !gameOver && dropPlayer()} >down</Button>
              <Button color="secondary" variant="contained" style={{margin: '5px'}} onClick={()=> !gameOver && movePlayer(1)}>right</Button>
            </ButtonGroup>
          </div>


        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            
            <div>

              <Display text={<ol style={{margin: 0, paddingLeft: '20px'}}>
              {
                TopScores && TopScores.map((data)=> <li key={data.id}>{`${data.username}: ${data.score}`}</li>)
              }

              </ol>}/>
              <Display text={`${users.userName}`} />
              <Display text={`Score: ${score}`} />
              <Display text={`rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
