import { useState } from "react";
import DepositInput_module from './DepositInput.module.scss';

type Props = {
    onPlace: (bpl: number) => void;
}

function BplInput(props: Props) {
    const [bet, setBet] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const num = parseInt(event.target.value, 10)
        setBet(num);
    }

    const handleBpl = () => {
        props.onPlace(bet);
    }

    return (
        <div className={DepositInput_module['setup-input']}>
            <label>
                Bet per line:
            </label>
            <input
                placeholder="Type any number..."
                type="number"
                onChange={handleChange}
            />
            <button onClick={handleBpl}>Deposit</button>
        </div>
    );
}

export default BplInput;