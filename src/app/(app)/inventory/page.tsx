import { columns, Payment } from "./columns";
import { InventoryDataTable } from "./inventory-data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "processing",
      email: "saas@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      email: "joy@example.com",
    },
  ];
}

export default async function InventoryPage() {
  const data = await getData();
  return (
    <div>
      <InventoryDataTable columns={columns} data={data} />
    </div>
  );
}
