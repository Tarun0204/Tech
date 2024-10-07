import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {courseData} = props
  const {id, name, logoUrl} = courseData

  return (
    <Link to={`/courses/${id}`} className="link-element">
      <li className="course-item">
        <img className="item-image" src={logoUrl} alt={name} />
        <p className="item-title">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
