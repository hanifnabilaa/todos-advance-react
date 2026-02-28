import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { CirclePlus } from "lucide-react";
import {
  addTodo,
  fetchTodos,
  toggleTodo,
  removeTodo,
} from "./features/todos/todoSlice";
import { Header } from "./components/Header/Header";
import { Button } from "./components/Button/Button";
import { Input } from "./components/Input/Input";
import { TodoItem } from "./components/TodoItem/TodoItem";

const EmptyState = lazy(() =>
  import("./components/EmptyState").then((module) => ({
    default: module.EmptyState,
  })),
);

const ITEMS_PER_PAGE = 5;

function App() {
  const dispatch = useDispatch();
  const { items: todos, loading } = useSelector((state) => state.todos);

  const [newTodo, setNewTodo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTodos = useMemo(
    () => todos.slice(startIndex, endIndex),
    [todos, startIndex, endIndex],
  );
  const totalPages = useMemo(
    () => Math.ceil(todos.length / ITEMS_PER_PAGE),
    [todos.length],
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!newTodo.trim()) return;
      dispatch(addTodo(newTodo));
      setNewTodo("");
    },
    [dispatch, newTodo],
  );

  const handleToggle = useCallback(
    (id) => {
      dispatch(toggleTodo(id));
    },
    [dispatch],
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch(removeTodo(id));
    },
    [dispatch],
  );

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  const toggleDarkMode = useCallback(() => setIsDarkMode((prev) => !prev), []);
  const handleInputChange = useCallback((e) => setNewTodo(e.target.value), []);
  const handlePrevPage = useCallback(
    () => setCurrentPage((prev) => prev - 1),
    [],
  );
  const handleNextPage = useCallback(
    () => setCurrentPage((prev) => prev + 1),
    [],
  );

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#F3F4F6] dark:bg-[#1A1A1A] flex flex-col items-center pb-20 font-sans transition-colors duration-200">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <main className="w-full max-w-[736px] px-4 -mt-7 shrink-0 relative z-10">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Tambah tugas baru"
              value={newTodo}
              onChange={handleInputChange}
            />
            <Button type="submit">
              Tambah
              <CirclePlus size={16} />
            </Button>
          </form>

          <header className="flex items-center justify-between mt-16 mb-4 border-b border-gray-300 dark:border-[#333333] pb-4 transition-colors">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#4EA8DE]">
                Belum Selesai
              </h2>
              <span className="bg-[#4EA8DE] dark:bg-[#333333] text-white dark:text-[#D9D9D9] text-xs font-bold px-2 py-0.5 rounded-full transition-colors">
                {todos.length - completedCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#5E60CE]">Selesai</h2>
              <span className="bg-[#5E60CE] dark:bg-[#333333] text-white dark:text-[#D9D9D9] text-xs font-bold px-2 py-0.5 rounded-full leading-none flex items-center min-h-[20px] transition-colors">
                {todos.length > 0
                  ? `${completedCount} dari ${todos.length}`
                  : "0"}
              </span>
            </div>
          </header>

          <div>
            {todos.length === 0 && !loading ? (
              <Suspense fallback={null}>
                <EmptyState />
              </Suspense>
            ) : (
              currentTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>

          {loading && (
            <p className="text-center text-gray-500 mt-4 text-sm font-medium">
              Loading...
            </p>
          )}

          {todos.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 text-sm text-gray-500 dark:text-gray-400">
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Halaman {currentPage} dari {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="bg-gray-200 dark:bg-[#262626] hover:bg-gray-300 dark:hover:bg-[#333333] text-gray-700 dark:text-[#F2F2F2] px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="bg-gray-200 dark:bg-[#262626] hover:bg-gray-300 dark:hover:bg-[#333333] text-gray-700 dark:text-[#F2F2F2] px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
