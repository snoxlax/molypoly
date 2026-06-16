type MarketsShellProps = {
  sidebar: React.ReactNode;
  main: React.ReactNode;
};

export function MarketsShell({ sidebar, main }: MarketsShellProps) {
  return (
    <div className="site-container flex min-h-0 flex-1 flex-col overflow-hidden pt-5 lg:flex-row lg:gap-8 lg:px-5">
      {sidebar}
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden">
        {main}
      </div>
    </div>
  );
}
