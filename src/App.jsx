// css
import './App.css'

// react
import { useCallback, useEffect, useState } from 'react'

//data
import {wordsList} from './data/words'

//components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
];

const guessesQTD = 3;

function App() {
    const [pickedWord, setPickedWord] = useState('');
    const [pickedCategory, setPickedCategory] = useState('');
    const [letters, setLetters] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(guessesQTD);
    const [score, setScore] = useState(0);

    const [gameStage, setgameStage] = useState(stages[0].name);
    const [words] = useState(wordsList);
    
    // pick word and category
    const pickWordAndCategory = useCallback(() => {
        const categories = Object.keys(words);
        const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
        
        const CategoryWords = words[category];
        const wordSelected = CategoryWords[Math.floor(Math.random() * CategoryWords.length)];
        
        let wordLetters = wordSelected.split("");
        wordLetters = wordLetters.map((l) => l.toLocaleLowerCase());

        return {category, wordSelected, wordLetters}
    }, [words])


    // start
    const startGame = useCallback(() => {
        // clear letters states
        setGuessedLetters([]);
        setWrongLetters([]);
        
        const {category, wordSelected, wordLetters} = pickWordAndCategory();
        
        setPickedCategory(category);
        setPickedWord(wordSelected);
        setLetters(wordLetters);

        setgameStage(stages[1].name);
    }, [pickWordAndCategory]);

    // process letter
    const verifyLetter = (letter) => {
        const normalizedLetter = letter.toLocaleLowerCase()

        // verify if letter has already been used
        if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
           return;
        }

        // push guessed letter or remove guess
        if(letters.includes(normalizedLetter)){
            setGuessedLetters((actualGuessedLetters) => [
                ...actualGuessedLetters,
                normalizedLetter
            ])
        }else{
            setWrongLetters((actualWrongLetters) => [
                ...actualWrongLetters,
                normalizedLetter
            ])
            setGuesses(guesses-1);
        }
    };

    // win condition
    useEffect(() => {
        const uniqueLetters = [...new Set(letters)];

        if(guessedLetters.length === uniqueLetters.length && gameStage == stages[1].name){
            // add score
            setScore((actualScore) => (actualScore += 100));
            
            // restart game
            startGame();
        }
    }, [guessedLetters, letters, startGame, gameStage]);

    // game over condition
    useEffect(() => {
        if(guesses === 0){
            // clear game states
            setGuessedLetters([]);
            setWrongLetters([]);

            setgameStage(stages[2].name);
        }
    }, [guesses]);

    // retry game
    const retry = () => {
        // clear game states
        setScore(0);
        setGuesses(guessesQTD);

        setgameStage(stages[0].name);
    };

    return (
        <div className="App">
            {gameStage === 'start' && 
                <StartScreen 
                    startGame={startGame}
                />
            }
            {gameStage === 'game'  && 
                <Game 
                    verifyLetter={verifyLetter}
                    pickedCategory={pickedCategory}
                    pickedWord={pickedWord}
                    letters={letters}
                    guessedLetters={guessedLetters}
                    wrongLetters={wrongLetters}
                    guesses={guesses}
                    score={score}
                />
            }
            {gameStage === 'end'   && 
                <GameOver 
                    retry={retry}
                    score={score}
                    pickedWord={pickedWord}
            />}
        </div>
    )
}

export default App
