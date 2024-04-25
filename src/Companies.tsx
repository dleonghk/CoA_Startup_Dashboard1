import { useState, useEffect, useMemo } from "react";
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
  return classes.filter(Boolean).join(" ");
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

function capitalizeWords(str) {
  return str
    .replace(/;/g, ", ")
    .split(", ")
    .map((segment) =>
      segment
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
    .join(", ");
}

function getMedianValue(value) {
  if (value && value.includes("-")) {
    const parts = value.split("-").map((part) => parseFloat(part.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return (parts[0] + parts[1]) / 2;
    }
  }
  return parseFloat(value);
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const [industrySearchTerm, setIndustrySearchTerm] = useState("");

  function handleCompanySearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setCompanySearchTerm(event.target.value);
  }

  function handleIndustrySearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setIndustrySearchTerm(event.target.value);
  }

  const filteredCompanies = useMemo(() => {
    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(companySearchTerm.toLowerCase()) &&
        company.industries
          .toLowerCase()
          .includes(industrySearchTerm.toLowerCase())
    );
  }, [companies, companySearchTerm, industrySearchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      //const cachedData = localStorage.getItem("companies");
      //if (cachedData) {
      //  setCompanies(JSON.parse(cachedData));
      //} else {
      try {
        const response = await fetch("/api/company_page");
        if (!response.ok) {
          console.error(
            "Failed to fetch companies: Network response was not ok"
          );
          return;
        }
        const data = await response.json();
        setCompanies(data);
        localStorage.setItem("companies", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
      //}
    };

    fetchData();
  }, []);

  const companiesColumns: ColumnDef<Company, unknown>[] = [
    {
      header: "Company Name",
      accessorKey: "name",
      enableSorting: true,
      cell: ({ getValue }) => {
        const text = getValue();
        return capitalizeWords(text);
      },
    },
    {
      header: "Industry",
      accessorKey: "industries",
      enableSorting: true,
      cell: ({ getValue }) => {
        const text = getValue();
        return capitalizeWords(text);
      },
    },
    {
      header: "Total Funding",
      accessorKey: "amount",
      enableSorting: true,
      cell: ({ getValue }) => {
        const value = getValue();
        const medianValue = getMedianValue(value);
        if (!isNaN(medianValue)) {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          }).format(medianValue);
        }
        return "N/A";
      },
    },
    {
      header: "Last Funding Round",
      accessorKey: "round",
      enableSorting: false,
      cell: ({ getValue }) => {
        const text = getValue();
        return capitalizeWords(text);
      },
    },
    {
      header: "Valuation",
      accessorKey: "round_valuation_usd",
      enableSorting: true,
      cell: ({ getValue }) => {
        const value = getValue();
        const medianValue = getMedianValue(value);
        if (!isNaN(medianValue)) {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          }).format(medianValue);
        }
        return "N/A";
      },
    },
    {
      header: "Growth Stage",
      accessorKey: "growth_stage",
      enableSorting: false,
      cell: ({ getValue }) => {
        const text = getValue();
        return capitalizeWords(text);
      },
    },
    {
      header: "Launch Year",
      accessorKey: "launch_year",
      enableSorting: true,
    },
  ];

  const table = useReactTable<Company>({
    data: filteredCompanies,
    columns: companiesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: "round_valuation_usd", desc: true }],
    },
  });

  return (
    <>
      <div className="mb-8 flex justify-center w-full">
        <h1 className="text-3xl font-bold text-cyan-200">
          Comprehensive List of Tech Companies from Atlanta
        </h1>
      </div>

      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const hasSearch =
                  header.id === "name" || header.id === "industries"; // Only these columns have search
                return (
                  <TableHeaderCell
                    key={header.id}
                    onClick={(event) =>
                      header.column.getToggleSortingHandler()?.(event)
                    }
                    className={classNames(
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      "px-0.5 py-1.5 text-cyan-200"
                    )}
                    tabIndex={header.column.getCanSort() ? 0 : -1}
                  >
                    <div className="flex flex-col items-center w-full">
                      <div className="flex justify-between items-center w-full">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <div className="flex items-center -space-y-2">
                            <RiArrowUpSLine
                              className={
                                header.column.getIsSorted() === "desc"
                                  ? "opacity-30"
                                  : ""
                              }
                              aria-hidden="true"
                            />
                            <RiArrowDownSLine
                              className={
                                header.column.getIsSorted() === "asc"
                                  ? "opacity-30"
                                  : ""
                              }
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
                      {hasSearch ? (
                        <input
                          type="text"
                          placeholder={`Search ${header.column.columnDef.header}...`}
                          value={
                            header.id === "name"
                              ? companySearchTerm
                              : industrySearchTerm
                          }
                          onChange={
                            header.id === "name"
                              ? handleCompanySearchChange
                              : handleIndustrySearchChange
                          }
                          className="mt-2 p-1 text-sm w-full"
                        />
                      ) : (
                        <div style={{ height: "38px" }} /> // Adjust height as needed to match your input height
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
