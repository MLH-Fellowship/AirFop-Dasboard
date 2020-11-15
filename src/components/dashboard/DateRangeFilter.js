import React, {useState} from 'react'
import DatePickerTool from './DatePicker'
import { connect } from 'react-redux'
import { updateFilter } from '../../store/actions/projectActions'
import Report from '../report/Report'

const DateRange = ({showAll, projects, startDate, endDate, updateFilter, handleCheckboxChange}) => {
    const [quickSelect, setQuickSelect] = useState("");
    const setStartDate = (date) => {
        updateFilter('start', date);
        if(showAll){
            updateFilter('showAll', false);
        }
    }
    const setEndDate = (date) => {
        updateFilter('end', date);
        if(showAll){
            updateFilter('showAll', false);
        }
        if(!startDate){
            let start = new Date();
            updateFilter('start', start);
        }
    }
    const onQuickSelectChange = (e) => {
        setQuickSelect(e.target.value)
        let date;
        if(!startDate){
            startDate = new Date();
            updateFilter('start', startDate);
        }
        
        let newDate;
        switch(e.target.value){
            case "oneMonth":
                date = new Date(startDate);
                newDate = new Date(date.setMonth(date.getMonth()+1));
                setEndDate(newDate);
                break;
            case "threeMonths":
                date = new Date(startDate);
                newDate = new Date(date.setMonth(date.getMonth()+3));
                setEndDate(newDate);
                break;
            case "sixMonths":
                date = new Date(startDate);
                newDate = new Date(date.setMonth(date.getMonth()+6));
                setEndDate(newDate);
                break;
            case "oneYear":
                date = new Date(startDate);
                newDate = new Date(date.setYear(date.getYear()+1));
                setEndDate(newDate);
                break;
            default: return;
        }
    }

    const clear = (e) => {
        e.preventDefault();
        setQuickSelect("");
        handleCheckboxChange(e);
    }

  return (
    <div className='filter-grid form-check filter'>
        <label className="form-check">Filter Dates: </label>
        <div>
            <label className="form-check form-check-input">Start </label>
            <DatePickerTool date={startDate} setDate={setStartDate} className='datePicker'/>
        </div>
        <div>
            <label className="form-check form-check-input">End </label>
            <DatePickerTool date={endDate} setDate={setEndDate} className='datePicker'/>
        </div>
        <div>
        <label className="form-check form-check-input">Quick</label>
            <select value={quickSelect}className='datePicker ' style={{width:'100px', marginLeft:'5px'}} onChange = {e => onQuickSelectChange(e)}>
                <option value="">Choose One</option>
                <option value="oneMonth">1 Month</option>
                <option value="threeMonths">3 Months</option>
                <option value="sixMonths">6 months</option>
                <option value="oneYear">1 year</option>
            </select>
        </div>
            <button id='clear' className="form-check-input" onClick={e=>clear(e)}>clear</button>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        startDate: state.project.startDate,
        endDate: state.project.endDate,
        showAll: state.project.showAll
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateFilter: (label,value) => dispatch(updateFilter(label,value))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(DateRange);