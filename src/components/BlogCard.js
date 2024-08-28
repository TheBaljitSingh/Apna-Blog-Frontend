import { Link } from 'react-router-dom';

export function BlogCard({ blog, title, description }) {
  return (
    <div className="bg-gray-200 rounded-xl p-4 hover:cursor-pointer">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p>{description}</p>
      <p className='text-blue-400 hover:underline'>Read more</p>    
    </div>

  );
}
