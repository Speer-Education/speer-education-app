import { UserMenu } from './UserMenu/UserMenu'

export const AppNavbar = () => {
  return (
    <div className="flex flex-row w-full justify-between items-center p-4 h-16">
      <h1 className="text-gray-900 dark:text-blue-100 text-3xl font-bold">
        Main App
      </h1>
      <UserMenu />
    </div>
  );
};
