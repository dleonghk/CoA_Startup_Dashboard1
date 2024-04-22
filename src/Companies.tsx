import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

interface Company {
  name: string;
  industries: string;
  valuation: number;
  growthStage: string;
  totalFunding: number;
  lastFundingRound: string;
  launchYear: number;
}

const companies = [
  {
    name: "QuantumScape",
    industries: "Energy, Battery Technology",
    valuation: 6800000000,
    growthStage: "Growth",
    totalFunding: 1500000000,
    lastFundingRound: "Series D",
    launchYear: 2010,
  },
  {
    name: "Lilium",
    industries: "Aerospace, Electric Vehicles",
    valuation: 3300000000,
    growthStage: "Early",
    totalFunding: 500000000,
    lastFundingRound: "Series B",
    launchYear: 2015,
  },
  {
    name: "Ribbit Leap",
    industries: "Fintech, Investments",
    valuation: 2000000000,
    growthStage: "Growth",
    totalFunding: 600000000,
    lastFundingRound: "Series C",
    launchYear: 2012,
  },
  {
    name: "Helion Energy",
    industries: "Energy, Fusion Power",
    valuation: 4000000000,
    growthStage: "Expansion",
    totalFunding: 1200000000,
    lastFundingRound: "Series E",
    launchYear: 2013,
  },
  {
    name: "Zapier",
    industries: "SaaS, Automation",
    valuation: 5000000000,
    growthStage: "Mature",
    totalFunding: 290000000,
    lastFundingRound: "Series A",
    launchYear: 2011,
  },
  {
    name: "Bolt",
    industries: "E-commerce, Technology",
    valuation: 8000000000,
    growthStage: "Expansion",
    totalFunding: 2000000000,
    lastFundingRound: "Series F",
    launchYear: 2014,
  },
  {
    name: "Nuro",
    industries: "Autonomous Vehicles, Robotics",
    valuation: 8600000000,
    growthStage: "Growth",
    totalFunding: 1000000000,
    lastFundingRound: "Series D",
    launchYear: 2016,
  },
  {
    name: "Impossible Foods",
    industries: "Food and Beverage, Plant-based Proteins",
    valuation: 7000000000,
    growthStage: "Expansion",
    totalFunding: 1500000000,
    lastFundingRound: "Series G",
    launchYear: 2011,
  },
  {
    name: "Modern Meadow",
    industries: "Biotechnology, Leather Alternatives",
    valuation: 700000000,
    growthStage: "Growth",
    totalFunding: 300000000,
    lastFundingRound: "Series C",
    launchYear: 2014,
  },
  {
    name: "Neuralink",
    industries: "Healthcare, Neurotechnology",
    valuation: 1000000000,
    growthStage: "Early",
    totalFunding: 158000000,
    lastFundingRound: "Series A",
    launchYear: 2016,
  },

  {
    name: "OpenAI",
    industries: "Artificial Intelligence, Research",
    valuation: 2900000000,
    growthStage: "Expansion",
    totalFunding: 1000000000,
    lastFundingRound: "Series B",
    launchYear: 2015,
  },
  {
    name: "SpaceX",
    industries: "Aerospace, Transport",
    valuation: 74000000000,
    growthStage: "Mature",
    totalFunding: 10000000000,
    lastFundingRound: "Series K",
    launchYear: 2002,
  },
  {
    name: "ByteDance",
    industries: "Social Media, Technology",
    valuation: 140000000000,
    growthStage: "Mature",
    totalFunding: 7000000000,
    lastFundingRound: "Series I",
    launchYear: 2012,
  },
  {
    name: "Stripe",
    industries: "Fintech, Software",
    valuation: 95000000000,
    growthStage: "Expansion",
    totalFunding: 2000000000,
    lastFundingRound: "Series G",
    launchYear: 2010,
  },
  {
    name: "Rivian",
    industries: "Automotive, Electric Vehicles",
    valuation: 27000000000,
    growthStage: "Growth",
    totalFunding: 10500000000,
    lastFundingRound: "Series H",
    launchYear: 2009,
  },
  {
    name: "Epic Games",
    industries: "Gaming, Software",
    valuation: 17000000000,
    growthStage: "Expansion",
    totalFunding: 3400000000,
    lastFundingRound: "Series E",
    launchYear: 1991,
  },
  {
    name: "Palantir",
    industries: "Data Analytics, Software",
    valuation: 15000000000,
    growthStage: "Mature",
    totalFunding: 3000000000,
    lastFundingRound: "Series J",
    launchYear: 2003,
  },
  {
    name: "Tesla",
    industries: "Automotive, Energy",
    valuation: 600000000000,
    growthStage: "Mature",
    totalFunding: 20000000000,
    lastFundingRound: "Series F",
    launchYear: 2003,
  },
  {
    name: "Theranos",
    industries: "Healthcare, Biotechnology",
    valuation: 900000000,
    growthStage: "Early",
    totalFunding: 700000000,
    lastFundingRound: "Series C",
    launchYear: 2003,
  },
  {
    name: "Robinhood",
    industries: "Fintech, Stock Trading",
    valuation: 11000000000,
    growthStage: "Growth",
    totalFunding: 2200000000,
    lastFundingRound: "Series G",
    launchYear: 2013,
  },
];

