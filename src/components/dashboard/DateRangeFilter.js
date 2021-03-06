import React, {useState, useEffect} from 'react'
import DatePickerTool from './DatePicker'
import { connect } from 'react-redux'
import { updateFilter,  getProjects, getProjectByName } from '../../store/actions/projectActions'

var moment = require('moment');

const DateRange = ({showAll,showProjects,showSearch,searchText, projects, project, getProjects,greenSelected, yellowSelected, redSelected, startDate, endDate, updateFilter, handleCheckboxChange}) => {
    useEffect(() => {
        if(showProjects && !showSearch){
            const filter = {
                date: !startDate || !endDate ? null : 'ok',
                start: moment(startDate).format("DD/MM/YYYY"),
                end: moment(endDate).format("DD/MM/YYYY"),
                status: 'ok',
                Green:greenSelected,
                Yellow:yellowSelected,
                Red:redSelected
            }
            getProjects(filter);
        }else if(showSearch){
            getProjectByName(searchText,false);
        }
     }, [])
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
        updateFilter('showProjects', false);
        updateFilter('showSearch', false);
        setQuickSelect("");
        if(startDate !== null){
            setStartDate(null);
        }
        if(endDate !== null){
            setEndDate(null);
        }
    }
    
    const search = (e) => {
        e.preventDefault();
        const filter = {
            date: !startDate || !endDate ? null : 'ok',
            start: moment(startDate).format("DD/MM/YYYY"),
            end: moment(endDate).format("DD/MM/YYYY"),
            status: 'ok',
            Green:greenSelected,
            Yellow:yellowSelected,
            Red:redSelected
        }
        getProjects(filter);
    }

  return (
    <div>
        <div id='date-grid'>
            <span>
                <label className="date-filter datePicker">Start</label>
                <DatePickerTool date={startDate ? moment(startDate).toDate() : null} setDate={setStartDate} className='datePicker'/>
            </span>
            <span>
                <label className="date-filter datePicker">End</label>
                <DatePickerTool date={endDate ? moment(endDate).toDate() : null} setDate={setEndDate} className='datePicker'/>
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
            <span >
                <button id='filter'>
                    <i  onClick={e=>search(e)} className="fas fa-filter"> FILTER</i>    
                </button>
                {/* {(projects && projects.length || project && project.length) > 0 && */}
                {(showProjects || showSearch) &&
                    <button id='clear'>
                        <i onClick={e=>clear(e)} className="fas fa-times"> CLEAR</i>    
                    </button>
                }
            </span>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        startDate: state.project.startDate,
        endDate: state.project.endDate,
        showAll: state.project.showAll,
        showProjects: state.project.showProjects,
        showSearch: state.project.showSearch,
        searchText: state.project.search,
        greenSelected: state.project.greenSelected,
        yellowSelected: state.project.yellowSelected,
        redSelected: state.project.redSelected
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateFilter: (label,value) => dispatch(updateFilter(label,value)),
        getProjects: (filters) => dispatch(getProjects(filters)),
        getProjectByName: (name, showSearch) => dispatch(getProjectByName(name, showSearch))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(DateRange);