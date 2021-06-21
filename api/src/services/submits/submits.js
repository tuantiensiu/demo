import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const submits = () => {
  return db.submit.findMany()
}

export const submit = ({ id }) => {
  return db.submit.findUnique({
    where: { id },
  })
}

export const createSubmit = ({ input }) => {
  return db.submit.create({
    data: input,
  })
}

export const updateSubmit = ({ id, input }) => {
  return db.submit.update({
    data: input,
    where: { id },
  })
}

export const deleteSubmit = ({ id }) => {
  return db.submit.delete({
    where: { id },
  })
}
