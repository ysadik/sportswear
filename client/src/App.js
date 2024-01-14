import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Pages from './pages/Pages'
import Footer from './components/Footer'
import { useGlobalContext } from './Context'
import Loading from './components/Loading'

const App = () => {
  const state = useGlobalContext()
  const [isLoading] = state.userAPI.isLoading

  if (isLoading) {
    return <Loading />
  }
  return (
    <Router>
      <Header />
      <Pages />
      <Footer />
    </Router>
  )
}
export default App
