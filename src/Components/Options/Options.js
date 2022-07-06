
const Options = props => {
    let options;
    const onClickHandler = (event) => {
        // console.log(event.target.getAttribute("date-value"))
        const dateValue = event.target.getAttribute("date-value");
        const visibleDateValue =  event.target.getAttribute("visible-date-value");
        props.setSelectedItem(dateValue, visibleDateValue)
    }
    options = props.datesAndValues.map(item => {
        return <li key={item.curValue} date-value={item.curValue} visible-date-value={item.curDate} onClick={onClickHandler}>{item.curDate}</li>
    })
    //date-value - для запроса данных с бека
    //visible-date-value - дата которая отображается на экране
    return <>{options}</>
}

export default Options