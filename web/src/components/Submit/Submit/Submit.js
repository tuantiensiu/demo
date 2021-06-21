import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_SUBMIT_MUTATION = gql`
  mutation DeleteSubmitMutation($id: Int!) {
    deleteSubmit(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Submit = ({ submit }) => {
  const [deleteSubmit] = useMutation(DELETE_SUBMIT_MUTATION, {
    onCompleted: () => {
      toast.success('Submit deleted')
      navigate(routes.submits())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete submit ' + id + '?')) {
      deleteSubmit({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Submit {submit.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{submit.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{submit.title}</td>
            </tr>
            <tr>
              <th>Body</th>
              <td>{submit.body}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(submit.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSubmit({ id: submit.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(submit.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Submit
