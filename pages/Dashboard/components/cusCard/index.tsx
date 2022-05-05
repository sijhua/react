import * as React from 'react';
import styles from './index.module.css';
import {Card,Button} from '@material-ui/core';

interface Props {
    children?: React.ReactNode;
    data:any;
    type:string;
    customCss?:any;
    width?:string;
    bollsize?:string;
    money?:Boolean;
    onhide:() => void
    // height?:String;
  }
// 

  function CusCard(props: Props) {
    const { children,width,type,data,bollsize,money,onhide} = props;
    // const current = data.current
    const [current, setCurrent] = React.useState(data.month.current);

    const setCurrentMonth =(e) =>{
        setCurrent(e)
    }
    console.log(current.name==data.month.current.name)

    return (
        <div className={styles.cusCard_container}>
            <Card className={styles.card_root} style ={width?{width:width}:{width:"fit-content"}} >
                <div className={styles.card_top_button_container}>
                    <div className={styles.card_title_button_group}>
                        
                        <div className={styles.card_top_button_title}>
                            {data.title}
                        </div>
                    </div>
                    <div onClick={onhide} className={styles.card_top_button_fold}>
                        <img src="/img/Dashboard/closeCard.svg"></img>
                    </div>
                </div>

                <div className={styles.cusCard_body}>
                    <div className={styles.selectedMonth_group}>{data.year+" "+current.name}</div>
                    {type=="ball"?
                        <div className={bollsize && bollsize=="small"?styles.cusCard_ball_container:styles.cusCard_ball_container_big}>
                           
                          {/*  style={ bollsize && bollsize=="small"?{lineHeight: "7.3vw"}:{lineHeight: "12.8vw"}} */}
                            <div className={styles.data_container}>
                            {data && data.rank?
                                <div className={styles.rank_group}>
                                    <div className={styles.rank_img}>
                                        <img src="/img/Dashboard/campine.svg"></img>
                                    </div>
                                    <div className={styles.rank_text}>No{data.rank}</div>
                                </div>
                            :[]}
                                {money?"$"+current.data:current.data}</div>
                            <div className={bollsize && bollsize=="small"?styles.cusCard_ball:styles.cusCard_ball_big}>
                                <img src="/img/Dashboard/pop.svg"></img>
                            </div>
                            
                        </div>
                        :[]
                    }
                    <div className={styles.monthButton_group}>
                        <div onClick={(e) => setCurrentMonth(data.month.last)} className={current.name==data.month.last.name?styles.monthButton_selected:styles.monthButton}>{data.month.last.name}</div>
                        <div onClick={(e) => setCurrentMonth(data.month.current)} className={current.name==data.month.current.name?styles.monthButton_selected:styles.monthButton}>{data.month.current.name}</div>
                        <div onClick={(e) => setCurrentMonth(data.month.future)} className={current.name==data.month.future.name?styles.monthButton_selected:styles.monthButton}>{data.month.future.name}</div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default CusCard