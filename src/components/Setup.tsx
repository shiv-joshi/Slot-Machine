import { useState } from "react";
import BplInput from "./BplInput";
import DepositInput from "./DepositInput";
import LinesInput from "./LinesInput";
import Setup_module from './Setup.module.scss';

type Props = {
    onDeposit: (amount: number) => void;
    onSelection: (amount: number) => void;
    onPlace: (amount: number) => void;
    valid: boolean;
}

function Setup(props: Props) {
    const [deposited, setDeposited] = useState(false);
    const [selected, setSelected] = useState(false);

    const onDeposit = () => {
        props.onDeposit;
        setDeposited(true);
    }

    const onSelection = () => {
        props.onSelection;
        setSelected(true);
    }

    return (
        <div className={Setup_module.setup}>
            <DepositInput onDeposit={props.onDeposit} />
            <LinesInput onSelection={props.onSelection} />
            {props.valid && <BplInput onPlace={props.onPlace} />}
        </div>
    );
}

export default Setup;