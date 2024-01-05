import { useState } from 'react';
import styles from './App.module.scss';
import StatBar from './components/StatBar';
import Setup from './components/Setup';
import DepositInput from './components/DepositInput';
import LinesInput from './components/LinesInput';
import BplInput from './components/BplInput';
import * as gameData from './game.json';
import ReelsComp from './components/Reels';

function App() {
    // initialize state
    const [balance, setBalance] = useState(0);
    const [lines, setLines] = useState(0);
    const [bpl, setBpl] = useState(0);
    const [deposited, setDeposited] = useState(false);
    const [selected, setSelected] = useState(false);
    const [filled, setFilled] = useState(false);
    const [waitingToAdvance, setWaitingToAdvance] = useState(false);

    // add to balance
    const addToBalance = (amount: number) => {
        setBalance(balance + amount);
        setDeposited(true);
    };

    // get # of lines to bet on
    const getLines = (num: number) => {
        setLines(num);
        setSelected(true);
    };

    // get bet per line
    const getBpl = (bet: number) => {
        if ((bet * lines) <= balance) {
            setBpl(bet);
            setFilled(true);
            setBalance(balance - (bet * lines))
        }
    }

    // adjust balance
    const onWinning = (winnings: number) => {
        setBalance(balance + winnings);
    }

    // reset game
    const reset = () => {
        setLines(0);
        setBpl(0);
        setDeposited(false);
        setSelected(false);
        setFilled(false);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>-----Play Slots!-----</h1>
            <StatBar balance={balance} lines={lines} bpl={bpl} />
            {!filled && <Setup onDeposit={addToBalance} onSelection={getLines} onPlace={getBpl} valid={deposited && selected}/>}
            {filled && <ReelsComp balance={balance} lines={lines} bet={bpl} onWinning={onWinning} onClick={reset}/>}
        </div>
    );
}

export default App;
