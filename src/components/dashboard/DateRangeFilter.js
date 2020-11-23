import React, {useState} from 'react'
import DatePickerTool from './DatePicker'
import { connect } from 'react-redux'
import { updateFilter,  getProjects } from '../../store/actions/projectActions'
import Report from '../report/Report'

const DateRange = ({showAll, projects, getProjects, startDate, endDate, updateFilter, handleCheckboxChange}) => {
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
    
    const search = (e) => {
        e.preventDefault();
        getProjects();
        // handleCheckboxChange(e);
    }

  return (
    <div className='filter-grid  filter'>
        <label className="datePicker">Filter Dates: </label>
        <div>
            <label className=" -input">Start </label>
            <DatePickerTool date={startDate} setDate={setStartDate} className='datePicker'/>
        </div>
        <div>
            <label className=" -input">End </label>
            <DatePickerTool date={endDate} setDate={setEndDate} className='datePicker'/>
        </div>
        <div>
        <label>Quick</label>
            <select value={quickSelect}className='datePicker ' style={{width:'120px', marginLeft:'5px'}} onChange = {e => onQuickSelectChange(e)}>
                <option value="">Choose One</option>
                <option value="oneMonth">1 Month</option>
                <option value="threeMonths">3 Months</option>
                <option value="sixMonths">6 months</option>
                <option value="oneYear">1 year</option>
            </select>
        </div>
            {/* <button id='search' className="-input" onClick={e=>search(e)}>SEARCH</button> */}
            <i id='search' onClick={e=>search(e)} class="action-icon fas fa-search"> SEARCH</i>
            <i id='clear' onClick={e=>clear(e)} class="action-icon fas fa-times"> CLEAR</i>
            {/* <button id='clear' className="-input" onClick={e=>clear(e)}>clear</button> */}
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
        updateFilter: (label,value) => dispatch(updateFilter(label,value)),
        getProjects: () => dispatch(getProjects())
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(DateRange);