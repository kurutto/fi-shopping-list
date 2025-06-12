import React, { useContext, useRef } from 'react'
import Box from '@/components/ui/box'
import Label from '@/components/ui/label'
import Input from '@/components/ui/input'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { ReceiptDataType } from '@/types/types';
import RegistrationReceiptTableRow from './registrationReceiptTableRow';
import { RegisterItemType } from "@/components/purchase/registrationReceiptTableRow";
import Button from '../ui/button';
import { ModalContext, ModalContextType } from '@/context/modalContext';

interface PurchaseFromReceiptFormProps {
  userId: string;
  fridgeId: string;
  purchases:ReceiptDataType[]
}

const PurchaseFromReceiptForm = ({userId,fridgeId,purchases}:PurchaseFromReceiptFormProps) => {
  const { handleOpen } =
    useContext<ModalContextType>(ModalContext);
  const dateRef = useRef<HTMLInputElement>(null);
  const tableRowRefs = useRef<RegisterItemType[]>([]);
  const handleRegistration = () => {
    tableRowRefs.current.forEach((item) => {
      item.RegisterItem();
    });
    handleOpen();
  }
  return (
    <>
        <Box variant="horizontally">
          <Label className="w-20 w-">
            購入日
          </Label>
          <Input type="date" id="date" ref={dateRef} />
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader className="text-left">品名</TableHeader>
              <TableHeader className="w-20">カテゴリ</TableHeader>
              <TableHeader className="w-11 text-nowrap">在庫<br />管理</TableHeader>
              <TableHeader className="w-15"></TableHeader>
            </TableRow>
          </TableHead>
          <TableBody className="max-h-30">
            {purchases.map((item, idx) => (
              <RegistrationReceiptTableRow userId={userId} fridgeId={fridgeId} item={item} date={dateRef.current?.value} ref={func => {tableRowRefs.current[idx] = func as RegisterItemType}} key={idx} />
            ))}
          </TableBody>
        </Table>
        <Button color="primary" onClick={handleRegistration}>登録</Button>
        </>
  )
}

export default PurchaseFromReceiptForm