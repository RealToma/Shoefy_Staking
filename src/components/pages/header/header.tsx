import React from 'react';
import './header.css';

import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Img from '../../../images/fox.png';
import mark from '../../../images/mark_letter.png';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {



    return (
        <div className="i_header"> 
            {/* <div className="ih_left">
                <SearchIcon sx={{ fontSize: 15 }}/>
                <span className="ih_text">Type of Cryptocurrency</span>
            </div> */}
            <div className="ih_left"><img src={mark} className="img-logo" alt="ShoeFy Finance" width="133px" height="35px" />
            {/* <span>Shoe</span><span>Fy</span> */}
            </div>
            <div className="ih_right">
                {/* <SettingsIcon  sx={{ fontSize: 15 }}/>
                <NotificationsIcon className="ih_alert" sx={{ fontSize: 15 }}/> */}
                {/* <img className="ih_img" src={Img} width="30" height="30"></img> */}
                <div className="link_letter">
                    <NavLink className="letter" to="nftStaking">NFTs staking</NavLink>
                    <NavLink className="letter" to="shoefyStaking">Shoe staking</NavLink>
                    <NavLink className="letter" to="nftStaking">Farm</NavLink>
                    <NavLink className="letter" to="shoefyStaking2">Booster NFTs</NavLink>
                    {/* <a className="letter">NFTs staking</a>
                    <a className="letter">Shoe staking</a>
                    <a className="letter">Farm staking</a>
                    <a className="letter">Booster staking</a> */}
                </div>
                <button className="ih_rtext">CONNECT TO WALLET</button>
            </div>
        </div>
    );
}

export { Header };