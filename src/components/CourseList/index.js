import { Component } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CourseItem'
import './index.css'

class CourseList extends Component {
  state = { isLoading: true, coursesData: [], hasError: false }

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/te/courses')
      if (!response.ok) {
        throw new Error('Failed to fetch courses')
      }
      const data = await response.json()
      const updatedData = data.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        coursesData: updatedData,
        isLoading: false,
        hasError: false,
      })
    } catch (error) {
      console.error(error)
      this.setState({ isLoading: false, hasError: true })
    }
  }

  handleRetry = () => {
    this.setState({ isLoading: true, hasError: false }, this.getCoursesData)
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-button" onClick={this.handleRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const { coursesData, isLoading, hasError } = this.state

    return (
      <div className="home-section">
        <Header />
        {isLoading && (
          <div className="loading" data-testid="loader">
            <ThreeDots color="#0284c7" height={80} width={80} />
          </div>
        )}

        {hasError && this.renderFailureView()}

        {!isLoading && !hasError && (
          <div className="courses-section">
            <h1 className="main-heading">Courses</h1>
            <ul className="courses-items-list">
              {coursesData.map(item => (
                <CourseItem courseData={item} key={item.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default CourseList
