import { Link, routes } from '@redwoodjs/router'

import Submits from 'src/components/Submit/Submits'

export const QUERY = gql`
  query SUBMITS {
    submits {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No submits yet. '}
      <Link to={routes.newSubmit()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ submits }) => {
  return <Submits submits={submits} />
}
