type UserWrapperProps = {
  children?: React.ReactNode;
};

export const UserWrapper = ({ children }: UserWrapperProps) => {
  return (
    <div className="flex w-full h-full">
      <aside className="h-[100vh] p-4 bg-[var(--background-low)]">
        {" "}
        USER wrapper
      </aside>
      {children}
    </div>
  );
};
