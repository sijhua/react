import * as React from 'react';
import styles from './index.module.css';
import {Grid,Divider,Container,SvgIcon,Box} from '@material-ui/core';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import { useTranslation, Trans, Translation } from 'react-i18next';



export interface Props {
  t:(params: String) => string;
  userData: {
      username:String
  }
}

const initialState = { 
    isMenuOpen: false,
    messageCount: 1 ,
    anchorEl: null,
    anchorReference: 'anchorEl',
    
};
  type State = {
    isMenuOpen:Boolean,
    messageCount: Number,
    anchorEl: {},
    
  };
//    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

class DashboardLayout extends React.Component<Props, object> {
    state = initialState;
    
    private handleMobileMenuClose = () => {

      };
    
      private handleMenuClose = () => {

        this.setState({isMenuOpen:false})
      };
      private handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {

        this.setState({
            isMenuOpen:true,
            anchorEl: event.currentTarget})
      };

    render() {
      const { children ,t, userData} = this.props;
      const menuId = 'primary-search-account-menu';
      const { anchorEl } = this.state;

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          className={styles.optionMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        </Menu>
      );
      return (
        
        
          <div className={styles.container}>
              {/* <Menu
                // anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.state.isMenuOpen}
                onClose={this.handleMenuClose}
                >
                    <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
                </Menu> */}
                <AppBar color="transparent" className={styles.appBar} position="static">
                    {/* <Toolbar disableGutters={false} className={styles.toolbar}> */}
                    <div className={styles.toolbar}>
                        <div className={styles.leftSide_container}>
                            <div className={styles.logo_container}>
                                <div className={styles.logo_wrapper}>
                                    <img src="/img/HomeLayoutImg/Logo.svg"></img>
                                </div>
                            </div>
                            
                            <div className={styles.search}>
                                <div className={styles.searchIcon}>
                                {/* <SearchIcon /> */}
                                    <img src="/img/Dashboard/searchIcon.svg"></img>
                                </div>
                                <InputBase
                                placeholder="Search here"
                                classes={{
                                    root: styles.inputRoot,
                                    input: styles.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </div>
                        <div className={styles.grow} />
                        <div className={styles.rightSide_container}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={this.state.messageCount} color="secondary">
                                {/* <MailIcon /> */}
                                <div className={styles.mailIcon}>
                                    <img src="/img/Dashboard/messageIcon.svg"></img>
                                </div>
                            </Badge>
                            </IconButton>
                            <IconButton edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                                className={styles.iconButton_user}
                                >

                                <div className={styles.userIcon}>
                                    <img src="/img/Dashboard/userIcon.svg"></img>
                                </div>
                                {userData&&userData.username?(
                                    <div className={styles.username_container}>
                                        <div>{userData.username}</div>
                                        <div className={styles.userSelectionIcon}>
                                            <img src="/img/Dashboard/Intersect.svg"></img>
                                        </div>
                                    </div>
                                    
                                ):[]}
                            </IconButton>
                            {renderMenu}

                        </div>
                        </div>
                </AppBar>
            

            <main>{children}</main>
            <footer>
              <div className={styles.footer}>
                <div className={styles.footer_container}>
                  <Grid container className={styles.footer_content_root} spacing={0}>
                    <Grid item xs={3} className={styles.footer_content}>
                      <div className={styles.footer_content_title}>{t('common.contactUs')}</div>
                      <div className={styles.footer_content_content}>{t('common.number')}</div>
                    </Grid>
                    <Grid item xs={3} className={styles.footer_content} >
                      <div className={styles.footer_content_title}>{t('footer.getInTouch')}</div>
                      <div className={styles.footer_content_content}>{t('common.number')}</div>
                    </Grid>
                    <Grid item xs={3} className={styles.footer_content} >
                      <div className={styles.footer_content_title}>{t('footer.openHour')}</div>
                      <div className={styles.footer_content_content}>{t('footer.hour')}</div>
                    </Grid>
                    <Grid item xs={3} className={styles.footer_content} >
                      <div className={styles.footer_content_title}>{t('footer.visitUs')}</div>
                      <div className={styles.footer_content_content}>{t('footer.address')}</div>
                    </Grid>
                  </Grid>
                  <Divider/>
                  <Grid container className={styles.footer_root} spacing={0}>
                    <Grid item xs={6} className={styles.footer_left}>
                      <div>{t('common.copyright')}</div>
                    </Grid>
                    <Grid item xs={6} className={styles.footer_right} >
                    </Grid>
                  </Grid>
                </div>
              </div>
            </footer>
          </div>
          
      );
    }
  }

  
  
  export default DashboardLayout;