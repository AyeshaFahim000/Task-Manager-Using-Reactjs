import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  


  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    setTodo("")    
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;    
    let index = todos.findIndex(item => {
      return item.id === id;
    })   
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos)
    saveToLS()
  }



  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-pink-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="add Todo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-pink-800 mx-2 rounded-full hover:bg-pink-950 disabled:bg-pink-500 
          p-4 py-2 text-sm font-bold  text-white'>Save</button>

          </div>
          
          <div />
          <div className="flex">
          <input className='my-3 ' onChange={toggleFinished} type="checkbox" checked={showFinished} />
          <label className=' mx-3 my-3' htmlFor="show">Show Finished</label> 
          </div>
          
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto '></div>


          <h2 className='text-xl font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
            {todos.map(item => {


              return (showFinished || !item.iscompleted) && <div key={item.id} className="todo flex justify-between my-3 ">
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} id="" />
                  <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
                </div >
                <div className="buttons flex h-full">
                  <button onClick={(e)=>handleEdit(e, item.id)} className='bg-pink-800 hover:bg-pink-950 p-2 py-1 text-sm font-bold  text-white rounded-md mx-1 '><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-pink-800 hover:bg-pink-950 p-2 py-1 text-sm font-bold  text-white rounded-md mx-1 '><MdDelete /></button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
