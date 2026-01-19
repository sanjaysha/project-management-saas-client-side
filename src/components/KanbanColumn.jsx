import { useDroppable, SortableContext } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { useMemo } from "react";

export default function KanbanColumn({ id, label, tasks, children }) {
  const { setNodeRef } = useDroppable({ id });

  const taskIds = useMemo(() => tasks.map((t) => t._id), [tasks]);

  return (
    <div className="flex flex-col w-80 bg-gray-50 rounded-xl p-4 border">
      <h3 className="font-semibold text-gray-800 mb-4">{label}</h3>

      <SortableContext items={taskIds}>
        <div ref={setNodeRef} className="space-y-3 min-h-[200px]">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </SortableContext>

      {children}
    </div>
  );
}
