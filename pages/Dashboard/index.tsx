import * as React from "react";
import styles from "./index.module.css";
import DashboardLayout from "../../layout/Dashboard";
import { MenuItem, MenuList, Tabs, Tab } from "@material-ui/core";
// import TabPanel from '@material-ui/lab/TabPanel';
import TabPanel from './components/TabPanel';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import Account from './components/account';
import Sales from './components/sales';
import Staff from './components/staff';
import Event from './components/event';
import MediaQuery from 'react-responsive';
import Products from './components/products';


export interface Props {
    t:(params: String) => string;
  }
  
  const initialState = {
      userData:{username:"Dava Wang"},
    //   onFoldMenuBar:false ,
      menuBarList:[],
      currentPannel:"event",
      pointPosition:"0",
      isFold:false,
    };
  type State = {
    userDate:{username:String},
    onFoldMenuBar:Boolean,
    currentPannel:String,
    pointPosition:String,
    isFold:Boolean,

  };
  
  

class Dashboard extends React.Component<Props, object> {
    state= initialState

    componentDidMount(){
        this.handlePointPosition(this.state.currentPannel)  
    }


    private HOME = "home"
    private SALES = "sales"
    private STAFF = "staff"
    private ACCOUNT = "account"
    private ORDERMANAGEMENT = "OrderManagement"
    private PRODUCTS = "products"
    private POLICY = "policy"
    private SUPPORT = "support"
    private EVENT = "event"

    private handleFold = ()=>{
        this.setState({isFold:!this.state.isFold})
    }

    
  private handlePointPosition = (current:String) => {

      switch(current){
          case this.HOME:
              this.setState({pointPosition:"0"})
              break;
          case this.SALES:
              this.setState({pointPosition:"92px"})
              break;
          case this.STAFF:
              this.setState({pointPosition:"174px"})
              break;
          case this.ACCOUNT:
            this.setState({pointPosition:"256px"})
              break;
          case this.ORDERMANAGEMENT:
            this.setState({pointPosition:"343px"})
            break;
          case this.PRODUCTS:
            this.setState({pointPosition:"420px"})
              break;
          case this.EVENT:
              this.setState({pointPosition:"503px"})
              break;
          case this.POLICY:
              this.setState({pointPosition:"580px"})
              break;
          case this.SUPPORT:
            this.setState({pointPosition:"657px"})
            break;
      }
    }
      private handleChange = (event: React.ChangeEvent<{}>, newValue: String) => {
        this.setState({ currentPannel: newValue });
        this.handlePointPosition(newValue);
      };

