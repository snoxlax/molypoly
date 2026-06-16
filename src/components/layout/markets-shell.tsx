type MarketsShellProps = {
  sidebar: React.ReactNode;
  main: React.ReactNode;
};

export function MarketsShell({ sidebar, main }: MarketsShellProps) {
  return (
    <div className="site-container flex flex-col pt-5 lg:flex-row lg:justify-center lg:gap-8 lg:px-5">
      {sidebar}
      <div className="min-h-[calc(100vh-20rem)] w-full min-w-0 flex-1">
        {main}
      </div>
    </div>
  );
}
