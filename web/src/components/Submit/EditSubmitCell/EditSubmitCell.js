import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import SubmitForm from 'src/components/Submit/SubmitForm'

export const QUERY = gql`
  query FindSubmitById($id: Int!) {
    submit: submit(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`
const UPDATE_SUBMIT_MUTATION = gql`
  mutation UpdateSubmitMutation($id: Int!, $input: UpdateSubmitInput!) {
    updateSubmit(id: $id, input: $input) {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ submit }) => {
  const [updateSubmit, { loading, error }] = useMutation(
    UPDATE_SUBMIT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Submit updated')
        navigate(routes.submits())
      },
    }
  )

  const onSave = (input, id) => {
    updateSubmit({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Submit {submit.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SubmitForm
          submit={submit}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
