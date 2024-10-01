import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { FC, HTMLAttributes } from "react";
import { ConsumerRelation } from "../../../_domain/consumer.type";

interface ConsumerTableProps extends HTMLAttributes<HTMLDivElement> {
  consumerList: Array<ConsumerRelation>;
}

export const ConsumerTable: FC<ConsumerTableProps> = (props) => {
  const { className, consumerList } = props;

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {consumerList.map((consumer) => (
            <TableRow key={consumer.id}>
              <TableCell>{consumer.name}</TableCell>
              <TableCell>{consumer.phone}</TableCell>
              <TableCell>{consumer.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
