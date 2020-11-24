import React, {useState} from 'react'
import { updateFilter, getProjects } from '../../store/actions/projectActions'
import { connect } from 'react-redux'

function Search() {
    const [searchTxt, setSearchTxt] = useState('')

    const search = (e) => {
        e.preventDefault();
        getProjects(searchTxt);
    }
    return (
        <div>
            <div
                className='search-field'
            >    
                <input 
                    type="text" 
                    id="searchTxt" 
                    onChange={e=> setSearchTxt(e.target.value)}
                    placeholder="Project Name..."
                    style={{padding:'5px', width:'60%', minWidth:'150px', marginLeft:'5px'}}
                />
                <span style={{margin:'-3px 0 0 10px'}}>
                    <button id='search'>
                        <i onClick={e=>search(e)} class="right fas fa-search"> SEARCH</i>
                    </button>
                </span>
            </div>
            
            
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
      greenSelected: state.project.greenSelected,
      yellowSelected: state.project.yellowSelected,
      redSelected: state.project.redSelected,
      startDate: state.project.startDate,
      endDate: state.project.endDate,
      showAll: state.project.showAll
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return{
      updateFilter: (label,value) => dispatch(updateFilter(label,value)),
      getProjects: (filters) => dispatch(getProjects(filters))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Search);