  render() {
    const { t } = this.props;

    return (
      <DashboardLayout t={t} userData={this.state.userData}>
        <div className={styles.container}>
          <div className={styles.sideBar_container}>
            {!this.state.isFold ? (
              <div className={styles.menuBarList_container}>
                <Tabs
                  orientation="vertical"
                  classes={{ indicator: styles.indicator }}
                  // classes={indicator:false}
                  value={this.state.currentPannel}
                  onChange={this.handleChange}
                  // variant="scrollable"
                  scrollButtons="off"
                >
                  <Tab
                    classes={{
                      selected: styles.tabSelected,
                      root: styles.tabRoot,
                    }}
                    icon={
                      <div className={styles.menuBar_Item_container}>
                        <img
                          className={styles.test}
                          src="/img/Dashboard/home.svg"
                        ></img>
                      </div>
                    }
                    label={t("dashboard.home")}
                    value="home"
                    key="home"
                    className={styles.tab}
                  />

                  <Tab
                    classes={{
                      selected: styles.tabSelected,
                      root: styles.tabRoot,
                    }}
                    value="sales"
                    className={styles.tab}
                    icon={
                      <div className={styles.menuBar_Item_container}>
                        <img
                          src={
                            this.state.currentPannel == "sales"
                              ? "/img/Dashboard/sale_selected.svg"
                              : "/img/Dashboard/sale.svg"
                          }
                        ></img>
                      </div>
                    }
                    label={t("dashboard.sales")}
                  />
                  <Tab
                    classes={{
                      selected: styles.tabSelected,
                      root: styles.tabRoot,
                    }}
                    value="staff"
                    className={styles.tab}
                    icon={
                      <div className={styles.menuBar_Item_container}>
                        <img
                          src={
                            this.state.currentPannel == "staff"
                              ? "/img/Dashboard/bi_people-fill.svg"
                              : "/img/Dashboard/bi_people-fill.svg"
                          }
                        ></img>
                      </div>
                    }
                    label={t("dashboard.staff")}
                  />
{/* ant-design_shopping-cart-outlined */}
                  <Tab
                    classes={{
                      selected: styles.tabSelected,
                      root: styles.tabRoot,
                    }}
                    value="account"
                    className={styles.tab}
                    icon={
                      <div className={styles.menuBar_Item_container}>
                        <img
                          src={
                            this.state.currentPannel == "account"
                              ? "/img/Dashboard/account_selected.svg"
                              : "/img/Dashboard/account.svg"
                          }
                        ></img>
                      </div>
                    }
                    label={t("dashboard.account")}
                  />
                  <Tab
                    classes={{
                      selected: styles.tabSelected,
                      root: styles.tabRoot,
                    }}
                    value="OrderManagement"
                    className={styles.tab}
                    icon={
                      <div className={styles.menuBar_Item_container}>
                        <img
                          src={
                            this.state.currentPannel == "OrderManagement"
                              ? "/img/Dashboard/ant-design_shopping-cart-outlined.svg"
                              : "/img/Dashboard/ant-design_shopping-cart-outlined.svg"
                          }
                        ></img>
                      </div>
                    }
                    label={t("dashboard.OrderManagement")}
                  />
                  <Tab
                    classes={{
                      selected: styles.tabSelected,
                      root: styles.tabRoot,
                    }}
                    value="products"
                    className={styles.tab}
                    icon={
                      <div className={styles.menuBar_Item_container}>
                        <img src="/img/Dashboard/upload.svg"></img>
                      </div>
                    }
                    label={t("dashboard.products")}
                  />

                  <Tab
                    classes={{
                      selected: styles.tabSelected,
                      root: styles.tabRoot,
                    }}
                    value="event"
                    className={styles.tab}
                    icon={
                      <div className={styles.menuBar_Item_container}>
                        <img src="/img/Dashboard/event.svg"></img>
                      </div>
                    }
                    label={t("dashboard.event")}
                  />

                  <Tab
                    classes={{
                      selected: styles.tabSelected,
                      root: styles.tabRoot,
                    }}
                    value="policy"
                    className={styles.tab}
                    icon={
                      <div className={styles.menuBar_Item_container}>
                        <img src="/img/Dashboard/policy.svg"></img>
                      </div>
                    }
                    label={t("dashboard.policy")}
                  />
                  <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}} 
                      value="support" className={styles.tab} 
                      icon={<div className={styles.menuBar_Item_container}>
                      <img src="/img/Dashboard/Support.svg"></img>
                      </div>} 
                      label={t("dashboard.support")} />
                        
                  </Tabs>
                    
                </div>):[]}
                    <div className={styles.selectePointer_container}>
                        <div onClick={this.handleFold} className={styles.selectePointer} style={{top:this.state.pointPosition}} >
                            <img className={styles.selectePointer_img} src="/img/dashboard/pointout.svg"></img>
                            {/* <div className={styles.selectePointer_icon_wrapper}>  */}
                            {!this.state.isFold?< RemoveSharpIcon className={styles.selectePointer_icon} /> :< AddSharpIcon className={styles.selectePointer_icon} /> }
                            {/* </div> */}
                        </div>
                    </div>
                </div>
                
                
                
            <div className={!this.state.isFold?styles.dashboard_body:styles.dashboard_body_extend}>
                    
                

                    <TabPanel value={this.state.currentPannel} index={"home"}>
                        
                    </TabPanel>
                    <TabPanel value={this.state.currentPannel} index={"sales"}>
                        <MediaQuery minDeviceWidth={1440}>
                          <div><Sales lay={"flex"} t={t}/></div>
                            
                        </MediaQuery>
                        <MediaQuery maxDeviceWidth={1440} >
                          <div><Sales lay={"grid"} t={t}/></div>
                        </MediaQuery>
                    </TabPanel>
                    <TabPanel value={this.state.currentPannel} index={"staff"}>
                        <MediaQuery minDeviceWidth={1440}>
                            <div><Staff lay={"flex"} t={t}/></div>
                            
                        </MediaQuery>
                        <MediaQuery maxDeviceWidth={1440} >
                          <div><Staff lay={"grid"} t={t}/></div>
                            
                        </MediaQuery>
                    </TabPanel>
                    <TabPanel value={this.state.currentPannel} index={"account"}>
                        {/* <></div> */}
                        <MediaQuery minDeviceWidth={1440}>
                          <div> <Account lay={"flex"} t={t}/> </div>
                            
                          </MediaQuery>
              
                        <MediaQuery maxDeviceWidth={1440} >
                          <div> <Account lay={"grid"} t={t}/> </div>
                            
                        </MediaQuery>
                        
                    </TabPanel>
                    <TabPanel value={this.state.currentPannel} index={"products"}>
                      <Products
                        t = {t}/>
                    </TabPanel>
                    <TabPanel value={this.state.currentPannel} index={"event"}>
                      
                        <div><Event t={t}/> </div>
               
                    </TabPanel>
                    <TabPanel value={this.state.currentPannel} index={"policy"}></TabPanel>
                    <TabPanel value={this.state.currentPannel} index={"support"}></TabPanel>
                </div>

          </div>
        {/* </div> */}
      </DashboardLayout>
    );
  }
}
export default Dashboard;
