import React, { Component } from 'react'


class SearchBar extends Component {
  render(){
    return(
        <div className='form-inline'>
          <form onSubmit={this.props.onSubmit}>
            <h4>Search for a Country</h4><br/>
            <input className="form-control" type='text' name="country" placeholder="e.g. South Korea or Gibraltar"/>
            <button className="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
    )
  }
}

export default SearchBar;
