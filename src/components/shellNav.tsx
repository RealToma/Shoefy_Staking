import * as React from 'react';

import { NavLink, useLocation } from 'react-router-dom';
import { BaseComponent, IShellPage } from './shellInterfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { TFunction, withTranslation, WithTranslation } from 'react-i18next';
import { supportedLanguages, languageCodeOnly } from '../i18n';
import Collapsible from 'react-collapsible';
import './shellNav.css';
import './shellNav.icons.css';

export type ShellNavProps = {
	pages: IShellPage[];
};
export type ShellNavState = {
	currentPage?: IShellPage;
};

class ShellNav extends BaseComponent<ShellNavProps & WithTranslation, ShellNavState> {

	private collapseRef = React.createRef<HTMLButtonElement>();
	constructor(props: ShellNavProps & WithTranslation) {
		super(props);
	}

	toggleMenu = (e) => {
		if (window.innerWidth < 990)
			this.collapseRef.current.click();
	}

	collapsedNavItem(title) {
		return <li className="sudo-nav-link">
			<a href="" className={`d-flex justify-content-between nav-item ${title.toLowerCase()}`}>
				<p>{title}</p>
				<p>▼</p>
			</a>
		</li>
	}

	expandedNavItem(title) {
		return <li className="sudo-nav-link">
			<a href="" className={`d-flex justify-content-between nav-item ${title.toLowerCase()}`}>
				<p>{title}</p>
				<p>▲</p>
			</a>
		</li>
	}

	checkCurrentRoute() {
		const location = window.location;

		console.log(location);

		if (location.pathname == "/launch" || location.pathname == "/lock" || location.pathname == "/swap" || location.pathname == "/liquidity") {
			return true;
		}
		return false;
	}

	render() {
		const pages: IShellPage[] = (this.readProps().pages || []);
		const t: TFunction<"translation"> = this.readProps().t;
		const i18n = this.readProps().i18n;

		const pages1 = pages.slice(0, 2);
		const pages2 = pages.slice(3, 7);

		console.log(pages2);

		// pages.pop(); WIP

		return (
			<div className="navigation-wrapper">
				<div className="logo-wrapper">
					<a href="/home">
						<img src="images/logo.jpg" className="img-logo" alt="ShoeFy Finance" />
						&nbsp; ShoeFy App
					</a>
					<button className="navbar-toggler" type="button" data-bs-target="#mainNav" data-bs-toggle="collapse"
						aria-controls="navbarSupportedContent" aria-label="Toggle navigation" ref={this.collapseRef}>
						<FontAwesomeIcon icon={faBars} />
					</button>
				</div>
				<nav id="mainNav">
					<ul className="navbar-nav">
						{
							pages1.map(page => {
								const classes = ['nav-item', page.id];
								const menuMap = {
									'shoefyStaking': t('nav.shoefyStaking'),
									'nftStaking': t('nav.nftStaking'),
								}
								const menuName = (menuMap as any)[`${page.id}`];

								return <li key={`${page.id}`}>
									<NavLink to={page.id} activeClassName="active" className={classes.join(' ')} onClick={this.toggleMenu}>{menuName}</NavLink>
								</li>;
							})
						}
					</ul>
					
				</nav>
			</div>
		)
	}
}

export default withTranslation()(ShellNav);
