import './index.css'

const ProjectsDetails = props => {
  const {list} = props
  const {imageUrl, name} = list

  return (
    <li className="list-item">
      <img src={imageUrl} alt={name} className="items-image" />
      <p className="project-name-text">{name}</p>
    </li>
  )
}
export default ProjectsDetails
