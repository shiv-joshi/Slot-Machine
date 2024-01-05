import { createBoard } from '@wixc3/react-board';
import ReelsComp from '../../../components/Reels';

export default createBoard({
    name: 'ReelsComp',
    Board: () => <ReelsComp />,
    isSnippet: true,
});
