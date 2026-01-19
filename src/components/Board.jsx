import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { getTasksByProject, updateTaskStatus } from "../api/task.api";
import { TASK_COLUMNS } from "../constants/taskStatus";
import KanbanColumn from "../components/KanbanColumn";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function Board() {
  const [params] = useSearchParams();
  const workspaceId = params.get("workspaceId");
  const projectId = params.get("projectId");

  const [tasks, setTasks] = useState([]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    loadTasks();
  }, [workspaceId, projectId]);

  const loadTasks = async () => {
    const res = await getTasksByProject(workspaceId, projectId);
    setTasks(res.data.data);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id; // Column id

    const oldTask = tasks.find((t) => t._id === taskId);
    if (!oldTask) return;

    const oldStatus = oldTask.status;

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t)),
    );

    try {
      await updateTaskStatus({
        taskId,
        workspaceId,
        status: newStatus,
        position: 1, // backend handles ordering
      });
    } catch (error) {
      // Revert if fails
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: oldStatus } : t)),
      );
    }
  };

  const tasksByColumn = (status) => tasks.filter((t) => t.status === status);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-6">Kanban Board</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-6">
          {TASK_COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              label={col.label}
              tasks={tasksByColumn(col.id)}
            />
          ))}
        </div>
      </DndContext>
    </DashboardLayout>
  );
}
