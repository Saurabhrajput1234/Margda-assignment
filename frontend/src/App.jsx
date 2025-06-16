import { useState, useEffect } from 'react'
import './App.css'


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [accounts, setAccounts] = useState([])
  const [formData, setFormData] = useState({
    account_id: '',
    introducer_id: ''
  })
  const [message, setMessage] = useState({ text: '', type: '' })
  const [isLoading, setIsLoading] = useState(false)

  // Fetch all accounts
  const fetchAccounts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/accounts`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed fetch accounts')
      }
      const data = await response.json()
      if (data.success) {
        setAccounts(data.accounts)
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' })
    }
  }


  useEffect(() => {
    fetchAccounts()
  }, [])

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ text: '', type: '' })

    try {
      const response = await fetch(`${API_URL}/api/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      if (data.success) {
        setMessage({ text: data.message, type: 'success' })
        setFormData({ account_id: '', introducer_id: '' })
        fetchAccounts()
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }))
  }

  return (
    <div className="app">
      <header>
        <h1>Bank Promotion</h1>
      </header>
      <main>
        <div className="form-container">
          <h2>Create New Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="account_id">
                Account ID: <span className="required">*</span>
              </label>
              <input
                type="text"
                id="account_id"
                name="account_id"
                value={formData.account_id}
                onChange={handleChange}
                required
                placeholder="Enter Account ID"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="introducer_id">
                Introducer ID: <span className="required">*</span>
              </label>
              <input
                type="text"
                id="introducer_id"
                name="introducer_id"
                value={formData.introducer_id}
                onChange={handleChange}
                required
                placeholder="Enter Introducer ID"
                disabled={isLoading}
              />
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="accounts-list">
          <h2>Accounts List</h2>
          {accounts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Account ID</th>
                  <th>Introducer ID</th>
                  <th>Beneficiary ID</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.account_id}>
                    <td>{account.account_id}</td>
                    <td>{account.introducer_id}</td>
                    <td>{account.beneficiary_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No accounts found</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
