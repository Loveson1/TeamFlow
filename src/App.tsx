import './App.css'
import ThemeProvider from './context/theme-context'
import { ThemeContext } from './context/theme-context'
import { useContext } from 'react'

function App() {


const theme = useContext(ThemeContext)

const handleclick = () => {theme?.toggleTheme } 

  return (
    <ThemeProvider>

    <div className="card">
      <h1 className='text-3xl '>Hello Typescript</h1>
      <button className='button'>Welcome Home</button>
      <p className='w-70'>I love building with code it gives me joy building with code gives me actually hence it my desire to alway build with code cause it gives me great joy</p>
    </div>
    <button onClick={handleclick} > Switch</button>
      
    </ThemeProvider>
   
   
  )
}

export default App
