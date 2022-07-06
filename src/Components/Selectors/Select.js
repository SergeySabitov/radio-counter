import React, { useState } from "react";
import Options from "../Options/Options";
import styles from './Select.module.css'

const BEGINNING = new Date(2022, 3, 14);

const makeDatesAndValues = (mode) => {
    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    };
    let curDate;
    let curValue;

    let newDate = new Date();
    const datesAndValues = [];
    if (mode === 'day') {
        let first = true;
        while (newDate > BEGINNING)
        {
            if (first) {
                curDate = 'Сегодня';
                first = false;
            } 
            else {
                curDate = `${newDate.toLocaleString("ru", dateOptions)}`;
            }
            curValue = newDate.toLocaleString("ru", dateOptions).split('.').reverse().join('-');
            datesAndValues.push({
                curDate: curDate,
                curValue
            });
            newDate.setDate(newDate.getDate() - 1);
        }
    } 
    if (mode === 'month') {
        while (newDate > BEGINNING) {
            newDate.setDate(1);
            curDate = `${newDate.toLocaleString('ru', {month:'long'})}`;
            curValue = newDate.toLocaleString("ru", dateOptions).split('.').reverse().join('-');
            datesAndValues.push({
                curDate: curDate,
                curValue
            })
            newDate.setDate(newDate.getDate()-1);
        }
    }
    if (mode === 'year') {
        newDate.setFullYear(newDate.getFullYear(), 0, 1);
        while (newDate.getFullYear() >= BEGINNING.getFullYear()) {
            curDate = `${newDate.getFullYear()}`;
            curValue = newDate.toLocaleString("ru", dateOptions).split('.').reverse().join('-');
            datesAndValues.push({
                curDate: curDate,
                curValue
            })
            newDate.setFullYear(newDate.getFullYear()-1, 0, 1);
        }
    }
    return datesAndValues;
}
const Select = props => {
    
    const datesAndValues = makeDatesAndValues(props.mode);
    const [selectedItem, setSelectedItem] = useState(datesAndValues[0].curDate);
    const [open, setOpen] = useState(false);
    if (props.activeSelector !== props.num && open === true)//если меню было открыто но был выбран другой select то закрываем открытый список
        setOpen(false);

    const onClickHandler = () => {
        if (props.activeSelector !== props.num ) {
            props.setActiveSelector(props.num);
        }
        setOpen(prev => !prev);
    }
    const setSelectedItemHandler = (dateValue, visibleDateValue) => {
        setOpen(prev => !prev);
        setSelectedItem(visibleDateValue)
        props.onFetch({"start":dateValue, "mod":props.mode})
    }
    const activeClass = props.activeSelector === props.num ? styles.active: '';
    const showClass = open ? styles.show : '';
    return <>
        <div className={`${styles.title} ${activeClass}`}>{props.title}</div>
        <div className={`${styles.select} ${showClass} ${activeClass}`} onClick={onClickHandler}>
            <span>{selectedItem}</span>
            <span>&#x25BC;</span>
        </div>
        <div className={styles.ulContainer}>
            <ul className={`${styles.dropDown} ${showClass}`}>
                <Options datesAndValues={datesAndValues} setSelectedItem={setSelectedItemHandler}/>
            </ul>
        </div>
    </>
}
export default Select