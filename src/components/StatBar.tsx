
import StatBar_module from './StatBar.module.scss'; type Props = {
    balance: number;
    lines: number;
    bpl: number;
}

function StatBar(props: Props) {
    return (
        <div className={StatBar_module['stat-bar']}>
            <h3 className={StatBar_module.stat}>Balance: {props.balance}</h3>
            <h3>Number of lines: {props.lines}</h3>
            <h3>Bet per line: {props.bpl}</h3>
        </div>
    );
}

export default StatBar;