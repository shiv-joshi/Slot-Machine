import { useState } from "react";
import DepositInput_module from './DepositInput.module.scss';

type Props = {
    onSelection: (lines: number) => void;
}

function LinesInput(props: Props) {
    const [num, setNum] = useState(0);
    const [valid, setValid] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10)
        if (value > 0 && value <= 3) {
            setNum(value);
            setValid(true);
        }
    };

    const handleLines = () => {
        props.onSelection(num);
    }

    return (
        <div className={DepositInput_module['setup-input']}>
            <label>
                Number of lines (1-3):
            </label>
            <input
                placeholder="Type any number..."
                type="number"
                onChange={handleChange}
            />
            {valid && <button onClick={handleLines}>Select</button>}
        </div>
    );
}

export default LinesInput;