import styles from './App.module.css';

import rocketLogo from './assets/rocket.png';
import { CheckCircle, Circle, Clipboard, PlusCircle, Trash } from 'phosphor-react'; 
import { useEffect, useState } from 'react';

type TodosProps = {
  id: number;
  done: boolean;
  description: string;
}

function App() {
  const [todos, setTodos] = useState<TodosProps[] | []>([{id: 1, done: true, description: 'Beijar a ana'}, {id: 2, done: false, description: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'}])
  const [count, setCount] = useState(0)

  function handleDone(id: number) {
    const [todo] = todos.filter(todo => todo.id === id)
    todo.done = !todo.done
    setTodos([...todos])
  }

  function handleTrash(id: number) {
    const [todo] = todos.filter(todo => todo.id !== id)
    setTodos([todo])
  }

  useEffect(() => {
    setCount(() => {
      return 0
    })
    todos.map(todo => todo.done === true && setCount(state => { return state + 1}))
  }, [todos])

  return (
    <main>
      <header className={styles.header}>
        <img src={rocketLogo} alt="" />
        <h1 className={styles.title}>to<span>do</span></h1>
      </header>
      <div className={styles.newTask}>
        <input type="text" placeholder='Adicione uma nova tarefa' />
        <button>Criar <PlusCircle size={16}/></button>
      </div>
      <main className={styles.body}>
        <div className={styles.info}>
          <div className={styles.created}>
            <h3>Tarefas criadas</h3>
            <div className={styles.counter}>0</div>
          </div>
          <div className={styles.done}>
            <h3>Concluídas</h3> 
            <div className={styles.counter}>{count}</div>
          </div>     
        </div>
        <div>
          {
            todos.length !== 0 ? (   
              todos.map(todo => 
                todo.done === true ? (
                  <div className={styles.taskDone} key={todo.id}>
                    <button onClick={() => handleDone(todo.id)} className={styles.checked}>
                      <CheckCircle weight='fill' size={24} /> 
                    </button>
                    <p>{todo.description}</p>
                    <button onClick={() => handleTrash(todo.id)} className={styles.trash}> 
                      <Trash size={24} />
                    </button>
                  </div>
                ) : (
                  <div className={styles.task} key={todo.id}>
                    <button onClick={() => handleDone(todo.id)} className={styles.check}>
                      <Circle size={24} />
                    </button>
                    <p>{todo.description}</p>
                    <button onClick={() => handleTrash(todo.id)}  className={styles.trash}> 
                      <Trash size={24} />
                    </button>
                  </div>
                )
              )
            ) : (
              <div className={styles.empty}>
                <Clipboard size={56} />
                <h3>Você ainda não tem tarefas cadastradas</h3>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            )
          }
        </div>
      </main>
    </main>

  )
}

export default App
