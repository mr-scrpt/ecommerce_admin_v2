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
  consumer: ConsumerRelation;
}

export const ConsumerTable: FC<ConsumerTableProps> = (props) => {
  const { className, consumer } = props;

  const { name, phone, email } = consumer;

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
          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{email}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
