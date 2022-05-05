import * as React from 'react';
import styles from './index.module.css';
import {Divider,Tabs,Tab} from '@material-ui/core';
import TabPanel from '../TabPanel';
import SalesApplication from './salesApplication';
import Stafftag from './stafftag';

export interface Props {
    t:(params: String) => string;
    lay:string
}

const initialState = {
    currentBoard:"SalesApplication",
}

type State = {
    currentBoard:String

}

class Staff extends React.Component<Props, object> {
    state= initialState

    private handleChange = (event: React.ChangeEvent<{}>, newValue: String) => {
        // test(newValue)
        this.setState({currentBoard:newValue})
        // this.handlePointPosition(newValue)
    };

    render(){
        const {t,lay} = this.props
        return(
            <div className={styles.staff_container}>


                <div className={styles.sales_body_container}>
                    <div className={styles.staff_tab_container}>
                        <Tabs
                            variant="scrollable"
                            scrollButtons="auto"
                            value={this.state.currentBoard}
                            onChange={this.handleChange}
                            classes={{ indicator:styles.indicator,flexContainer:styles.sales_tabsList}}
                        >
                            <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}} 
                            label={t("dashboard.sal.SalesApplication")} 
                            value="SalesApplication" 
                            icon={<div className={styles.staff_down_icon}>
                            <img src={this.state.currentBoard=="SalesApplication"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                        </div>}
                            />
                            <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}} 
                            label={t("dashboard.staff")} 
                            value="staff" 
                            icon={<div className={styles.staff_down_icon}>
                            <img src={this.state.currentBoard=="SalesApplication"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                        </div>}
                            />
                            <Tab classes={{selected:styles.tabSelected,root:styles.staff_more_tabRoot,wrapper:styles.wrapper}}  
                            label={t("dashboard.sal.More")} 
                            value="More" 
                            icon={<div className={styles.sales_down_icon}>
                                    <img className={styles.sales_more_icon} src={this.state.currentBoard=="More"?"/img/Dashboard/more.svg":"/img/Dashboard/more.svg"}></img>
                                </div>}
                            />
                        </Tabs>
                        <Divider/>
                    </div>

                    <div className={styles.sales_body_container}>

                        <TabPanel value={this.state.currentBoard} index={"SalesApplication"}>
                            <SalesApplication
                                t={t}
                                downloadOnly={false}
                            />
                        
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"staff"}>
                            <Stafftag
                                t={t}
                            />
                        </TabPanel>
                            
                        <TabPanel value={this.state.currentBoard} index={"more"}>
                        
                        </TabPanel>
                    </div>
                </div>
            </div>
        )
    }
}

export default Staff