// Copyright ©, 2023-present, Lightspark Group, Inc. - All Rights Reserved

import CurrencyAmountInput, {
  CurrencyAmountInputFromJson,
} from "./CurrencyAmountInput.js";
import InvoiceType from "./InvoiceType.js";

type CreateInvoiceInput = {
  nodeId: string;

  amount: CurrencyAmountInput;

  memo?: string;

  invoiceType?: InvoiceType;
};

export const CreateInvoiceInputFromJson = (obj: any): CreateInvoiceInput => {
  return {
    nodeId: obj["create_invoice_input_node_id"],
    amount: CurrencyAmountInputFromJson(obj["create_invoice_input_amount"]),
    memo: obj["create_invoice_input_memo"],
    invoiceType: !!obj["create_invoice_input_invoice_type"]
      ? InvoiceType[obj["create_invoice_input_invoice_type"]] ??
        InvoiceType.FUTURE_VALUE
      : null,
  } as CreateInvoiceInput;
};

export default CreateInvoiceInput;
