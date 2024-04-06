import AddButton from "./AddButton"
import Form from "./Form"

const Header = ({ title }) => {
  return (
    <header>
        <h1>{title}</h1>
        <Form />
        {/* <AddButton /> */}
    </header>
  )
}

Header.defaultProps = {
    title: 'Enter New Car:'
}

export default Header