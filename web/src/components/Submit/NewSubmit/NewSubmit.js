import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import SubmitForm from 'src/components/Submit/SubmitForm'

const CREATE_SUBMIT_MUTATION = gql`
  mutation CreateSubmitMutation($input: CreateSubmitInput!) {
    createSubmit(input: $input) {
      id
    }
  }
`

const NewSubmit = () => {
  const [createSubmit, { loading, error }] = useMutation(
    CREATE_SUBMIT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Submit created')
        navigate(routes.submits())
      },
    }
  )

  const onSave = (input) => {
    createSubmit({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Submit</h2>
      </header>
      <div className="rw-segment-main">
        <SubmitForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSubmit
