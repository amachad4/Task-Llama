interface FormProps {
  options: { label: string; value: number }[];
}

export default function Form({ options }: FormProps) {
  return (
    <div className="bg-red-500">
      <form method="post" action="/createTodoItem">
        <label htmlFor="title">Title:</label>
        <input name="title" type="text" id="title" />
        <label htmlFor="deadline">Deadline:</label>
        <input name="deadline" type="date" id="deadline" />
        <label>Choose a category:</label>
        <select name="category_lkp_id" id="category">
          {options.map((option) => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </select>
        <input hidden readOnly value="1" name="status_lkp_id" />
        <input type="submit" />
      </form>
    </div>
  );
}
