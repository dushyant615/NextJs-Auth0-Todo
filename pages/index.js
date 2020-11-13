import Head from 'next/head'
import Navbar from '../components/Navbar'
import Todo from '../components/Todo';
import { table, minifyRecords} from './api/utils/airtable';
import {TodosContext} from '../contexts/TodosContext';
import {useContext, useEffect} from 'react';

export default function Home({initialTodos}) {
  const {todos, setTodos} = useContext(TodosContext);
  useEffect(()=>{
    setTodos(initialTodos)
  }, [])
  return (
    <div>
      <Head>
        <title>Authenticated TODO App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main>
        <h1>ToDo</h1>
        <ul>
          {todos &&
            todos.map((todo) => (
              <Todo key={todo.id} todo={todo}/>
            ))
          }
        </ul>
      </main>
        
    </div>
  )
}

export async function getServerSideProps(context){
  try{
    const todos = await table.select({}).firstPage();
    return{
      props: {
        initialTodos: minifyRecords(todos)
      }
    }
  }catch(err){
    console.log(err);
    return {
      props: {
        err: "Something went wrong"
      }
    }
  }
}