import React, {Component, Fragment} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {filter} from './actions/queue'

class FilterOptions extends Component{
  constructor(props){
    super(props)
    this.state = {
      slideOpen: true
    }
  }

  handleClick = (val) => {
    this.props.filter(val)
    this.setState({
      slideOpen: false
    })
    setTimeout(
      () => {
        this.setState({
          slideIn: true
        })
        setTimeout(() => { this.props.handleClick()}, 500)
      }, 0
    )
  } 

  slideIn(e){
    e.currentTarget.classList.remove('slideOpen')
    e.currentTarget.classList.add('slideClose')
  }

  render(){
    return(
      <Fragment>
        <div className={`filterButtons ${this.state.slideOpen ? 'slideOpen' : 'slideClose'}`} onClick={e => this.slideIn(e)}>
          <div className="filterButton" style={{backgroundColor: `${this.props.queue.filter === 'starred' ? '#F8B32B' : null}`}} data-name="starred" onClick={() => this.handleClick('starred')}>
            <i className="fa fa-star"></i>
          </div>
          <div className="filterButton" style={{ backgroundColor: `${this.props.queue.filter === 'music' ? '#ED6353' : null}` }} data-name="music" onClick={() => this.handleClick('music')}>
            <i className="fa fa-music"></i>
          </div>
          <div className="filterButton" style={{ backgroundColor: `${this.props.queue.filter === 'video' ? '#6BB983' : null}` }} data-name="video" onClick={() => this.handleClick('video')}>
            <i className="fa fa-tv"></i>
          </div>
          <div className="filterButton" style={{ backgroundColor: `${this.props.queue.filter === 'games' ? '#008773' : null}` }} data-name="games" onClick={() => this.handleClick('games')}>
            <i className="fa fa-gamepad"></i>
          </div>
          <div className="filterButton" style={{ backgroundColor: `${this.props.queue.filter === 'places' ? '#F2C975' : null}` }} data-name="places" onClick={() => this.handleClick('places')}>
            <i className="fa fa-map-marker"></i>
          </div>
          <div className="filterButton" style={{ backgroundColor: `${this.props.queue.filter === 'links' ? '#1C3341' : null}` }} data-name="links" onClick={() => this.handleClick('links')}>
            <i className="fa fa-link"></i>
          </div>
        </div>
        <div className="gradientScreen"></div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({queue:state.queue})
const mapDispatchToProps = dispatch => bindActionCreators({filter}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FilterOptions)