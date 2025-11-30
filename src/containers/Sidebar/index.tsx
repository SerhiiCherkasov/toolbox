type SidebarProps = object;

export const Sidebar = (props: SidebarProps) => {
  console.log(props);

  return (
    <>
      <aside className="fixed top-0 left-0 h-[100vh] w-0 p-0 bg-[var(--background-low)] "></aside>
      {/* placeholder */}
      {/* <div className="relative top-0 left-0 h-[100vh] w-48 " /> */}
    </>
  );
};