const companiesColumns: ColumnDef<Company, unknown>[] = [
  {
    header: "Company Name",
    accessorKey: "name",
    enableSorting: true,
  },
  {
    header: "Industry",
    accessorKey: "industries",
    enableSorting: true,
  },
  {
    header: "Valuation",
    accessorKey: "valuation",
    enableSorting: true,
    cell: ({ getValue }) => {
      const number = getValue() as number;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(number);
    },
  },
  {
    header: "Total Funding",
    accessorKey: "totalFunding",
    enableSorting: true,
    cell: ({ getValue }) => {
      const number = getValue() as number;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(number);
    },
  },
  {
    header: "Last Funding Round",
    accessorKey: "lastFundingRound",
    enableSorting: false,
  },
  {
    header: "Growth Stage",
    accessorKey: "growthStage",
    enableSorting: false,
  },
  {
    header: "Launch Year",
    accessorKey: "launchYear",
    enableSorting: true,
  },
];

export default function Companies() {
  const table = useReactTable<Company>({
    data: companies,
    columns: companiesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: "valuation", desc: false }],
    },
  });

  return (
    <>
      <div className="mb-8 flex justify-center w-full">
        <h1 className="text-3xl font-bold text-cyan-200">
          Comprehensive List of Startups
        </h1>
      </div>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const toggleSortingHandler =
                  header.column.getToggleSortingHandler();

                return (
                  <TableHeaderCell
                    key={header.id}
                    onClick={(event) =>
                      toggleSortingHandler && toggleSortingHandler(event)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && toggleSortingHandler) {
                        toggleSortingHandler(event);
                      }
                    }}
                    className={classNames(
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      "px-0.5 py-1.5 text-cyan-200"
                    )}
                    tabIndex={header.column.getCanSort() ? 0 : -1}
                    aria-sort={
                      header.column.getIsSorted()
                        ? header.column.getIsSorted() === "asc"
                          ? "ascending"
                          : header.column.getIsSorted() === "desc"
                          ? "descending"
                          : "none"
                        : "none"
                    }
                  >
                    <div className="flex items-center justify-between gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <div className="-space-y-2">
                          <RiArrowUpSLine
                            className={
                              header.column.getIsSorted() === "desc"
                                ? "opacity-30"
                                : ""
                            }
                            aria-hidden={true}
                          />
                          <RiArrowDownSLine
                            className={
                              header.column.getIsSorted() === "asc"
                                ? "opacity-30"
                                : ""
                            }
                            aria-hidden={true}
                          />
                        </div>
                      )}
                    </div>
                  </TableHeaderCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-cyan-200">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
