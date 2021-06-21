import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Submit/SubmitsCell'

const DELETE_SUBMIT_MUTATION = gql`
  mutation DeleteSubmitMutation($id: Int!) {
    deleteSubmit(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const SubmitsList = ({ submits }) => {
  const [deleteSubmit] = useMutation(DELETE_SUBMIT_MUTATION, {
    onCompleted: () => {
      toast.success('Submit deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete submit ' + id + '?')) {
      deleteSubmit({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {submits.map((submit) => (
            <tr key={submit.id}>
              <td>{truncate(submit.id)}</td>
              <td>{truncate(submit.title)}</td>
              <td>{truncate(submit.body)}</td>
              <td>{timeTag(submit.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.submit({ id: submit.id })}
                    title={'Show submit ' + submit.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSubmit({ id: submit.id })}
                    title={'Edit submit ' + submit.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete submit ' + submit.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(submit.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubmitsList
