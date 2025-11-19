import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

export default function BackLink({ to = "/", label = "Retour" }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
    >
      <FiChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      <span className="relative">
        {label}
        <span
          className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-gray-900 transition-all duration-300 group-hover:w-full"
        ></span>
      </span>
    </Link>
  );
}
