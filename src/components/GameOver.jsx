import './GameOver.css'

const GameOver = ({retry, score, pickedWord}) => {
  return (
    <div className="gameOver">
      <h1>Game Over!!</h1>
      <h2>Sua pontuação foi: 
        <span> {score}</span>
      </h2>
      <button onClick={retry}>Tentar novamente</button>
    </div>
  )
}

export default GameOver