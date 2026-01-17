type AdminWrapperProps = {
  children?: React.ReactNode;
};

export const AdminWrapper = ({ children }: AdminWrapperProps) => {
  return (
    <div className="flex w-full h-full">
      <aside className="sticky top-0 h-[100vh] p-4 bg-[var(--background-low)]">
        {" "}
        ADMIN Wrapper
      </aside>
      {children}
    </div>
  );
};
