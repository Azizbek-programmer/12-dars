import React, { useState, useEffect } from 'react'
import "./Sidebar.scss"

const Sidebar = () => {
  const [name, setName] = useState("")
  const [lastname, setLastName] = useState("")
  const [job, setjob] = useState("")
  const [age, setAge] = useState("")
  const [data, setData] = useState(JSON.parse(localStorage.getItem("sidebar")) || [])

  useEffect(() => {
    localStorage.setItem("sidebar", JSON.stringify(data))
  }, [data])

  const handleSubmit = (event) => {
    event.preventDefault()
    let pet = {
      name,
      lastname,
      job,
      age: Number(age),
      id: Date.now()
    }
    setData((prev) => [...prev, pet])
    setName("")
    setLastName("")  
    setjob("")  
    setAge("")
  }

  const handleDelete = (id) => {
    setData((prev) => prev.filter(i => i.id !== id))
  }

  return (
    <div className="main">
      <div className="sidebar">
        <h2>Users</h2>
        <form onSubmit={handleSubmit} className='form'>
          <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='name' />
          <input required value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" placeholder='lastname' />
          <input required value={job} onChange={(e) => setjob(e.target.value)} type="text" placeholder='job' />
          <input required value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder='age' />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className='result'>
        {
          data.length ?
            data.map((item) => (
              <div className="card" key={item.id}>  
                <div className="avatar"></div>
                <h3>name: {item.name}</h3>
                <h5>lastname: {item.lastname}</h5>
                <h5>job: {item.job}</h5>
                <p>Age: {item.age}</p>
                <div className="actions">
                  <button onClick={() => handleDelete(item.id)}>delete</button>
                  <button>update</button>
                </div>
              </div>
            ))
            :
            <div className="empty">empty</div>
        }
      </div>
    </div>
  )
}

export default Sidebar
