import "./App.css"
import Plasma from "./components/Plasma"

function App() {
  return (
    <div>
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Plasma
          color="#C4B5FD"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
          mouseInteractive={false}
        />
      </div>
    </div>
  )
}

export default App
