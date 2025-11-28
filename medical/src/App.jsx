import { useEffect, useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)
  const [appInfo, setAppInfo] = useState({ version: 'Loading...', platform: 'Loading...' })

  useEffect(() => {
    // Check if we're running in Electron
    if (window.electronAPI) {
      Promise.all([
        window.electronAPI.getAppVersion(),
        window.electronAPI.getPlatform()
      ]).then(([version, platform]) => {
        setAppInfo({ version, platform })
      })

      // Listen for menu events
      window.electronAPI.onMenuNewFile(() => {
        console.log('New file menu clicked')
        // Handle new file logic here
      })

      window.electronAPI.onMenuOpenFile(() => {
        console.log('Open file menu clicked')
        // Handle open file logic here
      })

      window.electronAPI.onMenuAbout(() => {
        alert(`Medical App\nVersion: ${appInfo.version}\nPlatform: ${appInfo.platform}`)
      })
    }

    return () => {
      // Cleanup listeners
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('menu-new-file')
        window.electronAPI.removeAllListeners('menu-open-file')
        window.electronAPI.removeAllListeners('menu-about')
      }
    }
  }, [appInfo.version, appInfo.platform])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Medical Desktop App</h1>
      
      {window.electronAPI && (
        <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
          <h3>🖥️ Electron App Info</h3>
          <p><strong>Version:</strong> {appInfo.version}</p>
          <p><strong>Platform:</strong> {appInfo.platform}</p>
          <p><strong>Running in:</strong> Desktop App</p>
        </div>
      )}
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <p>
          Try the <strong>File</strong> menu to see Electron integration!
        </p>
      </div>
      <p className="read-the-docs">
        This is a React app running inside Electron for desktop functionality
      </p>
    </>
  )
}

export default App
