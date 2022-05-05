import * as React from 'react';
import styles from './index.module.css';
import CompanyInfo from './companyInfo';
import TabPanel from '../TabPanel';
import {Divider,Tabs,Tab} from '@material-ui/core';
import CusCard from '../cusCard';
import PaymentMethod from './paymentMethod';
import Delivery from './delivery';
import Sales from './sales';
import ProductScheme from './productScheme'
import SellerScheme from './sellerScheme'

export interface Props {
    t:(params: String) => string;
    lay:string
}

const initialState = {
    currentBoard:"setting",
    card_1_state:true,
    card_2_state:true,
}

type State = {
    currentBoard:String
    card_1_state:Boolean,
    card_2_state:Boolean,
}


class Account extends React.Component<Props, object> {
  state = initialState;


    private test() {
    }

    private controlCard_1 = () =>{

        this.setState({card_1_state:!this.state.card_1_state})
    }
    private controlCard_2 = () =>{
        this.setState({card_2_state:!this.state.card_2_state})
    }


    private handleChange = (event: React.ChangeEvent<{}>, newValue: String) => {

        this.setState({currentBoard:newValue})

    };
    render(){
        const {t,lay} = this.props
        return(
            <div className={lay==="flex"? this.state.card_1_state || this.state.card_2_state?styles.account_container:styles.account_container_pad:styles.account_container_pad}>

                <div className={lay==="flex"? this.state.card_1_state || this.state.card_2_state?styles.card_group_container:styles.card_group_container_hide:styles.card_group_container_pad}>

                    <div className={this.state.card_1_state?styles.card_top_button_conner_cont:styles.card_top_button_conner_bubble}>
                        <div onClick={this.controlCard_1} className={this.state.card_1_state?styles.card_top_button_conner:styles.card_top_button_conner_hide}>
                            <img src={this.state.card_1_state?"/img/Dashboard/conner.svg":"/img/Dashboard/pop.svg"}></img>
                        </div>
                        {this.state.card_1_state?
                        <CusCard
                            type="ball"
                            width={"20vw"}
                            data={{title:"Monthly Saler Applicants",
                            year:"2021",
                            month:{last:{name:"March",data:"20"},
                            current:{name:"April",data:"22"},
                            future:{name:"May",data:"25"}
                            }
                            }}
                            bollsize="small"
                            onhide={this.controlCard_1}
                        ></CusCard>:[]
                    }
                    </div>

                    <div className={this.state.card_2_state?styles.card_top_button_conner_cont:styles.card_top_button_conner_bubble}>
                        <div  onClick={this.controlCard_2}  className={this.state.card_2_state?styles.card_top_button_conner:styles.card_top_button_conner_hide}>
                            <img src={this.state.card_2_state?"/img/Dashboard/conner.svg":"/img/Dashboard/pop.svg"}></img>
                        </div>
                        {this.state.card_2_state?
                        <CusCard
                            type="ball"
                            width={"20vw"}
                            data={{title:"Monthly Sales",
                            year:"2021",
                            month:{last:{name:"March",data:"250,888"},
                            current:{name:"April",data:"350,888"},
                            future:{name:"May",data:"252,888"}
                            },
                            rank:"3",
                            
                            }}
                            money={true}
                            onhide={this.controlCard_2}
                        ></CusCard>:[]}
                    </div>
                </div>


                <div className={styles.account_body_container}>
                    <div className={this.state.card_1_state || this.state.card_2_state?styles.account_tab_container:styles.account_tab_container_hide}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        value={this.state.currentBoard}
                        onChange={this.handleChange}
                        classes={{ indicator:styles.indicator,flexContainer:styles.account_tabsList}}
                    > 
                            <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}} 
                            label={t("dashboard.acc.companyInfo")} 
                            value="companyInfo" 
                            icon={<div onClick={this.test} className={styles.account_down_icon}>
                            <img src={this.state.currentBoard=="companyInfo"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                        </div>}
                            />
      
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                            label={t("dashboard.acc.paymentMethod")} 
                            value="paymentMethod" 
                            icon={<div onClick={this.test} className={styles.account_down_icon}>
                            <img src={this.state.currentBoard=="paymentMethod"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                        </div>}
                            />
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                                label={t("dashboard.acc.productScheme")} 
                                value="productScheme" 
                                icon={<div onClick={this.test} className={styles.account_down_icon}>
                                    <img src={this.state.currentBoard=="productScheme"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                                </div>}
                                />
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                                label={t("dashboard.acc.sales")} 
                                value="sales" 
                                icon={<div onClick={this.test} className={styles.account_down_icon}>
                                    <img src={this.state.currentBoard=="sales"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                                </div>}
                                />
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                                label={t("dashboard.acc.setting")} 
                                value="setting" 
                                icon={<div onClick={this.test} className={styles.account_down_icon}>
                                    <img src={this.state.currentBoard=="setting"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                                </div>}
                            />
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                                label={t("dashboard.acc.sellerScheme")} 
                                value="sellerScheme" 
                                icon={<div onClick={this.test} className={styles.account_down_icon}>
                                    <img src={this.state.currentBoard=="sellerScheme"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                                </div>}
                                />    


                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot,wrapper:styles.wrapper}}  
                            label={t("dashboard.acc.more")} 
                            value="more" 
                            icon={<div onClick={this.test} className={styles.account_down_icon}>
                                    <img className={styles.account_more_icon} src={this.state.currentBoard=="more"?"/img/Dashboard/more.svg":"/img/Dashboard/more.svg"}></img>
                                </div>}
                            />
                    </Tabs>
                    <Divider/>
                    </div>

                    <div className={styles.account_body_container}>

                        <TabPanel value={this.state.currentBoard} index={"companyInfo"}>
                            
                            <CompanyInfo
                                t={t}
                                
                            />
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"paymentMethod"}>
                            <PaymentMethod
                                t={t}
                                
                            />
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"productScheme"}>
                            <ProductScheme
                                t={t}
                                
                            />
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"sales"}>
                            <Sales
                                t={t}
                                
                            />
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"setting"}>
                            <Delivery
                                t={t}
                            />
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"sellerScheme"}>
                            <SellerScheme
                                t={t}
                            />
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"more"}>
                            <CompanyInfo
                                t={t}
                                
                            />
                        </TabPanel>
                    </div>
                
                </div>
            </div>
        )
    }

}

export default Account;
