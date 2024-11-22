import { Loader2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable, HeaderWithTooltip } from "@/components/data-table";
import { useToast } from "@/hooks/use-toast";
import Form from "./open-data-tab-form";
import { OpenDataRecord } from "@/lib/types";
// import { uploadOpenData } from "@/api/openDataApi";

interface OpenDataTabProps {}

// interface OpenDataRecord {
//   datetime: string;
//   laeq: number;
//   lafmax: number;
//   la10: number;
//   la90: number;
//   lceq: number;
//   lcfmax: number;
//   lc10: number;
//   lc90: number;
// }

const columns: ColumnDef<OpenDataRecord>[] = [
  {
    accessorKey: "datetime",
    header: "Datetime",
  },
  {
    accessorKey: "laeq",
    header: () => (
      <HeaderWithTooltip
        colName="LAEQ"
        tooltip="Equivalent Continuous Sound Level"
      />
    ),
  },
  {
    accessorKey: "lafmax",
    header: () => (
      <HeaderWithTooltip
        colName="LAFMAX"
        tooltip="Maximum A-weighted Fast Sound Level"
      />
    ),
  },
  {
    accessorKey: "la10",
    header: () => (
      <HeaderWithTooltip colName="LA10" tooltip="10th Percentile Sound Level" />
    ),
  },
  {
    accessorKey: "la90",
    header: () => (
      <HeaderWithTooltip colName="LA90" tooltip="90th Percentile Sound Level" />
    ),
  },
  {
    accessorKey: "lceq",
    header: () => (
      <HeaderWithTooltip
        colName="LCEQ"
        tooltip="Equivalent Continuous Sound Level with C-weighting"
      />
    ),
  },
  {
    accessorKey: "lcfmax",
    header: () => (
      <HeaderWithTooltip
        colName="LCFMAX"
        tooltip="Maximum C-weighted Fast Sound Level"
      />
    ),
  },
  {
    accessorKey: "lc10",
    header: () => (
      <HeaderWithTooltip
        colName="LC10"
        tooltip="10th Percentile Sound Level with C-weighting"
      />
    ),
  },
  {
    accessorKey: "lc90",
    header: () => (
      <HeaderWithTooltip
        colName="LC90"
        tooltip="90th Percentile Sound Level with C-weighting"
      />
    ),
  },
];

export default function OpenDataTab({}: OpenDataTabProps) {
  
//   const [openDataRecord, setOpenDataRecord] = useState<OpenDataRecord[]>();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const formData = new FormData(e.currentTarget);
//     const data: { [key: string]: FormDataEntryValue } = {};
//     formData.forEach((value, key) => {
//       data[key] = value;
//     });
//     try {
//       const res = await fetch(
//         `/open-data?username=dublincityapi&password=Xpa5vAQ9ki&monitor=${data.monitor}&start=${data.start}&end=${data.end}`,
//         {
//           method: "POST",
//         }
//       );
//       const json = await res.json();
//       if (json.error) {
//         toast({
//           title: "Error",
//           description: json.error,
//         });
//       }
//       console.log(json);
//       json
//         ? setOpenDataRecord(json as OpenDataRecord[])
//         : setOpenDataRecord([]);
//     } catch (err: any) {
//       setOpenDataRecord([]);
//       toast({
//         title: "Error",
//         description: err,
//       });
//     }
//     setIsLoading(false);
//   };

//   const handleUpload = async () => {
//     if (!openDataRecord) return;
//     setIsUploading(true);
//     try {
//       const recordsWithMonitor = openDataRecord.map((item) => ({
//         ...item,
//         monitor,
//       }));
//       //   const res = await uploadOpenData(recordsWithMonitor);
//       //   const json = await res?.body.json();
//       //   console.log(json);
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err,
//       });
//       console.log(`Error: ${err}`);
//     }
//     setIsUploading(false);
//   };

  return (
      <Card>
        <CardHeader>
          <CardTitle>Open Data</CardTitle>
          <CardDescription>
            Access Sonitus API for open noise minitoring data.
            <br />
            Provided by{" "}
            <a
              href="https://data.smartdublin.ie/sonitus-api"
              className="text-blue-500"
            >
              https://data.smartdublin.ie/sonitus-api
            </a>
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form />
          {/* <Button
            onClick={handleUpload}
            variant="outline"
            disabled={!openDataRecord || isUploading}
            className="ml-2"
          >
            {isUploading && <Loader2 className="animate-spin" />}
            Upload to cloud
          </Button> */}
          <br />
          {/* {isLoading && <p>Searching data...</p>} */}
          {/* {openDataRecord && (
            <DataTable columns={columns} data={openDataRecord.reverse()} />
          )} */}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
  );
}
