import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const SubmitsLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.submits()} className="rw-link">
            Submits
          </Link>
        </h1>
        <Link to={routes.newSubmit()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Submit
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default SubmitsLayout
