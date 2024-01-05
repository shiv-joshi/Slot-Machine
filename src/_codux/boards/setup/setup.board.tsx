import { createBoard } from '@wixc3/react-board';
import Setup from '../../../components/Setup';

export default createBoard({
    name: 'Setup',
    Board: () => <Setup />,
    isSnippet: true,
});
