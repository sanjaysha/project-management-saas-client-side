export default function TaskCard({ task }) {
  return (
    <div
      className="
        bg-white p-4 rounded-xl border shadow-sm 
        hover:shadow-md transition cursor-grab active:cursor-grabbing
      "
    >
      <h4 className="font-medium text-gray-900">{task.title}</h4>

      {task.description && (
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex justify-between items-center mt-3">
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-lg">
          {task.priority}
        </span>
      </div>
    </div>
  );
}
