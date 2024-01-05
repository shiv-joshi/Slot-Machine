import Reels_module from './Reels.module.scss';
import Classnames from 'classnames';
import * as gameData from '../game.json';
import { useState } from 'react';

type Props = {
    balance: number;
    lines: number;
    bet: number;
    onWinning: (profit: number) => void;
    onClick: () => void;
}

function ReelsComp(props: Props) {
    const { ROWS, COLS, SYMBOLS_COUNT, SYMBOL_VALUES } = gameData;
    const [reels, setReels] = useState<string[][]>([]);
    const [spun, setSpun] = useState(false);
    const [winnings, setWinnings] = useState(0);

    // displays reels
    const displayResults = () => {
        const result = spin();
        setReels(result);
        setSpun(true);
        const winnings = getWinnings(result, props.bet, props.lines);
        setWinnings(winnings);
        props.onWinning(winnings);
    }

    // spin the reels
    const spin = () => {
        // create list of all available symbols for reels to choose from
        const availableSymbols = [];
        for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
            for (let i = 0; i < count; i++) {
                availableSymbols.push(symbol);
            }
        }

        // randomize selection
        const reels: string[][] = [[], [], []];
        for (let i = 0; i < ROWS; i++) {
            // this reel can only choose from this list
            const reelSymbols = [...availableSymbols];
            for (let j = 0; j < COLS; j++) {
                // pick a symbol and delete it from reelSymbols
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];

                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1);
            }
        }

        // transpose the results
        return transpose(reels);
    }

    // transpose the reels into rows
    const transpose = (reels: string[][]) => {
        const rows: string[][] = [];

        for (let i = 0; i < ROWS; i++) {
            rows.push([])
            for (let j = 0; j < COLS; j++) {
                rows[i].push(reels[j][i]);
            }
        }

        return rows;
    }

    // calculate winnings
    const getWinnings = (rows: string[][], bet: number, lines: number) => {
        let winnings = 0;

        // look at only the lines they bet on
        for (let row = 0; row < lines; row++) {
            const symbols = rows[row];
            let allSame = true;

            // check if whole row's symbols are the same
            for (const symbol of symbols) {
                if (symbol !== symbols[0]) {
                    allSame = false
                    break;
                }
            }

            // check if user won on this line
            if (allSame) {
                // Explicitly assert the type of symbols[0]
                const symbolKey = symbols[0] as keyof typeof SYMBOL_VALUES;
                winnings += bet * SYMBOL_VALUES[symbolKey];
            }
        }

        return winnings
    };

    return (
        <div className={Reels_module['slots-container']}>
            <button onClick={displayResults} className={Reels_module['spin-button']} disabled={spun}>Spin!</button>
            <br />
            {spun && (<div className={Reels_module.grid}>
                <div className={Reels_module.slot}>
                    <div>{reels[0][0]}</div>
                    <div>{reels[0][1]}</div>
                    <div>{reels[0][2]}</div>
                </div>
                <div className={Reels_module.slot}>
                    <div>{reels[1][0]}</div>
                    <div>{reels[1][1]}</div>
                    <div>{reels[1][2]}</div>
                </div>
                <div className={Reels_module.slot}>
                    <div>{reels[2][0]}</div>
                    <div>{reels[2][1]}</div>
                    <div>{reels[2][2]}</div>
                </div>
            </div>)}

            {spun && (<label className={Reels_module.winning}>You won ${winnings}!</label>)}
            <br />
            {spun && <button onClick={props.onClick} className={Reels_module['spin-button']}>Try Again!</button>}
        </div>
    );
}

export default ReelsComp;