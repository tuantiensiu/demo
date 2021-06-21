import { Link, routes } from '@redwoodjs/router'

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.js</code>
      </p>
      <p>
        Hello Nguyen Tuan Tien <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
        <Link to={routes.about()}>Return About page</Link>
      </p>
    </>
  )
}

export default HomePage
