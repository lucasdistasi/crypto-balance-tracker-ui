import {useEffect, useState} from "react";
import DarkButton from "./DarkButton";
import LightButton from "./LightButton";

const DarkModeToggle = () => {

  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('color-theme', newDarkMode ? 'dark' : 'light');

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button className="bg-gray-200 py-2 pr-4 pl-3 rounded-full focus:outline-none md:p-0 dark:bg-gray-900" onClick={toggleDarkMode}>
      {
        darkMode ? <LightButton/> : <DarkButton/>
      }
    </button>

  );
};

export default DarkModeToggle;