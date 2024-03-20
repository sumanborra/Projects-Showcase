import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectsDetails from '../ProjectsDetails'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const loaderStatus = {
  initial: 'INITIAL',
  isProgress: 'IS_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {id: categoriesList[0].id, list: [], isLoading: loaderStatus.initial}

  componentDidMount() {
    this.getProjects()
  }

  getProjects = async () => {
    this.setState({isLoading: loaderStatus.isProgress})
    const {id} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${id}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const update = data.projects.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
      }))
      this.setState({list: update, isLoading: loaderStatus.success})
    } else {
      this.setState({isLoading: loaderStatus.failure})
    }
  }

  changeOption = event => {
    this.setState({id: event.target.value}, this.getProjects)
  }

  clickedButton = () =>{
    this.getProjects();
  }

  successView = () => {
    const {list} = this.state
    return (
      <ul className="list-container">
        {list.map(each => (
          <ProjectsDetails list={each} key={each.id} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="buttn" onClick={this.clickedButton}>
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPage = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case loaderStatus.isProgress:
        return this.loadingView()
      case loaderStatus.success:
        return this.successView()
      case loaderStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {id} = this.state

    return (
      <div className="home-background-container">
        <select
          className="select-element"
          value={id}
          onChange={this.changeOption}
        >
          {categoriesList.map(each => (
            <option value={each.id} key={each.id}>
              {each.displayText}
            </option>
          ))}
        </select>
        {this.renderPage()}
      </div>
    )
  }
}
export default Home
