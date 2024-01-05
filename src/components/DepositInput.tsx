import { useState } from "react";
import DepositInput_module from './DepositInput.module.scss';
type Props = {
    onDeposit: (amount: number) => void;
}

function DepositInput(props: Props) {
    const [depositAmount, setDepositAmount] = useState(0);
    const [valid, setValid] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d+$/.test(value) || value === '') {
            setDepositAmount(parseInt(event.target.value, 10));
            setValid(true);
        }
    };

    const handleDeposit = () => {
        props.onDeposit(depositAmount);
    };

    return (
        <div className={DepositInput_module['setup-input']}>
            <label>
                Deposit Amount:
            </label>
            <input
                placeholder="Type any number..."
                type="number"
                onChange={handleChange}
            />
            {valid && <button onClick={handleDeposit}>Deposit</button>}
        </div>

    );
};

export default DepositInput;