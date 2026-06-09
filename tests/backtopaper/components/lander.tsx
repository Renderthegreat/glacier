import * as G from '#~/components.tsx';
import { componentFunction, } from '#~/index.ts';

import { EpicText, } from '#tests/backtopaper/components/epic-text.tsx';

export const Landing = componentFunction<{}>((_config) => {
	return <G.Div class='lander'>
		<EpicText>TRUST IS ^NOT ^A ^SCRIPT.</EpicText>
	</G.Div>;
});