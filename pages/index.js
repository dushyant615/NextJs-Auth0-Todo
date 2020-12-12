import Head from 'next/head'
import Navbar from '../components/Navbar'
import Todo from '../components/Todo';
import { table, minifyRecords} from './api/utils/airtable';
import {TodosContext} from '../contexts/TodosContext';
import {useContext, useEffect} from 'react';
import auth0 from './api/utils/auth0';
import TodoForm from '../components/TodoForm';
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
        {user && (
          <>
            <h1 className="text-2xl text-center mb-4">My Todo</h1>
            <TodoForm/>
            <ul>
              {todos &&
                todos.map((todo) => (
                  <Todo key={todo.id} todo={todo}/>
                ))
              }
            </ul>
          </>
        )}
        {!user && <p>You should log in to save TODOs</p>}
      </main>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await auth0.getSession(context.req);
  let todos = [];
  try{
    if(session?.user){
      todos = await table.select({
        filterByFormula: `userId = '${session.user.sub}'`
      }).firstPage();
    }
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