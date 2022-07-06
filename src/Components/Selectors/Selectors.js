import React, { useState } from "react";
import styles from './Selectors.module.css'
import Options from "../Options/Options";
import Select from "./Select";

const Selectors = props => {
    const [activeSelector, setActiveSelector] = useState('first');


    return <div className={styles.controls}>
        
        <div className={`${styles.selectors}`}>
            <div className={styles.selectCont}>
            <Select 
                title='День' 
                mode='day' 
                num='first' 
                activeSelector={activeSelector}
                setActiveSelector={setActiveSelector}
                onFetch={props.onFetch}
            />
            </div>
            <div className={styles.selectCont}>
            <Select 
                title='Месяц' 
                mode='month' 
                num='second' 
                setActiveSelector={setActiveSelector} 
                activeSelector={activeSelector}
                onFetch={props.onFetch}
            />
            </div>
            <div className={styles.selectCont}>
            <Select 
                title='Год' 
                mode='year' 
                num='therd' 
                setActiveSelector={setActiveSelector} 
                activeSelector={activeSelector}
                onFetch={props.onFetch}
            />
            </div>
        </div>
    </div>
}
export default Selectors