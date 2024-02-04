const CryptoInsightsCardRow = ({title, value}: {
  title: string,
  value: string | number
}) => {

  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {title}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {value}
          </p>
        </div>
      </div>
    </li>
  );
}

export default CryptoInsightsCardRow