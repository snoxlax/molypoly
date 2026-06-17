type MarketsShellProps = {
  sidebar?: React.ReactNode;
  main: React.ReactNode;
};

export function MarketsShell({ sidebar, main }: MarketsShellProps) {
  return (
    <div className="site-container flex min-h-0 flex-1 flex-col pt-5 lg:flex-row lg:gap-8 lg:px-5">
      {sidebar}
      <div className="overflow-auto flex-1 min-h-0 no-scrollbar">{main}</div>
    </div>
  );
}
