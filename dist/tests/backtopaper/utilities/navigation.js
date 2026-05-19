import { jsx as _jsx } from "rynth/jsx-runtime";
import * as G from '#~/components';
export function generateNavigation(crumbs, title) {
    const navigationStyle = new CSSStyleSheet({});
    const crumbStyle = new CSSStyleSheet();
    navigationStyle.replaceSync(`
		:host {
			display: inline;

			gap: 10px;
		}
	`);
    crumbStyle.replaceSync(`
		:host {
			text-decoration: none;

			&::after {
				content: " > ";
			}
		}
	`);
    return _jsx(G.Navigation, { style: navigationStyle, children: crumbs.map((crumb) => {
            return _jsx(G.Link, { style: crumbStyle, reference: crumb.path, children: crumb.name });
        })
            .concat(_jsx(G.Text, { class: 'title', children: title })) });
}
;
