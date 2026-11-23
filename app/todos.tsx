import { createClient } from "@/utils/supabase/server";

export async function Todos() {
  const supabase = await createClient();
  if (!supabase) return <p>Supabase is not configured.</p>;

  const { data, error } = await supabase.from("todos").select("id, name");

  if (error?.code === "PGRST205") {
    return <p>The todos table is unavailable.</p>;
  }
  if (error) return <p>Could not load todos.</p>;
  if (!data?.length) return <p>No todos yet.</p>;

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  );
}
