import {
  submits,
  submit,
  createSubmit,
  updateSubmit,
  deleteSubmit,
} from './submits'

describe('submits', () => {
  scenario('returns all submits', async (scenario) => {
    const result = await submits()

    expect(result.length).toEqual(Object.keys(scenario.submit).length)
  })

  scenario('returns a single submit', async (scenario) => {
    const result = await submit({ id: scenario.submit.one.id })

    expect(result).toEqual(scenario.submit.one)
  })

  scenario('creates a submit', async () => {
    const result = await createSubmit({
      input: { title: 'String', body: 'String' },
    })

    expect(result.title).toEqual('String')
    expect(result.body).toEqual('String')
  })

  scenario('updates a submit', async (scenario) => {
    const original = await submit({ id: scenario.submit.one.id })
    const result = await updateSubmit({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a submit', async (scenario) => {
    const original = await deleteSubmit({ id: scenario.submit.one.id })
    const result = await submit({ id: original.id })

    expect(result).toEqual(null)
  })
})
