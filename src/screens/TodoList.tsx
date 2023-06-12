import React, { FC, useEffect, useState } from 'react'
import { ReactComponent as AddIcon } from '../icons/add-outline.svg'
import { TodoRow, NewTodoOverlay, useTodo, filterTodos, formatTodo } from '../components/TodoList'
import { Header, IconButton } from '../components/common'
import { useSettings } from '../components/Settings'

import type { Todo, } from '../API'

const TodoList: FC = () => {

    useEffect(() => {
        document.title = 'Todo List'
    }, [])

    const { todos: initTodos, addNewTodo } = useTodo()
    const { settings: { todoSettings } } = useSettings()
    const [todos, setTodos] = useState(filterTodos(initTodos, todoSettings).map(formatTodo))

    useEffect(() => {
        setTodos(filterTodos(initTodos, todoSettings).map(formatTodo))
    }, [initTodos, setTodos, todoSettings])

    const [expanded, setExpanded] = useState<Todo['id']>('');
    const todosLeft = todos.filter(t => !t.checked).length
    const [newOverlay, setNewOverlay] = useState(false)

    return (
        <div className="container">
            {newOverlay &&
                <NewTodoOverlay
                    submit={addNewTodo}
                    done={() => setNewOverlay(false)}
                />
            }
            <Header
                title="Todo List"
                subtitle={todos.length ?
                    todosLeft ?
                        `${todosLeft} todo${todosLeft > 1 ? "s" : ''} left` :
                        'all done' :
                    'no current todos'
                }
                actions={
                    <IconButton
                        onClick={() => setNewOverlay(true)}
                        icon={<AddIcon />}
                        className="header-actions-icon"
                    />
                }
            />
            <div className="list-container">
                {todos.map(todo => (
                    <TodoRow
                        key={todo.id}
                        todo={todo}
                        expanded={todo.id === expanded}
                        onClick={(id) => setExpanded(expanded === todo.id ? -1 : id)}
                    />)
                )}
            </div>
        </div>
    )
}

export default TodoList