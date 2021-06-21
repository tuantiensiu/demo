import Submit from 'src/components/Submit/Submit'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Submit not found</div>

export const Success = ({ submit }) => {
  return <Submit submit={submit} />
}
