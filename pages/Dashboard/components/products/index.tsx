import * as React from 'react';
import styles from './index.module.css';
import {Divider,Tabs,Tab} from '@material-ui/core';
import TabPanel from '../TabPanel';
import ProductImport from './productImport';

export interface Props {
    t: (params: String) => string;
}

const initialState = {
    currentBoard:"import",
}

type State = {
    currentBoard:string
}

class Products extends React.Component<Props, object> {
    state = initialState;

    private handleChange = (event: React.ChangeEvent<{}>, newValue: String) => {
        this.setState({currentBoard:newValue})
    };

    render(){
        const {t} = this.props
        return(
            <div className={styles.products_container}>
                <div className={styles.products_container_tab_container}>
                        <Tabs
                            variant="scrollable"
                            scrollButtons="auto"
                            value={this.state.currentBoard}
                            onChange={this.handleChange}
                            classes={{ indicator:styles.indicator,flexContainer:styles.sales_tabsList}}
                        >
                            <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}} 
                            label={t("dashboard.prod.productimport")} 
                            value="import" 
                            icon={<div className={styles.staff_down_icon}>
                            <img src={this.state.currentBoard=="SalesApplication"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                        </div>}
                            />
                            <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}} 
                            label={t("dashboard.prod.productdata")} 
                            value="data" 
                            icon={<div className={styles.staff_down_icon}>
                            <img src={this.state.currentBoard=="SalesApplication"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                        </div>}
                            />
                           
                        </Tabs>
                        <Divider/>
                    </div>
                    <div className={styles.product_body_container}>

                        <TabPanel value={this.state.currentBoard} index={"import"}>
                            <ProductImport t = {t} />
                        </TabPanel>
                        <TabPanel value={this.state.currentBoard} index={"data"}>

                        </TabPanel>
                    </div>
            </div>
        )
    }
}

export default Products