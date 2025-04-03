import './StartScreen.css'

const StartScreen = ({startGame}) => {

    return (
    <div className="start">
        <h1>Secret Word!</h1>
        <h3>Clique no botão para iniciar</h3>
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen