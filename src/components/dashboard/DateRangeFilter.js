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
    <div>
        {/* <label className='left'>Date Range: </label> */}
        <div id='date-grid'>
        {/* <div> */}
            <span>
                <label className="date-filter datePicker">Start</label>
                <DatePickerTool date={startDate} setDate={setStartDate} className='datePicker'/>
            </span>
            <span>
                <label className="date-filter datePicker">End</label>
                <DatePickerTool date={endDate} setDate={setEndDate} className='datePicker'/>
            </span>
            <span>
                <label className="date-filter datePicker">Quick</label>
                <select value={quickSelect} className='datePicker' style={{width:'120px'}} onChange = {e => onQuickSelectChange(e)}>
                    <option value="">Choose One</option>
                    <option value="oneMonth">1 Month</option>
                    <option value="threeMonths">3 Months</option>
                    <option value="sixMonths">6 months</option>
                    <option value="oneYear">1 year</option>
                </select>
            </span>
            {/* <span style={{margin:'-3px 0 0 10px', float:'right'}}> */}
            <span >
                <button id='filter'>
                    <i  onClick={e=>search(e)} class="fas fa-filter"> FILTER</i>    
                </button>
                <button id='clear'>
                    <i onClick={e=>clear(e)} class="fas fa-times"> CLEAR</i>    
                </button>
            </span>
        </div>
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