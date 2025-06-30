import { Loader2, Users2, X } from "lucide-react";
import UserItem from "./components/UserItem";

import { useEffect, useState } from "react";
import { UserItemProps } from "./types/user";
import { Card, CardContent } from "./components/ui/card";

function App() {
  const [users, setUsers] = useState<UserItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex size-8 items-center justify-center rounded-full bg-blue-500">
          <Loader2 className="size-6 animate-spin text-white" />
        </div>
        <h2 className="text-2xl font-semibold">Carregando Usúarios</h2>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex size-8 items-center justify-center rounded-full bg-red-500">
          <X className="size-6 text-white" />
        </div>
        <h2 className="text-2xl font-semibold">Usúarios não encontrados</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6">
      <div className="flex items-center justify-center space-x-3 py-12">
        <h1 className="text-2xl font-bold">Lista de Usúarios</h1>
        <Users2 className="size-6 text-blue-500" />
      </div>
      <Card className="flex flex-col border">
        <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {users.map((user) => (
            <UserItem user={user} key={user.id} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
