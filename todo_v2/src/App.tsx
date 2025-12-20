import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { todoApi } from "./api/todo/todo.api";
import { useTodoMutations } from "./hooks/todo/useTodoMutations";

function App() {
  const get_data = async () => {
    const data = await todoApi.getAll()
    console.log(data)
    toast.success("Data Fetched")
  }

  const { createTodo } = useTodoMutations()

  return (
    <>
      <h1>Learning integration</h1>
      <Typography variant="h1" gutterBottom>
        Learning HTML
      </Typography>
      <h2>Learning integration</h2>
      <div>Testing notification tostr</div>
      <p>
        The RMS Titanic was a British luxury liner that famously sank on April
        15, 1912, during its maiden voyage after hitting an iceberg, resulting
        in the deaths of over 1,500 people due to insufficient lifeboats and
        design flaws, cementing it as one of history's most famous maritime
        disasters, inspiring books, films (like James Cameron's 1997 epic), and
        new maritime safety regulations. About the Ship Size & Luxury: The
        largest ship of its time, considered "unsinkable" due to its watertight
        compartments and considered a marvel of modern technology and luxury.
        Construction: Built in Belfast, Northern Ireland, by Harland & Wolff for
        the White Star Line. Capacity: Carried over 2,200 passengers and crew on
        its fateful trip from Southampton to New York City. This video shows
        what the ship looked like before its tragic journey:
      </p>
      <div className="text-black flex gap-2 h-[100px]">
        <Button
          variant="contained"
          size="small"
          color="inherit"
          onClick={() => toast.error("Something went wrong!")}
        >
          Error
        </Button>
        <Button
          variant="outlined"
          onClick={() => toast.warn("Something went wrong!")}
        >
          Warn
        </Button>
        <div>
          <Button
            variant="contained"
            onClick={() => toast.info("Something went wrong!")}
          >
            Info
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={get_data}
          >
            Get Data of TODO
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => createTodo.mutate({title:'Car wash.', completed:false})}
          >
            Create TODO
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
