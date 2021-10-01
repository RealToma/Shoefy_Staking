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

import CachedIcon from '@mui/icons-material/Cached';
import AppsIcon from '@mui/icons-material/Apps';
import InputIcon from '@mui/icons-material/Input';

import mark from '../../src/images/mark.png';
import mark1 from '../../src/images/mark1.png';



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
						<img src={mark} className="img-logo" alt="ShoeFy Finance" />
						<span className="font_logo">ShoeFy</span>
					</a>
					<a href="/home">
						<img src={mark1} className="img-logo img-logo1" alt="ShoeFy Finance" />
						<div className="pair_letter">
							<div className="font_logo1">
							Buy $Shoe
							</div>
							<div className="font_logo2">
							Current Price:$0.71
							</div>
						</div>
						
					</a>
					<button className="navbar-toggler" type="button" data-bs-target="#mainNav" data-bs-toggle="collapse"
						aria-controls="navbarSupportedContent" aria-label="Toggle navigation" ref={this.collapseRef}>
						<FontAwesomeIcon icon={faBars} />
					</button>
				</div>
				<nav id="mainNav">
					<ul className="navbar-nav">
						<a className="link_letter" href="nftStaking"><li className="nav_letter1"><AppsIcon className="pink" sx={{ fontSize: 20 }} />sNFT Staking</li></a>
						<a className="link_letter" href="nftFarming"><li className="nav_letter"><CachedIcon className="pink" sx={{ fontSize: 20 }} />sNFT Farming</li></a>
						<a className="link_letter" href="shoefyStaking"><li className="nav_letter"><InputIcon className="pink" sx={{ fontSize: 20 }} />$Shoe Staking</li></a>
					</ul>
				</nav>

				{/* <nav id="mainNav">
					<ul className="navbar-nav">
						{
							pages1.map(page => {
								const classes = ['nav-item', page.id];
								const menuMap = {
									'shoefyStaking': t('nav.shoefyStaking'),
									'nftStaking': t('nav.nftStaking'),
									'snftStaking': t('nav.nftStaking'),
									
								}
								const menuName = (menuMap as any)[`${page.id}`];

								return <li key={`${page.id}`}>
									<NavLink to={page.id} activeClassName="active" className={classes.join(' ')} onClick={this.toggleMenu}>{menuName}</NavLink>
								</li>;
							})
						}
					</ul>
					
				</nav> */}
			</div>
		)
	}
}

export default withTranslation()(ShellNav);
