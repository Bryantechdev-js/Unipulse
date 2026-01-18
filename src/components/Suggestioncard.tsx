import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function Suggestioncard() {
  return (
    <div className="w-full bg-white dark:bg-card">
      {/* Filters */}
      <div
        className="
          flex flex-col
          sm:flex-row
          sm:justify-between
          gap-3
          mb-4 dark:px-3 pt-3
        "
      >
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm dark:text-muted-foreground">Filter by:</p>

          <Select>
            <SelectTrigger className="w-36 ">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="infra">Infrastructure</SelectItem>
                <SelectItem value="edu">Education</SelectItem>
                <SelectItem value="env">Environment</SelectItem>
                <SelectItem value="social">Social life</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="progress">In progress</SelectItem>
                <SelectItem value="done">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm">Sort:</p>
          <Select>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Recent" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="old">Old</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3 dark:p-3  overflow-y-auto lg:max-h-[calc(100vh-140px)]">
        {[1,2,3,4,5].map((_, i) => (
          <div
            key={i}
            className="card dark:shadow-foreground shadow w-full p-3 space-y-2 rounded-lg"
          >
            <h3 className="text-lg dark:text-muted-foreground sm:text-xl font-semibold">
              Better Light in parkings
            </h3>

            <span className="inline-block bg-gray-100 dark:bg-card py-1 px-2 rounded text-sm">
              infrastructure
            </span>

            <p className="text-sm text-gray-700 dark:text-muted-foreground">
              hey everyone can we improve the toilet sanitations
            </p>

            <span className="inline-block px-2 py-1 text-xs rounded shadow border">
              in progress
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
