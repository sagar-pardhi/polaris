"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);

  return (
    <main className="flex felx-col gap-2 p-4">
      <Button
        onClick={() => {
          createProject({ name: "New Project" });
        }}
      >
        Add New
      </Button>

      {tasks?.map(({ _id, ownerId, name }) => (
        <div key={_id} className="border rounded p-2 flex flex-col">
          <p>{name}</p>
          <p>Owner Id: {ownerId}</p>
        </div>
      ))}
    </main>
  );
}
