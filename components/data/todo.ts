const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      //   setTasks(data);
      return data;
    };

    export { fetchTasks}