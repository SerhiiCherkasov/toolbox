type SidebarProps = object;

export const AdminSidebar = (props: SidebarProps) => {
  console.log(props);

  return (
    <>
      <aside className="fixed top-0 left-0 h-[100vh] w-0 p-0 bg-[var(--background-low)] "></aside>
      ADMIN SIDEBAR
      {/* placeholder */}
      {/* <div className="relative top-0 left-0 h-[100vh] w-48 " /> */}
    </>
  );
};
