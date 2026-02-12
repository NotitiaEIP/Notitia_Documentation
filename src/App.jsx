import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import DocsLayout from './pages/DocsLayout'
import DocPage from './pages/DocPage'
import { docsConfig } from './docs/config'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<DocPage slug={docsConfig.defaultDoc} />} />
          <Route path=":slug" element={<DocPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
