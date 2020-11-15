import Head from 'next/head'
import Navbar from '../components/Navbar'
import Todo from '../components/Todo';
import { table, minifyRecords} from './api/utils/airtable';
import {TodosContext} from '../contexts/TodosContext';
import {useContext, useEffect} from 'react';
import auth0 from './api/utils/auth0';
export default function Home({ initialTodos, user}) {
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
      <Navbar user={user}/>
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
  const session = await auth0.getSession(context.req);
  try{
    const todos = await table.select({}).firstPage();
    return{
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null,
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