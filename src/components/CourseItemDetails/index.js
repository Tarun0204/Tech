import { Component } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Header from '../Header'
import { useParams } from 'react-router-dom' // Removed withRouter import
import './index.css'

class CourseItemDetails extends Component {
  state = { isLoading: true, courseItemData: {}, hasError: false }

  componentDidMount() {
    this.getCourseItemData()
  }

  getCourseItemData = async () => {
    const { id } = this.props.params

    try {
      const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch course details')
      }

      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imgUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        courseItemData: updatedData,
        isLoading: false,
        hasError: false,
      })
    } catch (error) {
      console.error(error)
      this.setState({ isLoading: false, hasError: true })
    }
  }

  handleRetry = () => {
    this.setState({ isLoading: true, hasError: false }, this.getCourseItemData)
  }

  renderCourseItemDetails = () => {
    const { courseItemData } = this.state
    const { name, imgUrl, description } = courseItemData

    return (
      <div className="course-details">
        <img src={imgUrl} alt={name} className="course-img" />
        <div className="course-content">
          <h1 className="course-heading">{name}</h1>
          <p className="course-para">{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry-button" onClick={this.handleRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const { isLoading, hasError } = this.state

    return (
      <div>
        <Header />
        <div className="item-details">
          {isLoading && (
            <div data-testid="loader" className="loading">
              <ThreeDots color="#0284c7" height={80} width={80} />
            </div>
          )}
          {hasError
            ? this.renderFailureView()
            : !isLoading && this.renderCourseItemDetails()}
        </div>
      </div>
    )
  }
}

// No need for withRouter, directly use useParams
const CourseItemDetailsWithRouter = (props) => {
  const params = useParams()
  return <CourseItemDetails {...props} params={params} />
}

export default CourseItemDetailsWithRouter
