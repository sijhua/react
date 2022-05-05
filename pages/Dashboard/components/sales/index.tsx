import * as React from 'react';
import styles from './index.module.css';
import {Divider,Tabs,Tab} from '@material-ui/core';
import TabPanel from '../TabPanel';
import SalesApplication from './SalesApplication'

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

class Sales extends React.Component<Props, object> {
    state= initialState

    private handleChange = (event: React.ChangeEvent<{}>, newValue: String) => {
        // test(newValue)
        this.setState({currentBoard:newValue})
        // this.handlePointPosition(newValue)
    };
    private test() {
        console.log("this is test")
    }
    render(){
        const {t,lay} = this.props
        return(
            <div className={styles.sales_container}>



            <div className={styles.sales_body_container}>
                <div className={styles.sales_tab_container}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        value={this.state.currentBoard}
                        onChange={this.handleChange}
                        classes={{ indicator:styles.indicator,flexContainer:styles.sales_tabsList}}
                    >
                        {/* <div className={styles.group}> */}
                            <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}} 
                            label={t("dashboard.sal.SalesApplication")} 
                            value="SalesApplication" 
                            icon={<div onClick={this.test} className={styles.sales_down_icon}>
                            <img src={this.state.currentBoard=="SalesApplication"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                        </div>}
                            />
                            {/* <div onClick={this.test} className={styles.sales_down_icon}>
                                <img src={this.state.currentBoard=="companyInfo"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                            </div> */}
                        {/* </div> */}
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                            label={t("dashboard.sal.Saleshistory")} 
                            value="Saleshistory" 
                            icon={<div onClick={this.test} className={styles.sales_down_icon}>
                            <img src={this.state.currentBoard=="Saleshistory"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                        </div>}
                            />
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                                label={t("dashboard.sal.Staff")} 
                                value="Staff" 
                                icon={<div onClick={this.test} className={styles.sales_down_icon}>
                                    <img src={this.state.currentBoard=="Staff"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                                </div>}
                                />
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                                label={t("dashboard.sal.Customer")} 
                                value="Customer" 
                                icon={<div onClick={this.test} className={styles.sales_down_icon}>
                                    <img src={this.state.currentBoard=="Customer"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                                </div>}
                                />
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                                label={t("dashboard.sal.Salespolicy")} 
                                value="Salespolicy" 
                                icon={<div onClick={this.test} className={styles.sales_down_icon}>
                                    <img src={this.state.currentBoard=="Salespolicy"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                                </div>}
                                />
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                            label={t("dashboard.sal.YearlyReport")} 
                            value="YearlyReport" 
                            icon={<div onClick={this.test} className={styles.sales_down_icon}>
                                <img src={this.state.currentBoard=="YearlyReport"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                            </div>}
                            />
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot,wrapper:styles.wrapper}}  
                            label={t("dashboard.sal.More")} 
                            value="More" 
                            icon={<div onClick={this.test} className={styles.sales_down_icon}>
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
                                downloadOnly={true}
                            />
                          
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"Saleshistory"}>
                            
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"Staff"}>
                           
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"Customer"}>
                            
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"Salespolicy"}>
                            
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"MonthlyReport"}>
                            
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"YearlyReport"}>
                            
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"More"}>
                           
                        </TabPanel>
                    </div>
                
                </div>
            </div>
        )
    }
}

export default Sales